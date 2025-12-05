import React from 'react';

export default function TermsModal({ isOpen, onClose, onAccept }) {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 1000,
        animation: 'fadeIn 0.3s ease'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'white',
          borderRadius: '16px',
          maxWidth: '700px',
          maxHeight: '80vh',
          overflow: 'auto',
          padding: '40px',
          position: 'relative',
          animation: 'slideUp 0.3s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#f7fafc',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            fontSize: '20px',
            color: '#4a5568',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#e2e8f0';
            e.target.style.transform = 'rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#f7fafc';
            e.target.style.transform = 'rotate(0deg)';
          }}
        >
          ✕
        </button>

        <h2 style={{ 
          fontSize: '26px', 
          marginBottom: '20px',
          color: '#2d3748'
        }}>
          📋 Terms and Conditions
        </h2>

        <div style={{ 
          color: '#4a5568', 
          lineHeight: '1.8',
          fontSize: '14px'
        }}>
          <p style={{ marginBottom: '16px', fontWeight: '600', color: '#2d3748' }}>
            Last Updated: December 4, 2024
          </p>

          <h3 style={{ 
            fontSize: '18px', 
            marginTop: '24px', 
            marginBottom: '12px',
            color: '#2d3748',
            fontWeight: '600'
          }}>
            1. Acceptable Use Policy
          </h3>
          <p style={{ marginBottom: '12px' }}>
            By using this Lost & Found system, you agree to:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Provide truthful and accurate information about lost or found items</li>
            <li style={{ marginBottom: '8px' }}>Upload only legitimate photos of lost or found items</li>
            <li style={{ marginBottom: '8px' }}>Not upload any illegal, inappropriate, offensive, or copyrighted content</li>
            <li style={{ marginBottom: '8px' }}>Respect others' privacy and property rights</li>
            <li style={{ marginBottom: '8px' }}>Use the system for its intended purpose only</li>
          </ul>

          <h3 style={{ 
            fontSize: '18px', 
            marginTop: '24px', 
            marginBottom: '12px',
            color: '#2d3748',
            fontWeight: '600'
          }}>
            2. Prohibited Content
          </h3>
          <p style={{ marginBottom: '12px' }}>
            You may NOT upload or post:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>❌ Illegal materials or content promoting illegal activities</li>
            <li style={{ marginBottom: '8px' }}>❌ Sexually explicit, pornographic, or obscene content</li>
            <li style={{ marginBottom: '8px' }}>❌ Hate speech, harassment, or discriminatory content</li>
            <li style={{ marginBottom: '8px' }}>❌ Violent, graphic, or disturbing imagery</li>
            <li style={{ marginBottom: '8px' }}>❌ Copyrighted material without authorization</li>
            <li style={{ marginBottom: '8px' }}>❌ Personal information of others without consent</li>
            <li style={{ marginBottom: '8px' }}>❌ Spam, advertisements, or misleading information</li>
            <li style={{ marginBottom: '8px' }}>❌ Malware, viruses, or malicious code</li>
          </ul>

          <h3 style={{ 
            fontSize: '18px', 
            marginTop: '24px', 
            marginBottom: '12px',
            color: '#2d3748',
            fontWeight: '600'
          }}>
            3. Content Moderation
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>We reserve the right to review, remove, or reject any content</li>
            <li style={{ marginBottom: '8px' }}>Violations may result in immediate account suspension</li>
            <li style={{ marginBottom: '8px' }}>Serious violations will be reported to appropriate authorities</li>
            <li style={{ marginBottom: '8px' }}>All uploaded content may be monitored for compliance</li>
          </ul>

          <h3 style={{ 
            fontSize: '18px', 
            marginTop: '24px', 
            marginBottom: '12px',
            color: '#2d3748',
            fontWeight: '600'
          }}>
            4. User Responsibilities
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>You are solely responsible for the content you upload</li>
            <li style={{ marginBottom: '8px' }}>You must have the legal right to use and share any images</li>
            <li style={{ marginBottom: '8px' }}>You grant us license to store and display your submitted content</li>
            <li style={{ marginBottom: '8px' }}>You agree to cooperate with any investigations</li>
          </ul>

          <h3 style={{ 
            fontSize: '18px', 
            marginTop: '24px', 
            marginBottom: '12px',
            color: '#2d3748',
            fontWeight: '600'
          }}>
            5. Privacy & Data
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Your contact information will be visible to potential claimants</li>
            <li style={{ marginBottom: '8px' }}>Uploaded images are stored securely but may be publicly accessible</li>
            <li style={{ marginBottom: '8px' }}>We do not sell or share your personal information</li>
            <li style={{ marginBottom: '8px' }}>You can request deletion of your data at any time</li>
          </ul>

          <h3 style={{ 
            fontSize: '18px', 
            marginTop: '24px', 
            marginBottom: '12px',
            color: '#2d3748',
            fontWeight: '600'
          }}>
            6. Disclaimer
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>This service is provided "as is" without warranties</li>
            <li style={{ marginBottom: '8px' }}>We are not responsible for the accuracy of user-submitted content</li>
            <li style={{ marginBottom: '8px' }}>We do not guarantee item recovery or matches</li>
            <li style={{ marginBottom: '8px' }}>Users interact at their own risk</li>
          </ul>

          <div style={{
            background: '#fef5e7',
            border: '2px solid #f39c12',
            borderRadius: '8px',
            padding: '16px',
            marginTop: '24px'
          }}>
            <p style={{ 
              margin: 0, 
              fontWeight: '600',
              color: '#d68910'
            }}>
              ⚠️ Important: By accepting these terms, you acknowledge that violation of these terms may result in legal consequences, including but not limited to criminal prosecution for uploading illegal content.
            </p>
          </div>
        </div>

        <div style={{ 
          marginTop: '32px',
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              background: '#e2e8f0',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              color: '#4a5568',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#cbd5e0'}
            onMouseLeave={(e) => e.target.style.background = '#e2e8f0'}
          >
            Decline
          </button>
          <button
            onClick={() => {
              onAccept();
              onClose();
            }}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              color: 'white',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            ✓ Accept Terms
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}