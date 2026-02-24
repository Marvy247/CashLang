import Editor from '@monaco-editor/react';
import { useEditorStore } from '../store/editorStore';

interface CodeEditorProps {
  darkMode: boolean;
}

export function CodeEditor({ darkMode }: CodeEditorProps) {
  const { currentFile, files, updateFile } = useEditorStore();
  const content = files[currentFile] || '';

  return (
    <div className={`h-full w-full relative ${darkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        language="javascript"
        theme={darkMode ? 'vs-dark' : 'light'}
        value={content}
        onChange={(value: string | undefined) => updateFile(currentFile, value || '')}
        loading={
          <div className={`h-full w-full flex items-center justify-center ${darkMode ? 'bg-[#1e1e1e] text-gray-400' : 'bg-white text-gray-600'}`}>
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <div>Loading editor...</div>
            </div>
          </div>
        }
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          padding: { top: 16, bottom: 16 },
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          contextmenu: true,
          quickSuggestions: true,
          suggestOnTriggerCharacters: true,
        }}
      />
    </div>
  );
}
