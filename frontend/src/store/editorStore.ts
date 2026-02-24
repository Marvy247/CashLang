import { create } from 'zustand';
import type { CompileResult, Template } from '@cashlang/shared';

interface EditorState {
  currentFile: string;
  files: Record<string, string>;
  compileResult: CompileResult | null;
  isCompiling: boolean;
  selectedTemplate: Template | null;
  
  setCurrentFile: (path: string) => void;
  updateFile: (path: string, content: string) => void;
  setCompileResult: (result: CompileResult) => void;
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
  isCompiling: false,
  selectedTemplate: null,

  setCurrentFile: (path) => set({ currentFile: path }),
  
  updateFile: (path, content) => set((state) => ({
    files: { ...state.files, [path]: content }
  })),
  
  setCompileResult: (result) => set({ compileResult: result }),
  
  setIsCompiling: (isCompiling) => set({ isCompiling }),
  
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  
  loadTemplate: (template) => set((state) => ({
    files: { ...state.files, [state.currentFile]: template.code },
    selectedTemplate: template
  }))
}));
