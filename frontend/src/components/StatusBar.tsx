import { CheckCircle, XCircle, FileCode } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

export function StatusBar() {
  const { currentFile, files, compileResult } = useEditorStore();
  const currentCode = files[currentFile] || '';
  const lineCount = currentCode.split('\n').length;
  const charCount = currentCode.length;

  return (
    <div className="h-7 bg-gray-900 text-gray-300 text-xs flex items-center justify-between px-4 border-t border-gray-700">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <FileCode className="w-3.5 h-3.5" />
          <span>{currentFile}</span>
        </div>
        
        {compileResult && (
          <div className="flex items-center gap-1.5">
            {compileResult.success ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400">Ready</span>
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5 text-red-400" />
                <span className="text-red-400">{compileResult.errors?.length || 0} error(s)</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <span>{lineCount} lines</span>
        <span>{charCount} characters</span>
        <span className="text-gray-500">CashLang</span>
      </div>
    </div>
  );
}
