import { Play, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { transpile } from '@cashlang/core';
import toast from 'react-hot-toast';

export function CompileButton() {
  const { currentFile, files, setCompileResult, isCompiling, setIsCompiling } = useEditorStore();

  const handleCompile = async () => {
    setIsCompiling(true);
    
    // Simulate async compilation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const source = files[currentFile];
    const result = transpile(source);
    
    setCompileResult(result);
    setIsCompiling(false);

    if (result.success) {
      toast.success('✨ Compiled successfully!');
    } else {
      toast.error('❌ Compilation failed');
    }
  };

  return (
    <button
      onClick={handleCompile}
      disabled={isCompiling}
      className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {isCompiling ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Compiling...
        </>
      ) : (
        <>
          <Play className="w-4 h-4" />
          Compile
        </>
      )}
    </button>
  );
}

export function OutputPanel() {
  const { compileResult } = useEditorStore();

  if (!compileResult) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>Click "Compile" to see output</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-4 space-y-4">
      {/* Status */}
      <div className="flex items-center gap-2">
        {compileResult.success ? (
          <>
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="font-semibold text-green-600">Compilation Successful</span>
          </>
        ) : (
          <>
            <XCircle className="w-5 h-5 text-red-500" />
            <span className="font-semibold text-red-600">Compilation Failed</span>
          </>
        )}
      </div>

      {/* Errors */}
      {compileResult.errors && compileResult.errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-semibold text-red-800 mb-2">Errors:</h3>
          {compileResult.errors.map((err, i) => (
            <div key={i} className="text-sm text-red-700 font-mono">
              Line {err.line}:{err.column} - {err.message}
            </div>
          ))}
        </div>
      )}

      {/* Generated CashScript */}
      {compileResult.success && compileResult.cashscript && (
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Generated CashScript:</h3>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
            {compileResult.cashscript}
          </pre>
        </div>
      )}

      {/* Bytecode Info */}
      {compileResult.success && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="text-xs text-blue-600 font-medium">Bytecode Size</div>
            <div className="text-2xl font-bold text-blue-900">{compileResult.bytecodeSize} bytes</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <div className="text-xs text-purple-600 font-medium">Functions</div>
            <div className="text-2xl font-bold text-purple-900">{compileResult.artifact?.abi.length || 0}</div>
          </div>
        </div>
      )}

      {/* Artifact */}
      {compileResult.success && compileResult.artifact && (
        <details className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <summary className="font-semibold text-gray-700 cursor-pointer">Contract Artifact (JSON)</summary>
          <pre className="mt-2 text-xs overflow-x-auto">
            {JSON.stringify(compileResult.artifact, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}
