import React from 'react';

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div>
		<div>
			<button onClick={onClose}>X</button>
			<div>
				{children}
			</div>
		</div>
    </div>
  );
};

export default Modal;