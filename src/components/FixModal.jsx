import React from 'react';

const FixModal = ({ item, onClose, onConfirm, isFixing }) => {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Remediate Issue</h2>
        <div className="modal-body">
          <p><strong>Issue:</strong> {item.issue}</p>
          <p><strong>Service:</strong> {item.service} ({item.region})</p>
          
          <div className="command-block">
            {item.command}
          </div>

          <p className="modal-note">
            This action will execute the CLI command above to resolve the misconfiguration.
          </p>
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button 
            onClick={onConfirm} 
            disabled={isFixing}
            className="btn-primary"
          >
            {isFixing ? 'Applying Fix...' : 'Confirm Fix'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FixModal;