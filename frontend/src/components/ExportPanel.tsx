import { Download, FileCode, FileJson, FileText, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useEditorStore } from '../store/editorStore';
import { generateDeploymentScript, generateTestScript, generateReadme } from '@cashlang/core';
import toast from 'react-hot-toast';

export function ExportPanel() {
  const { compileResult } = useEditorStore();
  const [copied, setCopied] = useState<string | null>(null);

  if (!compileResult?.success || !compileResult.artifact) {
    return null;
  }

  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${filename}`);
  };

  const copyToClipboard = (content: string, label: string) => {
    navigator.clipboard.writeText(content);
    setCopied(label);
    toast.success(`Copied ${label} to clipboard`);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadAll = () => {
    const contractName = compileResult.artifact!.contractName;
    
    // Download CashScript
    downloadFile(`${contractName}.cash`, compileResult.cashscript!);
    
    // Download artifact
    downloadFile(`${contractName}.json`, JSON.stringify(compileResult.artifact, null, 2));
    
    // Download deployment script
    const deployScript = generateDeploymentScript(compileResult.artifact!);
    downloadFile('deploy.js', deployScript);
    
    // Download test script
    const testScript = generateTestScript(compileResult.artifact!);
    downloadFile('test.js', testScript);
    
    // Download README
    const readme = generateReadme(compileResult.artifact!);
    downloadFile('README.md', readme);
    
    toast.success('📦 Downloaded complete project!');
  };

  return (
    <div className="border-t border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-700 text-sm">Export & Deploy</h3>
        <button
          onClick={downloadAll}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download All
        </button>
      </div>

      <div className="space-y-2">
        {/* CashScript */}
        <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">{compileResult.artifact.contractName}.cash</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => copyToClipboard(compileResult.cashscript!, 'CashScript')}
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              title="Copy to clipboard"
            >
              {copied === 'CashScript' ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600" />
              )}
            </button>
            <button
              onClick={() => downloadFile(`${compileResult.artifact!.contractName}.cash`, compileResult.cashscript!)}
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Artifact */}
        <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <FileJson className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">{compileResult.artifact.contractName}.json</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => copyToClipboard(JSON.stringify(compileResult.artifact, null, 2), 'Artifact')}
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              title="Copy to clipboard"
            >
              {copied === 'Artifact' ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600" />
              )}
            </button>
            <button
              onClick={() => downloadFile(`${compileResult.artifact!.contractName}.json`, JSON.stringify(compileResult.artifact, null, 2))}
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Deployment Script */}
        <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium">deploy.js</span>
          </div>
          <button
            onClick={() => downloadFile('deploy.js', generateDeploymentScript(compileResult.artifact!))}
            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
            title="Download"
          >
            <Download className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Test Script */}
        <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium">test.js</span>
          </div>
          <button
            onClick={() => downloadFile('test.js', generateTestScript(compileResult.artifact!))}
            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
            title="Download"
          >
            <Download className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          💡 <strong>Ready to deploy?</strong> Download the deployment script and follow the README instructions.
        </p>
      </div>
    </div>
  );
}
