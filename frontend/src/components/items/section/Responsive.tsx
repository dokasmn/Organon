import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface ResponsiveProps {
  children: ReactNode,
  style: string,
}

const Responsive:React.FC<ResponsiveProps> = ({ children, style }) => {

  const location = useLocation();

  return (
    location.pathname !== '/login' && location.pathname !== '/register' ? 
      <section className={`${ style }`}>
        {children}
      </section>
    :
    <section className={``}>
      {children}
    </section>
  );
};

export default Responsive;
