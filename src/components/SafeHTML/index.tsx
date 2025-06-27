interface SafeHTMLProps {
  htmlContent: string;
}

const SafeHTML = ({ htmlContent }: SafeHTMLProps) => {
  // Clean and enhance HTML content
  const enhanceHtml = (html: string) => {
    if (!html) return '';
    
    // Add classes to paragraphs if they don't have any
    let enhancedHtml = html.replace(
      /<p(?![^>]*class=)[^>]*>/g, 
      '<p class="mb-4 text-[#636363]">'
    );
    
    // Add classes to headings if they don't have any
    enhancedHtml = enhancedHtml.replace(
      /<h([1-6])(?![^>]*class=)[^>]*>/g, 
      '<h$1 class="font-semibold text-[#313131] mb-3 mt-5">'
    );
    
    // Add classes to lists if they don't have any
    enhancedHtml = enhancedHtml.replace(
      /<ul(?![^>]*class=)[^>]*>/g, 
      '<ul class="list-disc pl-6 mb-4 space-y-2">'
    );
    
    enhancedHtml = enhancedHtml.replace(
      /<ol(?![^>]*class=)[^>]*>/g, 
      '<ol class="list-decimal pl-6 mb-4 space-y-2">'
    );
    
    // Add classes to list items if they don't have any
    enhancedHtml = enhancedHtml.replace(
      /<li(?![^>]*class=)[^>]*>/g, 
      '<li class="text-[#636363]">'
    );
    
    return enhancedHtml;
  };
  
  return <div dangerouslySetInnerHTML={{ __html: enhanceHtml(htmlContent) }} className="text-left" />;
};

export default SafeHTML; 