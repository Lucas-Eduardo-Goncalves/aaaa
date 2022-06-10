import React from 'react';
import FeatherIcon from 'feather-icons-react';

function EmptyMessage({ text, iconSize, textSize }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <FeatherIcon color="#9299B8" style={{ opacity: 0.6 }} icon="inbox" size={iconSize} strokeWidth={1} />
      <p style={{ color: '#9299B8', fontSize: textSize }}>{text}</p>
    </div>
  );
}

export default EmptyMessage;
