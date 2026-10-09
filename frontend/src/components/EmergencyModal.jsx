import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  Copy, 
  Check 
} from 'lucide-react';

export default function EmergencyModal({ currentCity, onClose }) {
  const [copiedKey, setCopiedKey] = useState(null);

  if (!currentCity) return null;

  const hotlines = currentCity.emergencyHotlines;

  const copyNumber = (key, number) => {
    navigator.clipboard?.writeText(number);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="emergency-modal-title"
    >
      <div 
        className="modal-content" 
        style={{ maxWidth: '540px' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          id="btn-close-emergency-modal"
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close emergency modal"
        >
          <X size={20} />
        </button>

        <div className="modal-body" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(244, 63, 94, 0.18)',
              color: '#f43f5e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldAlert size={24} />
            </div>
            <div>
              <h2 id="emergency-modal-title" style={{ fontSize: '1.4rem' }}>
                SOS Hotlines: {currentCity.name}
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                Official municipal emergency & tourist response services
              </p>
            </div>
          </div>

          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            If you are in immediate distress or facing medical or safety risks, dial the official emergency numbers directly:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            {/* Police */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Police / Law Enforcement</strong>
                <p style={{ fontSize: '1.1rem', color: '#fb7185', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  {hotlines.police}
                </p>
              </div>
              <button 
                id="btn-copy-police"
                className="btn btn-secondary btn-sm"
                onClick={() => copyNumber('police', hotlines.police)}
                title="Copy number"
              >
                {copiedKey === 'police' ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                <span>{copiedKey === 'police' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Ambulance */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Medical Emergency / Ambulance</strong>
                <p style={{ fontSize: '1.1rem', color: '#38bdf8', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  {hotlines.ambulance}
                </p>
              </div>
              <button 
                id="btn-copy-ambulance"
                className="btn btn-secondary btn-sm"
                onClick={() => copyNumber('ambulance', hotlines.ambulance)}
                title="Copy number"
              >
                {copiedKey === 'ambulance' ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                <span>{copiedKey === 'ambulance' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Women's Safety */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Women's Safety & Anti-Harassment</strong>
                <p style={{ fontSize: '1.1rem', color: '#c084fc', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  {hotlines.womenHelpline}
                </p>
              </div>
              <button 
                id="btn-copy-women"
                className="btn btn-secondary btn-sm"
                onClick={() => copyNumber('women', hotlines.womenHelpline)}
                title="Copy number"
              >
                {copiedKey === 'women' ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                <span>{copiedKey === 'women' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Tourist Assistance */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Official Tourist Helpline</strong>
                <p style={{ fontSize: '1.1rem', color: '#34d399', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  {hotlines.touristAssistance}
                </p>
              </div>
              <button 
                id="btn-copy-tourist"
                className="btn btn-secondary btn-sm"
                onClick={() => copyNumber('tourist', hotlines.touristAssistance)}
                title="Copy number"
              >
                {copiedKey === 'tourist' ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                <span>{copiedKey === 'tourist' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button className="btn btn-secondary" onClick={onClose}>
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
