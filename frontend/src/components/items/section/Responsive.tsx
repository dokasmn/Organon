import React from 'react';

interface ResponsiveProps {
  children: string,
  style: string,
}

const Responsive:React.FC<ResponsiveProps> = ({ children, style }) => {
  return (
    <section className={`${ style }`}>
      {children}
    </section>
  );
};

export default Responsive;
