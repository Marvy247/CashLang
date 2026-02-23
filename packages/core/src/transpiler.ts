import { parse } from './parser.js';
import { generate } from './codegen.js';
import type { CompileResult } from '@cashlang/shared';

export function transpile(source: string): CompileResult {
  try {
    // Parse source
    const { ast, errors } = parse(source);

    if (errors.length > 0 || !ast) {
      return {
        success: false,
        errors
      };
    }

    // Generate CashScript
    const { cashscript, artifact } = generate(ast);

    // Calculate bytecode size (mock for now)
    const bytecodeSize = Math.floor(cashscript.length / 2);

    return {
      success: true,
      cashscript,
      artifact,
      bytecode: artifact.bytecode,
      bytecodeSize
    };
  } catch (error) {
    return {
      success: false,
      errors: [{
        line: 0,
        column: 0,
        message: `Transpilation error: ${error}`,
        severity: 'error'
      }]
    };
  }
}
