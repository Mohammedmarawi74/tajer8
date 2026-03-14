
import React from 'react';
import { Slide, CarouselConfig } from '../types';
import { ICON_MAP, LOGO_OPTIONS } from '../constants';

interface SlideCanvasProps {
  slide: Slide;
  config: CarouselConfig;
  id?: string;
}

const SlideCanvas: React.FC<SlideCanvasProps> = ({ slide, config, id }) => {
  const { primary, secondary, bg, text } = slide.colors;

  const contentLayoutClass = slide.layout === 'grid' ? 'slide-content-grid' : 'slide-content-list';

  // Get the selected logo URL - handle -1 as no logo
  const selectedLogoIndex = slide.selectedLogoIndex ?? 0;
  const showLogo = selectedLogoIndex !== -1;
  const logoUrl = slide.customLogoUrl ||
                  (showLogo && LOGO_OPTIONS[selectedLogoIndex] && !LOGO_OPTIONS[selectedLogoIndex].isCustom
                    ? LOGO_OPTIONS[selectedLogoIndex].url
                    : '/logooo/logo-1.png');

  return (
    <div
      id={id}
      className="slide-canvas"
      dir="rtl"
      style={{
        width: '500px',
        height: '750px',
        backgroundColor: bg,
        color: text,
        '--slide-primary': primary,
        '--slide-secondary': secondary,
        '--slide-text': text,
        fontFamily: '"IBM Plex Sans Arabic", "Cairo", "Tajawal", "Almarai", sans-serif'
      } as React.CSSProperties}
    >
      {/* Decorative Background Gradient */}
      <div className="slide-bg-gradient" />

      {/* Header Banner */}
      <div className="slide-header-banner">
        <div
          className="slide-banner-bg"
          style={{ backgroundImage: `url(${slide.bgImage})` }}
        />
        <div
          className="slide-banner-overlay"
          style={{ backgroundColor: primary }}
        />
        <div className="slide-banner-gradient" />

        <div className="slide-header-top">
           <div className="slide-header-program-info">
             <span className="slide-program-name">برنامج التنمية الريفية</span>
             <span className="slide-program-subtitle">الزراعية المستدامة</span>
           </div>

           {showLogo && (
             <div className="slide-header-logo-container">
               <img
                 crossOrigin="anonymous"
                 src={logoUrl}
                 alt="Logo"
                 className="slide-header-logo"
               />
             </div>
           )}
        </div>

        <div className="slide-header-center">
          <div
            className="slide-header-badge"
            style={{ backgroundColor: secondary }}
          >
            {slide.headerTitle}
          </div>
          <h2 className="slide-header-title">
            {slide.mainTitle}
          </h2>
        </div>

        <div className="slide-banner-bottom-gradient" />
      </div>

      <div className={`slide-content ${contentLayoutClass}`}>
        {slide.points.map((point, index) => (
          <div key={point.id || index} className="slide-point-item">
            <div className="slide-point-icon-wrapper">
              <div
                className="slide-point-icon"
                style={{ backgroundColor: `${secondary}15`, color: primary }}
              >
                <div className="slide-point-icon-inner">
                  {ICON_MAP[point.icon] || ICON_MAP['Leaf']}
                </div>
              </div>
            </div>
            <div className="slide-point-text-container">
              <h4 className="slide-point-title" style={{ color: text }}>
                {point.title}
              </h4>
              <p className="slide-point-description" style={{ color: text }}>
                {point.description}
              </p>
            </div>
          </div>
        ))}
      </div>

     
      {/* Bottom Bar Footer */}
      <div className="slide-bottom-bar" style={{ backgroundColor: primary }}>
        <div className="slide-bottom-bar-content">
          <span className="bottom-bar-text-right" style={{ color: '#ffffff' }}>منصة التاجر الرقمية</span>
          <span className="bottom-bar-text-left" style={{ color: '#ffffff' }}>dtajer.com</span>
        </div>
      </div>
    </div>
  );
};

export default SlideCanvas;
