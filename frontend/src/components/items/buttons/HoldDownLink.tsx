// src/components/Link.tsx
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import React, { useState, useRef } from 'react';

interface HoldDownLinkProps {
  text: React.ReactNode | string;
  style?: string;
  to: string;
  holdDuration?: number; // Milissegundos
}

const HoldDownLink: React.FC<HoldDownLinkProps> = ({ text, style = "", to, holdDuration = 1000 }) => {
  const [isHeld, setIsHeld] = useState(false);
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();

  const handleMouseDown = () => {
    setIsHeld(true);
    timerRef.current = window.setTimeout(() => {
      navigate(to, { replace: true });
    }, holdDuration);
  };

  const handleMouseUpOrLeave = () => {
    setIsHeld(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div
      className={`relative cursor-pointer ${style}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
    >
      {text}
      {isHeld && (
        <div className="absolute top-0 left-0 w-full h-full bg-blue-1 opacity-30 loading-animation"></div>
      )}
    </div>
  );
};

export default HoldDownLink;
