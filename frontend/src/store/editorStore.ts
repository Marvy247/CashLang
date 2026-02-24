import { create } from 'zustand';
import type { CompileResult, Template } from '@cashlang/shared';

interface SecurityReport {
  score: number;
  issues: Array<{
    severity: 'critical' | 'warning' | 'info';
    title: string;
    description: string;
    suggestion: string;
  }>;
  passed: string[];
}

interface EditorState {
  currentFile: string;
  files: Record<string, string>;
  compileResult: CompileResult | null;
  securityReport: SecurityReport | null;
  isCompiling: boolean;
  selectedTemplate: Template | null;
  
  setCurrentFile: (path: string) => void;
  updateFile: (path: string, content: string) => void;
  updateCode: (updater: (current: string) => string) => void;
  setCompileResult: (result: CompileResult) => void;
  setSecurityReport: (report: SecurityReport | null) => void;
  setIsCompiling: (isCompiling: boolean) => void;
  setSelectedTemplate: (template: Template | null) => void;
  loadTemplate: (template: Template) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  currentFile: 'main.cash',
  files: {
    'main.cash': `// Welcome to CashLang! 🚀
// Click "Templates" to load a production-ready contract

contract SimpleVault(pubkey owner, int amount) {
  function withdraw(sig ownerSig) {
    require(checkSig(ownerSig, owner));
  }
}
`
  },
  compileResult: null,
  securityReport: null,
  isCompiling: false,
  selectedTemplate: null,

  setCurrentFile: (path) => set({ currentFile: path }),
  
  updateFile: (path, content) => set((state) => ({
    files: { ...state.files, [path]: content }
  })),
  
  updateCode: (updater) => set((state) => ({
    files: { ...state.files, [state.currentFile]: updater(state.files[state.currentFile] || '') }
  })),
  
  setCompileResult: (result) => set({ compileResult: result }),
  
  setSecurityReport: (report) => set({ securityReport: report }),
  
  setIsCompiling: (isCompiling) => set({ isCompiling }),
  
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  
  loadTemplate: (template) => set((state) => ({
    files: { ...state.files, [state.currentFile]: template.code },
    selectedTemplate: template
  }))
}));
