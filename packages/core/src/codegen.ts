import type { ContractNode, FunctionNode, StatementNode, ExpressionNode, RequireStatement, BinaryExpression, Identifier, Literal, MemberExpression } from './parser.js';
import type { ContractArtifact } from '@cashlang/shared';

// Code generator: AST -> CashScript
export function generate(ast: ContractNode): { cashscript: string; artifact: ContractArtifact } {
  let output = '';

  // Generate contract header
  output += `contract ${ast.name}(`;
  output += ast.parameters.map(p => `${p.paramType} ${p.name}`).join(', ');
  output += ') {\n';

  // Generate functions
  for (const fn of ast.functions) {
    output += generateFunction(fn);
  }

  output += '}\n';

  // Generate artifact
  const artifact: ContractArtifact = {
    contractName: ast.name,
    constructorInputs: ast.parameters.map(p => ({
      name: p.name,
      type: mapType(p.paramType)
    })),
    abi: ast.functions.map(fn => ({
      name: fn.name,
      inputs: fn.parameters.map(p => ({
        name: p.name,
        type: mapType(p.paramType)
      }))
    })),
    bytecode: 'mock_bytecode_' + Date.now(),
    source: output,
    compiler: {
      name: 'cashlang',
      version: '0.1.0'
    },
    updatedAt: new Date().toISOString()
  };

  return { cashscript: output, artifact };
}

function generateFunction(fn: FunctionNode): string {
  let output = `  function ${fn.name}(`;
  output += fn.parameters.map(p => `${p.paramType} ${p.name}`).join(', ');
  output += ') {\n';

  for (const stmt of fn.body) {
    output += generateStatement(stmt, 2);
  }

  output += '  }\n\n';
  return output;
}

function generateStatement(stmt: StatementNode, indent: number): string {
  const spaces = '  '.repeat(indent);

  if (stmt.type === 'RequireStatement') {
    const req = stmt as RequireStatement;
    return `${spaces}require(${generateExpression(req.condition)});\n`;
  }

  return '';
}

function generateExpression(expr: ExpressionNode): string {
  switch (expr.type) {
    case 'BinaryExpression': {
      const bin = expr as BinaryExpression;
      const op = mapOperator(bin.operator);
      return `${generateExpression(bin.left)} ${op} ${generateExpression(bin.right)}`;
    }
    case 'Identifier': {
      const id = expr as Identifier;
      return id.name;
    }
    case 'Literal': {
      const lit = expr as Literal;
      return typeof lit.value === 'string' ? `"${lit.value}"` : String(lit.value);
    }
    case 'MemberExpression': {
      const mem = expr as MemberExpression;
      return `${generateExpression(mem.object)}.${mem.property.name}`;
    }
    default:
      return '';
  }
}

function mapOperator(op: string): string {
  const opMap: Record<string, string> = {
    '>': '>', '<': '<', '==': '==', '!=': '!=', '>=': '>=', '<=': '<=',
    '+': '+', '-': '-', '*': '*', '/': '/'
  };
  return opMap[op] || op;
}

function mapType(type: string): string {
  // Map CashLang types to CashScript types
  const typeMap: Record<string, string> = {
    'int': 'int',
    'bool': 'bool',
    'string': 'string',
    'bytes': 'bytes',
    'pubkey': 'pubkey',
    'sig': 'sig',
    'datasig': 'datasig'
  };
  return typeMap[type] || type;
}
