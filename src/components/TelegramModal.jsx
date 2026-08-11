import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import telegramQrImg from '../assets/telegram_qr.png';
import '../styles/TelegramModal.css';

export default function TelegramModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const telegramHandle = '@UR_RAKSA';
  const telegramUrl = 'https://t.me/UR_RAKSA';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyHandle = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(telegramHandle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return createPortal(
    <div className="telegram-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Telegram QR Code">
      <div className="telegram-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="telegram-modal-close" onClick={onClose} aria-label="Close Telegram QR modal">
          ✕
        </button>

        <div className="telegram-modal-header">
          <div className="telegram-icon-circle">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.8 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.05-.49-.83-.27-1.48-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.88 8.01-3.44 3.81-1.58 4.6-1.86 5.12-1.87.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.21-.04.37z" />
            </svg>
          </div>
          <h3 className="telegram-modal-title">Connect on Telegram</h3>
          <p className="telegram-modal-subtitle">Scan the QR code with your phone camera or Telegram app</p>
        </div>

        {/* QR Code Container */}
        <div className="telegram-qr-frame">
          <img src={telegramQrImg} alt="Telegram QR Code @UR_RAKSA" className="telegram-qr-image" />
        </div>

        {/* Handle and Copy Pill */}
        <div className="telegram-handle-row">
          <span className="telegram-handle-text">{telegramHandle}</span>
          <button type="button" className="telegram-copy-btn" onClick={handleCopyHandle} title="Copy Telegram handle">
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>

        {/* Direct Open Button */}
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-telegram-direct"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.8 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.05-.49-.83-.27-1.48-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.88 8.01-3.44 3.81-1.58 4.6-1.86 5.12-1.87.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.21-.04.37z" />
          </svg>
          <span>Open in Telegram App</span>
        </a>
      </div>
    </div>,
    document.body
  );
}
