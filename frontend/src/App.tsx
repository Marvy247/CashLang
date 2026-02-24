import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';
import { Code2, Sparkles, Moon, Sun, Github, HelpCircle, Home } from 'lucide-react';
import { CodeEditor } from './components/CodeEditor';
import { FileTree } from './components/FileTree';
import { CompileButton, OutputPanel } from './components/CompilePanel';
import { TemplateGallery } from './components/TemplateGallery';
import { HelpModal } from './components/HelpModal';
import { LandingPage } from './components/LandingPage';
import { StatusBar } from './components/StatusBar';
import { useEditorStore } from './store/editorStore';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const { currentFile, selectedTemplate } = useEditorStore();

  // Keyboard shortcuts
  useEffect(() => {
    if (showLanding) return; // Disable shortcuts on landing page

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S - Compile
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        document.querySelector<HTMLButtonElement>('button[data-compile]')?.click();
      }
      // Ctrl+T - Templates
      if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        setShowTemplates(true);
      }
      // ? - Help
      if (e.key === '?' && !e.ctrlKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setShowHelp(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLanding]);

  if (showLanding) {
    return (
      <>
        <Analytics />
        <LandingPage onGetStarted={() => setShowLanding(false)} />
      </>
    );
  }

  return (
    <div className={`h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Analytics />
      <Toaster position="top-right" />

      {/* Header */}
      <header className={`h-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-100 border-b border-gray-200'} flex items-center justify-between px-6 shadow-sm`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLanding(true)}
            className={`p-2 ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-200 text-gray-900'} rounded-lg transition-colors`}
            title="Back to home"
          >
            <Home className="w-5 h-5" />
          </button>
          <div className={`p-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg`}>
            <Code2 className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
          </div>
          <div>
            <h1 className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>CashLang</h1>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bitcoin Cash Smart Contract IDE</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className={`flex items-center gap-2 px-4 py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'} rounded-lg transition-colors`}
          >
            <Sparkles className="w-4 h-4" />
            Templates
          </button>
          
          <button
            onClick={() => setShowHelp(true)}
            className={`p-2 ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-200 text-gray-900'} rounded-lg transition-colors`}
            title="Keyboard shortcuts"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          <a
            href="https://github.com/yourusername/cashlang"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-200 text-gray-900'} rounded-lg transition-colors`}
          >
            <Github className="w-5 h-5" />
          </a>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-200 text-gray-900'} rounded-lg transition-colors`}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <FileTree />
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className={`h-14 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100'} border-b border-gray-200 flex items-center justify-between px-6`}>
            <div className="flex items-center gap-4">
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{currentFile}</span>
              {selectedTemplate && (
                <span className={`text-xs px-2 py-1 ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'} rounded-md`}>
                  {selectedTemplate.name}
                </span>
              )}
              <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>CashLang v0.1.1</span>
            </div>
            <div data-compile>
              <CompileButton />
            </div>
          </div>

          {/* Editor + Output Split */}
          <div className="flex-1 flex overflow-hidden">
            {/* Code Editor */}
            <div className="flex-1">
              <CodeEditor darkMode={darkMode} />
            </div>

            {/* Output Panel */}
            <div className={`w-96 border-l ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} overflow-hidden`}>
              <div className="h-full flex flex-col">
                <div className={`h-12 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50'} border-b border-gray-200 flex items-center px-4`}>
                  <h3 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Output</h3>
                </div>
                <div className="flex-1 overflow-auto">
                  <OutputPanel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Gallery Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-between px-6">
              <h2 className="font-bold text-lg">Template Gallery</h2>
              <button
                data-close-templates
                onClick={() => setShowTemplates(false)}
                className="text-2xl hover:bg-white/20 w-8 h-8 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(80vh-3.5rem)]">
              <TemplateGallery />
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />

      {/* Status Bar */}
      <StatusBar />
    </div>
  );
}

export default App;
