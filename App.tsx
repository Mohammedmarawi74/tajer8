
import React, { useState, useCallback, useRef } from 'react';
import Editor from './components/Editor';
import SlideCanvas from './components/SlideCanvas';
import { Slide, CarouselConfig } from './types';
import { DEFAULT_SLIDE } from './constants';
import { generateSlideContent } from './services/geminiService';
import { Download, ChevronRight, ChevronLeft, PlusCircle, Trash, Eye, Loader2, Sparkles } from 'lucide-react';
import { toPng } from 'html-to-image';

const App: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([DEFAULT_SLIDE]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const exportRef = useRef<HTMLDivElement>(null);
  
  const [config] = useState<CarouselConfig>({
    primaryColor: '#166534',
    accentColor: '#eab308',
    logoUrl: '',
    ministryLogoUrl: ''
  });

  const currentSlide = slides[currentIndex];

  const handleUpdateSlide = (updated: Slide) => {
    const newSlides = [...slides];
    newSlides[currentIndex] = updated;
    setSlides(newSlides);
  };

  const handleAddSlide = () => {
    const newSlide: Slide = {
      ...DEFAULT_SLIDE,
      id: Math.random().toString(),
      mainTitle: 'شريحة جديدة فارغة',
      theme: slides[slides.length - 1]?.theme || 'investor'
    };
    setSlides([...slides, newSlide]);
    setCurrentIndex(slides.length);
  };

  const handleDeleteSlide = () => {
    if (slides.length <= 1) return;
    const newSlides = slides.filter((_, i) => i !== currentIndex);
    setSlides(newSlides);
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleAISuggestion = async () => {
    setIsGenerating(true);
    try {
      const topics = [
        "شروط أهلية دعم المحاصيل البعلية",
        "طرق ترشيد استهلاك المياه في الزراعة",
        "كيفية الحصول على شهادة ممارسة زراعية جيدة",
        "أهم مميزات برنامج ريف للمزارعين",
        "تقنيات مكافحة الآفات الزراعية الطبيعية",
        "استخدام الطاقة المتجددة في المزارع السعودية"
      ];
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      const suggested = await generateSlideContent(randomTopic);
      
      const updatedSlide: Slide = {
        ...currentSlide,
        headerTitle: suggested.headerTitle || currentSlide.headerTitle,
        mainTitle: suggested.mainTitle || currentSlide.mainTitle,
        points: (suggested.points || []).map((p: any) => ({
          id: Math.random().toString(),
          ...p
        })).slice(0, 6)
      };
      
      handleUpdateSlide(updatedSlide);
    } catch (err) {
      alert("عذراً، حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = useCallback(async () => {
    const target = exportRef.current;
    if (!target) return;
    
    setIsExporting(true);
    
    try {
      // 1. Ensure all fonts are ready
      if (document.fonts) {
        await document.fonts.ready;
      }

      // 2. Pre-wait images
      const images = Array.from(target.getElementsByTagName('img')) as HTMLImageElement[];
      await Promise.all(
        images.map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );

      // 3. Stabilization delay
      await new Promise(r => setTimeout(r, 500));

      const exportOptions = {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: '#ffffff',
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
      };

      let dataUrl: string;
      try {
        // High quality attempt
        dataUrl = await toPng(target, exportOptions);
      } catch (firstError) {
        console.warn('First export attempt failed, retrying with safe settings...', firstError);
        // Fallback attempt: sometimes external font CSS causes SecurityError in html-to-image
        dataUrl = await toPng(target, {
          ...exportOptions,
          pixelRatio: 2, // Slightly lower but still high quality
          skipFonts: false, // Try once more with fonts but lower ratio
        });
      }

      if (!dataUrl || dataUrl.length < 500) {
        throw new Error('بيانات الصورة المستخرجة غير صالحة.');
      }

      const link = document.createElement('a');
      link.download = `reef-export-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (err: any) {
      console.error('Detailed Export Error:', err);
      
      // Prevent [object Object] by properly stringifying or checking type
      let errorMessage = 'فشل تصدير الصورة.';
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      } else {
        try {
          // If it's a generic object or event, try to extract a useful string
          errorMessage = JSON.stringify(err) !== '{}' ? JSON.stringify(err) : (err.toString() || 'خطأ غير معروف');
        } catch (sErr) {
          errorMessage = 'حدث خطأ تقني في معالجة الموارد.';
        }
      }

      alert(`نعتذر، حدث خطأ أثناء الحفظ:\n${errorMessage}\n\nتأكد من عدم وجود صور معطلة في التصميم وحاول مرة أخرى.`);
    } finally {
      setIsExporting(false);
    }
  }, [exportRef]);

  return (
    <div className="app-container" dir="rtl">

      {/* 1. Sidebar (Editor) */}
      <aside className="app-sidebar">
        <Editor
          slide={currentSlide}
          onUpdate={handleUpdateSlide}
          onGenerate={handleAISuggestion}
          isGenerating={isGenerating}
        />
      </aside>

      {/* 2. Main Workspace */}
      <main className="app-main">

        {/* Upper Toolbar */}
        <div className="toolbar no-print">
          <div className="toolbar-controls">
             <div className="toolbar-pagination">
               <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="toolbar-pagination-btn"
               >
                 <ChevronRight className="icon" />
               </button>
               <div className="toolbar-pagination-info">
                 <span className="toolbar-pagination-label">الشريحة</span>
                 <span className="toolbar-pagination-current">
                   {currentIndex + 1} <span className="toolbar-pagination-separator">/</span> {slides.length}
                 </span>
               </div>
               <button
                onClick={() => setCurrentIndex(Math.min(slides.length - 1, currentIndex + 1))}
                disabled={currentIndex === slides.length - 1}
                className="toolbar-pagination-btn"
               >
                 <ChevronLeft className="icon" />
               </button>
             </div>

             <button
               onClick={handleAddSlide}
               className="toolbar-add-btn"
               title="إضافة شريحة جديدة"
             >
               <PlusCircle className="icon" />
             </button>

             <button
               onClick={handleDeleteSlide}
               disabled={slides.length <= 1}
               className="toolbar-delete-btn"
               title="حذف هذه الشريحة"
             >
               <Trash className="icon" />
             </button>
          </div>

          <div className="toolbar-actions">
             <button
              onClick={() => setShowPreview(!showPreview)}
              className={`toolbar-preview-btn ${showPreview ? '' : 'active'}`}
             >
               <Eye className="icon" />
               {showPreview ? 'إخفاء المعاينة' : 'إظهار المعاينة'}
             </button>

             <button
               onClick={handleExport}
               disabled={isExporting}
               className="toolbar-export-btn"
             >
               {isExporting ? (
                 <>
                   <Loader2 className="spinner-icon animate-spin" />
                   جاري الحفظ...
                 </>
               ) : (
                 <>
                   <Download className="export-icon transition" />
                   حفظ كصورة
                 </>
               )}
             </button>
          </div>
        </div>

        {/* Central Display */}
        <div className={`preview-container ${showPreview ? 'visible' : 'hidden'}`}>
           <div className="preview-wrapper group">
              {/* Animated Glow Backdrop */}
              <div className="preview-backdrop" />

              {/* The actual capture area */}
              <div ref={exportRef} className="preview-capture-area">
                <SlideCanvas slide={currentSlide} config={config} id="main-poster" />
              </div>

              {/* Decorative AI badge if recently generated */}
              {isGenerating && (
                <div className="preview-ai-badge">
                  <Sparkles className="icon" />
                  <span className="preview-ai-badge-text">ذكاء اصطناعي</span>
                </div>
              )}
           </div>
        </div>

        {/* Subtle Branding */}
        <div className="app-branding">
          Reef Designer
        </div>
      </main>
    </div>
  );
};

export default App;
