
import React, { useState, useRef } from 'react';
import { Slide, Point, ThemeVariant, ThemeColors } from '../types';
import { ICON_MAP, THEME_CONFIGS, LOGO_OPTIONS } from '../constants';
import { Trash2, Plus, Wand2, Image as ImageIcon, Code, Type, Palette, Sparkles, LayoutGrid, List, Upload, X, Check, LogOut } from 'lucide-react';

interface EditorProps {
  slide: Slide;
  onUpdate: (updated: Slide) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

type TabType = 'ai' | 'texts' | 'design' | 'customize';

const Editor: React.FC<EditorProps> = ({ slide, onUpdate, onGenerate, isGenerating }) => {
  const [activeTab, setActiveTab] = useState<TabType>('ai');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updatePoint = (index: number, field: keyof Point, value: string) => {
    const newPoints = [...slide.points];
    newPoints[index] = { ...newPoints[index], [field]: value };
    onUpdate({ ...slide, points: newPoints });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({
          ...slide,
          customLogoUrl: reader.result as string,
          selectedLogoIndex: -1 // custom-upload index
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    onUpdate({
      ...slide,
      customLogoUrl: undefined,
      selectedLogoIndex: -1 // -1 means no logo
    });
  };

  const handleSelectLogo = (index: number) => {
    if (index === -1) {
      // Remove logo
      handleRemoveLogo();
    } else {
      onUpdate({
        ...slide,
        customLogoUrl: undefined,
        selectedLogoIndex: index
      });
    }
  };

  const updateColor = (key: keyof ThemeColors, value: string) => {
    onUpdate({
      ...slide,
      theme: 'custom',
      colors: { ...slide.colors, [key]: value }
    });
  };

  const applyTheme = (variant: ThemeVariant) => {
    if (variant === 'custom') return;
    onUpdate({
      ...slide,
      theme: variant,
      colors: THEME_CONFIGS[variant].colors
    });
  };

  const TabButton = ({ id, icon: Icon, label }: { id: TabType, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`editor-tab-btn ${activeTab === id ? 'active' : ''}`}
    >
      <Icon className="editor-tab-icon" />
      <span className="editor-tab-label">{label}</span>
    </button>
  );

  return (
    <div className="editor-container no-print" dir="rtl">
      {/* Tab Navigation */}
      <div className="editor-tabs">
        <TabButton id="ai" icon={Sparkles} label="الذكاء" />
        <TabButton id="texts" icon={Type} label="المحتوى" />
        <TabButton id="design" icon={Palette} label="التصميم" />
        <TabButton id="customize" icon={Code} label="متقدم" />
      </div>

      <div className="editor-content custom-scrollbar">
        {activeTab === 'ai' && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
             <div className="ai-section-card">
                <div className="ai-section-header">
                   <div className="ai-icon-wrapper">
                      <Sparkles className="editor-tab-icon" />
                   </div>
                   <div>
                      <h3 className="ai-title">توليد بواسطة Gemini</h3>
                      <p className="ai-subtitle">توليد محتوى احترافي بضغطة واحدة</p>
                   </div>
                </div>
                <button
                  onClick={onGenerate}
                  disabled={isGenerating}
                  className="ai-generate-btn"
                >
                  <Wand2 className={`btn-icon ${isGenerating ? 'spinning' : ''}`} />
                  {isGenerating ? 'جاري التحضير...' : 'توليد محتوى جديد'}
                </button>
             </div>
          </div>
        )}

        {activeTab === 'texts' && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <section className="space-y-4">
              <h3 className="editor-section-title">عناوين الشريحة</h3>
              <div className="grid gap-4">
                <div className="form-group">
                  <label className="form-label">العلامة العلوية</label>
                  <input
                    type="text"
                    value={slide.headerTitle}
                    onChange={(e) => onUpdate({ ...slide, headerTitle: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">العنوان الرئيسي</label>
                  <textarea
                    value={slide.mainTitle}
                    onChange={(e) => onUpdate({ ...slide, mainTitle: e.target.value })}
                    className="form-textarea"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="editor-section-header">
                <h3 className="editor-section-title">النقاط الرئيسية</h3>
                <button
                  onClick={() => {
                    if (slide.points.length >= 8) return;
                    onUpdate({ ...slide, points: [...slide.points, { id: Math.random().toString(), icon: 'Leaf', title: 'نقطة جديدة', description: 'وصف إضافي' }] });
                  }}
                  disabled={slide.points.length >= 8}
                  className="point-add-btn"
                >
                  <Plus className="icon" />
                </button>
              </div>
              <div className="grid gap-4">
                {slide.points.map((point, idx) => (
                  <div key={point.id} className="point-item">
                    <button
                      onClick={() => onUpdate({ ...slide, points: slide.points.filter((_, i) => i !== idx) })}
                      className="point-delete-btn"
                    >
                      <Trash2 className="icon" />
                    </button>
                    <div className="point-content">
                      <select
                        value={point.icon}
                        onChange={(e) => updatePoint(idx, 'icon', e.target.value)}
                        className="point-icon-select"
                      >
                        {Object.keys(ICON_MAP).map(iconName => <option key={iconName} value={iconName}>{iconName}</option>)}
                      </select>
                      <input
                        type="text"
                        value={point.title}
                        onChange={(e) => updatePoint(idx, 'title', e.target.value)}
                        className="point-title-input"
                      />
                    </div>
                    <textarea
                      value={point.description}
                      onChange={(e) => updatePoint(idx, 'description', e.target.value)}
                      className="point-description-input"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'design' && (
          <div className="space-y-8 animate-in slide-in-from-right-4">
            {/* Professional Themes Grid */}
            <section className="space-y-4">
              <h3 className="editor-section-title centered">الثيمات الجاهزة</h3>
              <div className="theme-grid">
                {(Object.entries(THEME_CONFIGS) as [ThemeVariant, any][]).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => applyTheme(key)}
                    className={`theme-btn ${slide.theme === key ? 'active' : ''}`}
                  >
                    <div className="theme-color-preview">
                      <div className="theme-color-dot" style={{ backgroundColor: config.colors.secondary }} />
                      <div className="theme-color-dot" style={{ backgroundColor: config.colors.primary }} />
                      <span className="theme-name">{config.name}</span>
                    </div>
                    {/* Visual Preview Bar */}
                    <div className="theme-preview-bar">
                       <div className="theme-preview-bar-primary" style={{ backgroundColor: config.colors.primary }} />
                       <div className="theme-preview-bar-secondary" style={{ backgroundColor: `${config.colors.secondary}30` }} />
                    </div>
                    {slide.theme === key && (
                      <div className="theme-check-badge">
                        <Check className="theme-check-icon" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Custom Color Pickers */}
            <section className="space-y-4">
              <h3 className="editor-section-title centered">تخصيص الألوان</h3>
              <div className="color-picker-grid">
                <div className="color-picker-group">
                   <label className="color-picker-label">الأساسي</label>
                   <div className="color-picker-input-wrapper">
                     <input
                       type="color"
                       value={slide.colors.primary}
                       onChange={(e) => updateColor('primary', e.target.value)}
                       className="color-picker-input"
                     />
                   </div>
                </div>
                <div className="color-picker-group">
                   <label className="color-picker-label">الثانوي</label>
                   <input
                     type="color"
                     value={slide.colors.secondary}
                     onChange={(e) => updateColor('secondary', e.target.value)}
                     className="color-picker-input"
                   />
                </div>
                <div className="color-picker-group">
                   <label className="color-picker-label">النصوص</label>
                   <input
                     type="color"
                     value={slide.colors.text}
                     onChange={(e) => updateColor('text', e.target.value)}
                     className="color-picker-input"
                   />
                </div>
                <div className="color-picker-group">
                   <label className="color-picker-label">الخلفية</label>
                   <input
                     type="color"
                     value={slide.colors.bg}
                     onChange={(e) => updateColor('bg', e.target.value)}
                     className="color-picker-input"
                   />
                </div>
              </div>
            </section>

            {/* Layout Toggle */}
            <section className="space-y-4">
              <h3 className="editor-section-title">نمط التوزيع</h3>
              <div className="layout-toggle-group">
                <button
                  onClick={() => onUpdate({ ...slide, layout: 'grid' })}
                  className={`layout-toggle-btn ${slide.layout === 'grid' ? 'active' : ''}`}
                >
                  <LayoutGrid className="icon" />
                  <span>شبكة</span>
                </button>
                <button
                  onClick={() => onUpdate({ ...slide, layout: 'list' })}
                  className={`layout-toggle-btn ${slide.layout === 'list' ? 'active' : ''}`}
                >
                  <List className="icon" />
                  <span>قائمة</span>
                </button>
              </div>
            </section>

            {/* Logo Selection */}
            <section className="space-y-4">
              <div className="editor-section-header">
                <h3 className="editor-section-title">اختيار الشعار</h3>
                <button
                  onClick={handleRemoveLogo}
                  className="logo-remove-all-btn"
                  title="إزالة الشعار كلياً"
                  disabled={slide.selectedLogoIndex === -1 && !slide.customLogoUrl}
                >
                  <LogOut className="icon" />
                  إزالة الكل
                </button>
              </div>
              <div className="logo-grid">
                {LOGO_OPTIONS.map((logo, index) => (
                  <button
                    key={logo.id}
                    onClick={() => handleSelectLogo(index)}
                    className={`logo-option-btn ${slide.selectedLogoIndex === index ? 'active' : ''}`}
                  >
                    <img
                      src={logo.preview || logo.url}
                      alt={logo.name}
                      className="logo-preview-img"
                    />
                    <span className="logo-option-name">{logo.name}</span>
                    {slide.selectedLogoIndex === index && (
                      <div className="logo-check-badge">
                        <Check className="logo-check-icon" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </section>
          </div>
        )}

        {activeTab === 'customize' && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
             <section className="space-y-4">
               <h3 className="editor-section-title">تخصيص متقدم CSS</h3>
               <textarea
                 value={slide.customCSS}
                 onChange={(e) => onUpdate({ ...slide, customCSS: e.target.value })}
                 className="css-editor-textarea"
                 placeholder="/* اكتب CSS هنا... */"
                 dir="ltr"
               />
             </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
