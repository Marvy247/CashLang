import Editor from '@monaco-editor/react';
import { useEditorStore } from '../store/editorStore';

export function CodeEditor() {
  const { currentFile, files, updateFile } = useEditorStore();
  const content = files[currentFile] || '';

  return (
    <div className="h-full w-full relative">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        language="javascript"
        theme="vs-dark"
        value={content}
        onChange={(value: string | undefined) => updateFile(currentFile, value || '')}
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
