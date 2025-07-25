import React, { useState, KeyboardEvent } from 'react';

interface TabsProps {
  jsx: string;
  css: string;
}

const Tabs: React.FC<TabsProps> = ({ jsx, css }) => {
  const [tab, setTab] = useState<'jsx' | 'css'>('jsx');
  const tabOrder: Array<'jsx' | 'css'> = ['jsx', 'css'];

  const handleCopy = async () => {
    const code = tab === 'jsx' ? jsx : css;
    await navigator.clipboard.writeText(code);
    alert('Copied!');
  };

  const handleDownload = () => {
    const code = tab === 'jsx' ? jsx : css;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = tab === 'jsx' ? 'component.jsx' : 'styles.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const idx = tabOrder.indexOf(tab);
    if (e.key === 'ArrowRight') {
      setTab(tabOrder[(idx + 1) % tabOrder.length]);
    } else if (e.key === 'ArrowLeft') {
      setTab(tabOrder[(idx - 1 + tabOrder.length) % tabOrder.length]);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <div role="tablist" aria-label="Code tabs" className="flex gap-2 mb-2">
        <button
          role="tab"
          aria-selected={tab === 'jsx'}
          aria-controls="jsx-panel"
          id="jsx-tab"
          tabIndex={tab === 'jsx' ? 0 : -1}
          className={`px-3 py-1 rounded ${tab === 'jsx' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('jsx')}
          onKeyDown={handleTabKeyDown}
        >
          JSX
        </button>
        <button
          role="tab"
          aria-selected={tab === 'css'}
          aria-controls="css-panel"
          id="css-tab"
          tabIndex={tab === 'css' ? 0 : -1}
          className={`px-3 py-1 rounded ${tab === 'css' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('css')}
          onKeyDown={handleTabKeyDown}
        >
          CSS
        </button>
        <button
          aria-label="Copy code"
          className="ml-auto px-3 py-1 bg-gray-100 rounded border hover:bg-gray-200"
          onClick={handleCopy}
        >
          Copy
        </button>
        <button
          aria-label="Download code"
          className="px-3 py-1 bg-gray-100 rounded border hover:bg-gray-200"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
      <div
        role="tabpanel"
        id="jsx-panel"
        aria-labelledby="jsx-tab"
        hidden={tab !== 'jsx'}
      >
        <pre className="bg-gray-100 rounded p-2 overflow-x-auto text-sm">
          <code>{jsx}</code>
        </pre>
      </div>
      <div
        role="tabpanel"
        id="css-panel"
        aria-labelledby="css-tab"
        hidden={tab !== 'css'}
      >
        <pre className="bg-gray-100 rounded p-2 overflow-x-auto text-sm">
          <code>{css}</code>
        </pre>
      </div>
    </div>
  );
};

export default Tabs; 