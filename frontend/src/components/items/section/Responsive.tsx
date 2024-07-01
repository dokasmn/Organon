import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface ResponsiveProps {
  children: ReactNode,
  style: string,
}

const Responsive:React.FC<ResponsiveProps> = ({ children, style }) => {

  const location = useLocation();
  return (
    location.pathname !== '/login' && location.pathname !== '/registrar' && location.pathname !== '/bem-vindo' ? 
      <section className={`${ style }  `}>
        {children}
      </section>
    :
      <section className={`w-full`}>
        {children}
      </section>
  );
};

export default Responsive;
