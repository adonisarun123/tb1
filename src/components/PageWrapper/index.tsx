import React from 'react';
import SkipSearchPopup from '../SkipSearchPopup';
import useSkipSearchPopup from '../../hooks/useSkipSearchPopup';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className }) => {
  const { isVisible, closePopup } = useSkipSearchPopup();

  return (
    <div className={className}>
      {children}
      <SkipSearchPopup isVisible={isVisible} onClose={closePopup} />
    </div>
  );
};

export default PageWrapper; 