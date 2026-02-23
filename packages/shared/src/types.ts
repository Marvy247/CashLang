// Shared types for CashLang
export interface CompileResult {
  success: boolean;
  cashscript?: string;
  artifact?: ContractArtifact;
  errors?: CompileError[];
  bytecode?: string;
  bytecodeSize?: number;
  simulation?: SimulationResult;
}

export interface CompileError {
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning';
}

export interface ContractArtifact {
  contractName: string;
  constructorInputs: ArtifactParameter[];
  abi: ArtifactFunction[];
  bytecode: string;
  source: string;
  compiler: {
    name: string;
    version: string;
  };
  updatedAt: string;
}

export interface ArtifactParameter {
  name: string;
  type: string;
}

export interface ArtifactFunction {
  name: string;
  inputs: ArtifactParameter[];
}

export interface SimulationResult {
  success: boolean;
  logs?: string[];
  error?: string;
  gasUsed?: number;
  stackTrace?: string[];
}

export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'defi' | 'nft' | 'dao' | 'token' | 'other';
  code: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  features: string[];
}
