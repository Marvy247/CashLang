import { FileCode } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

export function FileTree() {
  const { currentFile, files, setCurrentFile } = useEditorStore();

  return (
    <div className="h-full bg-gray-50 border-r border-gray-200 p-4">
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Files</h3>
      </div>
      
      <div className="space-y-1">
        {Object.keys(files).map((filename) => (
          <div
            key={filename}
            onClick={() => setCurrentFile(filename)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
              currentFile === filename
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'hover:bg-gray-200 text-gray-700'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span className="text-sm">{filename}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
