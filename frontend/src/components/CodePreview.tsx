import React, { useEffect, useRef } from 'react';

interface CodePreviewProps {
  jsx: string;
  css: string;
}

const CodePreview: React.FC<CodePreviewProps> = ({ jsx, css }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`
          <html>
            <head>
              <style>${css}</style>
            </head>
            <body>
              <div id="root">${jsx}</div>
            </body>
          </html>
        `);
        doc.close();
      }
    }
  }, [jsx, css]);

  if (!jsx && !css) {
    return <div className="p-4 bg-gray-100 rounded shadow text-center text-gray-400">No code to preview.</div>;
  }

  return (
    <iframe
      ref={iframeRef}
      title="Component Preview"
      className="w-full h-64 bg-white rounded shadow border"
      sandbox="allow-scripts"
    />
  );
};

export default CodePreview; 