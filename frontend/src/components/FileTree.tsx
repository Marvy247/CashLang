import { FileCode, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useEditorStore } from '../store/editorStore';

interface FileTreeProps {
  darkMode: boolean;
}

export function FileTree({ darkMode }: FileTreeProps) {
  const { currentFile, files, setCurrentFile, updateFile } = useEditorStore();
  const [showNewFile, setShowNewFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateFile = () => {
    if (newFileName && !files[newFileName]) {
      updateFile(newFileName, '// New contract\ncontract NewContract() {\n  function example() {\n    require(true);\n  }\n}\n');
      setCurrentFile(newFileName);
      setNewFileName('');
      setShowNewFile(false);
    }
  };

  const filteredFiles = Object.keys(files).filter(name => 
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`h-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50'} border-r border-gray-200 flex flex-col`}>
      {/* Header */}
      <div className={`p-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Explorer</h3>
          <button
            onClick={() => setShowNewFile(true)}
            className={`p-1 ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-600'} rounded transition-colors`}
            title="New file"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className={`w-3.5 h-3.5 absolute left-2 top-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-7 pr-2 py-1.5 text-xs border ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      </div>

      {/* New File Input */}
      {showNewFile && (
        <div className={`p-3 ${darkMode ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50'} border-b border-blue-200`}>
          <input
            type="text"
            placeholder="filename.cash"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateFile();
              if (e.key === 'Escape') setShowNewFile(false);
            }}
            autoFocus
            className={`w-full px-2 py-1.5 text-sm border ${darkMode ? 'bg-gray-700 border-blue-700 text-gray-200' : 'bg-white border-blue-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleCreateFile}
              className="flex-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create
            </button>
            <button
              onClick={() => setShowNewFile(false)}
              className={`flex-1 px-2 py-1 text-xs ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} rounded`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* File List */}
      <div className="flex-1 overflow-auto p-2">
        <div className="space-y-1">
          {filteredFiles.length === 0 ? (
            <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} text-center py-4`}>
              No files found
            </div>
          ) : (
            filteredFiles.map((filename) => (
              <div
                key={filename}
                onClick={() => setCurrentFile(filename)}
                className={`group flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  currentFile === filename
                    ? darkMode 
                      ? 'bg-blue-900/50 text-blue-200 font-medium'
                      : 'bg-blue-100 text-blue-700 font-medium'
                    : darkMode
                      ? 'hover:bg-gray-700 text-gray-300'
                      : 'hover:bg-gray-200 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <FileCode className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm truncate">{filename}</span>
                </div>
                {filename !== 'main.cash' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newFiles = { ...files };
                      delete newFiles[filename];
                      if (currentFile === filename) {
                        setCurrentFile('main.cash');
                      }
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-opacity"
                    title="Delete file"
                  >
                    <Trash2 className="w-3 h-3 text-red-600" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer Stats */}
      <div className={`p-2 border-t ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-100'}`}>
        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {Object.keys(files).length} file{Object.keys(files).length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}
