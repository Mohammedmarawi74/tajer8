import React, { useState, useEffect } from 'react';
import { Slide } from '../types';
import { 
  SlideVersion, 
  getVersions, 
  restoreVersion, 
  deleteVersion, 
  formatTimestamp,
  saveVersion
} from '../utils/versionStorage';
import { 
  History, 
  RotateCcw, 
  Trash2, 
  Save, 
  X, 
  Clock, 
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface VersionHistoryProps {
  slide: Slide;
  onUpdate: (updated: Slide) => void;
  onClose: () => void;
}

const VersionHistory: React.FC<VersionHistoryProps> = ({ slide, onUpdate, onClose }) => {
  const [versions, setVersions] = useState<SlideVersion[]>([]);
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    loadVersions();
  }, [slide.id]);

  const loadVersions = () => {
    const vers = getVersions(slide.id);
    setVersions(vers);
  };

  const handleSaveCurrentVersion = () => {
    saveVersion(slide, note || 'حفظ يدوي');
    setNote('');
    loadVersions();
  };

  const handleRestore = (version: SlideVersion) => {
    const restored = restoreVersion(slide.id, version);
    onUpdate({ ...slide, ...restored });
    loadVersions();
  };

  const handleDelete = (versionId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه النسخة؟')) {
      deleteVersion(slide.id, versionId);
      loadVersions();
    }
  };

  const toggleExpand = (versionId: string) => {
    setExpandedVersion(expandedVersion === versionId ? null : versionId);
  };

  return (
    <div className="version-history-panel no-print" dir="rtl">
      {/* Header */}
      <div className="version-history-header">
        <div className="version-history-title-wrapper">
          <History className="version-history-icon" />
          <h3 className="version-history-title">سجل الإصدارات</h3>
        </div>
        <button onClick={onClose} className="version-history-close">
          <X className="icon" />
        </button>
      </div>

      {/* Save Current Version */}
      <div className="version-save-section">
        <div className="version-save-input-group">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="ملاحظة اختيارية (مثال: نسخة أولية)"
            className="version-note-input"
          />
          <button
            onClick={handleSaveCurrentVersion}
            className="version-save-btn"
          >
            <Save className="icon" />
            حفظ النسخة الحالية
          </button>
        </div>
        <p className="version-save-hint">
          يتم الحفظ التلقائي كل 30 ثانية
        </p>
      </div>

      {/* Versions List */}
      <div className="version-history-list custom-scrollbar">
        {versions.length === 0 ? (
          <div className="version-empty-state">
            <FileText className="version-empty-icon" />
            <p className="version-empty-text">لا توجد نسخ محفوظة بعد</p>
            <p className="version-empty-subtext">
              اضغط على "حفظ النسخة الحالية" للبدء
            </p>
          </div>
        ) : (
          versions.map((version, index) => (
            <div key={version.id} className="version-item">
              <div 
                className="version-item-header"
                onClick={() => toggleExpand(version.id)}
              >
                <div className="version-item-info">
                  <div className="version-item-number">#{versions.length - index}</div>
                  <div className="version-item-meta">
                    <Clock className="version-clock-icon" />
                    <span className="version-timestamp">{formatTimestamp(version.timestamp)}</span>
                    {version.note && (
                      <span className="version-note-badge">{version.note}</span>
                    )}
                  </div>
                </div>
                <button className="version-expand-btn">
                  {expandedVersion === version.id ? (
                    <ChevronUp className="icon" />
                  ) : (
                    <ChevronDown className="icon" />
                  )}
                </button>
              </div>

              {expandedVersion === version.id && (
                <div className="version-item-details animate-in slide-in-from-top-2">
                  {/* Preview */}
                  <div className="version-preview">
                    <div className="version-preview-row">
                      <span className="version-preview-label">العنوان:</span>
                      <span className="version-preview-value">{version.headerTitle}</span>
                    </div>
                    <div className="version-preview-row">
                      <span className="version-preview-label">العنوان الرئيسي:</span>
                      <span className="version-preview-value">{version.mainTitle}</span>
                    </div>
                    <div className="version-preview-row">
                      <span className="version-preview-label">النقاط:</span>
                      <span className="version-preview-value">{version.points.length} نقاط</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="version-item-actions">
                    <button
                      onClick={() => handleRestore(version)}
                      className="version-restore-btn"
                    >
                      <RotateCcw className="icon" />
                      استرجاع هذه النسخة
                    </button>
                    <button
                      onClick={() => handleDelete(version.id)}
                      className="version-delete-btn"
                    >
                      <Trash2 className="icon" />
                      حذف
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer Info */}
      {versions.length > 0 && (
        <div className="version-history-footer">
          <span className="version-count">
            {versions.length} نسخة محفوظة
          </span>
          <span className="version-max-hint">
            (الحد الأقصى: 50 نسخة)
          </span>
        </div>
      )}
    </div>
  );
};

export default VersionHistory;
