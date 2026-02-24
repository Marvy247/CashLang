import { Code, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { covenantPatterns } from '@cashlang/core';
import { useEditorStore } from '../store/editorStore';

interface CovenantPatternsProps {
  darkMode: boolean;
  onClose: () => void;
}

export function CovenantPatterns({ darkMode, onClose }: CovenantPatternsProps) {
  const { updateCode } = useEditorStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInsert = (code: string) => {
    updateCode((current) => current + '\n\n' + code);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col`}>
        {/* Header */}
        <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Covenant Patterns
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                Production-ready CashTokens patterns for your contracts
              </p>
            </div>
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
            >
              Close
            </button>
          </div>
        </div>

        {/* Patterns Grid */}
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {covenantPatterns.map((pattern) => (
              <div
                key={pattern.id}
                className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <Code className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {pattern.name}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                      {pattern.description}
                    </p>
                  </div>
                </div>

                {/* Code Preview */}
                <div className={`p-3 rounded ${darkMode ? 'bg-gray-900' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} mb-3`}>
                  <pre className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-800'} overflow-x-auto`}>
                    {pattern.code}
                  </pre>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleInsert(pattern.code)}
                    className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium"
                  >
                    Insert into Editor
                  </button>
                  <button
                    onClick={() => handleCopy(pattern.code, pattern.id)}
                    className={`px-3 py-2 rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                    title="Copy to clipboard"
                  >
                    {copiedId === pattern.id ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            💡 These patterns use CashLang's syntax sugar for cleaner code. They'll be transpiled to proper CashScript.
          </div>
        </div>
      </div>
    </div>
  );
}
