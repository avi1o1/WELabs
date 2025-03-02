import React from 'react';

interface PageContentProps {
  children: React.ReactNode;
}

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <div className="page-content container mx-auto px-4 py-8">
      {children}
    </div>
  );
};

export default PageContent;
