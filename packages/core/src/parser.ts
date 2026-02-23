import type { CompileResult, CompileError } from '@cashlang/shared';

// AST Node Types
export interface ASTNode {
  type: string;
  loc?: { line: number; column: number };
}

export interface ContractNode extends ASTNode {
  type: 'Contract';
  name: string;
  parameters: ParameterNode[];
  functions: FunctionNode[];
}

export interface FunctionNode extends ASTNode {
  type: 'Function';
  name: string;
  parameters: ParameterNode[];
  body: StatementNode[];
}

export interface ParameterNode extends ASTNode {
  type: 'Parameter';
  name: string;
  paramType: string;
}

export interface StatementNode extends ASTNode {
  type: 'RequireStatement' | 'AssignmentStatement' | 'ExpressionStatement';
}

export interface RequireStatement extends StatementNode {
  type: 'RequireStatement';
  condition: ExpressionNode;
}

export interface ExpressionNode extends ASTNode {
  type: 'BinaryExpression' | 'Identifier' | 'Literal' | 'CallExpression' | 'MemberExpression';
}

export interface BinaryExpression extends ExpressionNode {
  type: 'BinaryExpression';
  operator: string;
  left: ExpressionNode;
  right: ExpressionNode;
}

export interface Identifier extends ExpressionNode {
  type: 'Identifier';
  name: string;
}

export interface Literal extends ExpressionNode {
  type: 'Literal';
  value: string | number | boolean;
}

export interface CallExpression extends ExpressionNode {
  type: 'CallExpression';
  callee: ExpressionNode;
  arguments: ExpressionNode[];
}

export interface MemberExpression extends ExpressionNode {
  type: 'MemberExpression';
  object: ExpressionNode;
  property: Identifier;
}

// Simple recursive descent parser for CashLang
export function parse(source: string): { ast: ContractNode | null; errors: CompileError[] } {
  const tokens = tokenize(source);
  const errors: CompileError[] = [];
  let current = 0;

  function peek(): Token | undefined {
    return tokens[current];
  }

  function advance(): Token {
    return tokens[current++];
  }

  function expect(type: string): Token | null {
    const token = peek();
    if (!token || token.type !== type) {
      errors.push({
        line: token?.line || 0,
        column: token?.column || 0,
        message: `Expected ${type}, got ${token?.type || 'EOF'}`,
        severity: 'error'
      });
      return null;
    }
    return advance();
  }

  function parseContract(): ContractNode | null {
    const contractToken = expect('KEYWORD');
    if (!contractToken || contractToken.value !== 'contract') return null;

    const nameToken = expect('IDENTIFIER');
    if (!nameToken) return null;

    expect('LPAREN');
    const parameters = parseParameterList();
    expect('RPAREN');
    expect('LBRACE');

    const functions: FunctionNode[] = [];
    while (peek() && peek()!.type !== 'RBRACE') {
      const fn = parseFunction();
      if (fn) functions.push(fn);
    }

    expect('RBRACE');

    return {
      type: 'Contract',
      name: nameToken.value,
      parameters,
      functions
    };
  }

  function parseParameterList(): ParameterNode[] {
    const params: ParameterNode[] = [];
    while (peek() && peek()!.type !== 'RPAREN') {
      const typeToken = expect('IDENTIFIER');
      const nameToken = expect('IDENTIFIER');
      if (typeToken && nameToken) {
        params.push({
          type: 'Parameter',
          name: nameToken.value,
          paramType: typeToken.value
        });
      }
      if (peek()?.type === 'COMMA') advance();
    }
    return params;
  }

  function parseFunction(): FunctionNode | null {
    const fnToken = expect('KEYWORD');
    if (!fnToken || fnToken.value !== 'function') return null;

    const nameToken = expect('IDENTIFIER');
    if (!nameToken) return null;

    expect('LPAREN');
    const parameters = parseParameterList();
    expect('RPAREN');
    expect('LBRACE');

    const body: StatementNode[] = [];
    while (peek() && peek()!.type !== 'RBRACE') {
      const stmt = parseStatement();
      if (stmt) body.push(stmt);
    }

    expect('RBRACE');

    return {
      type: 'Function',
      name: nameToken.value,
      parameters,
      body
    };
  }

  function parseStatement(): StatementNode | null {
    const token = peek();
    if (!token) return null;

    if (token.type === 'KEYWORD' && token.value === 'require') {
      advance();
      expect('LPAREN');
      const condition = parseExpression();
      expect('RPAREN');
      expect('SEMICOLON');
      return {
        type: 'RequireStatement',
        condition: condition!
      } as RequireStatement;
    }

    // Skip other statements for MVP
    advance();
    return null;
  }

  function parseExpression(): ExpressionNode | null {
    return parseBinaryExpression();
  }

  function parseBinaryExpression(): ExpressionNode | null {
    let left = parsePrimary();
    if (!left) return null;

    while (peek() && ['GT', 'LT', 'EQ', 'NEQ', 'GTE', 'LTE', 'PLUS', 'MINUS'].includes(peek()!.type)) {
      const op = advance();
      const right = parsePrimary();
      if (!right) break;
      left = {
        type: 'BinaryExpression',
        operator: op.value,
        left,
        right
      } as BinaryExpression;
    }

    return left;
  }

  function parsePrimary(): ExpressionNode | null {
    const token = peek();
    if (!token) return null;

    if (token.type === 'IDENTIFIER') {
      advance();
      // Check for member access or call
      if (peek()?.type === 'DOT') {
        advance();
        const property = expect('IDENTIFIER');
        if (!property) return null;
        return {
          type: 'MemberExpression',
          object: { type: 'Identifier', name: token.value } as Identifier,
          property: { type: 'Identifier', name: property.value } as Identifier
        } as MemberExpression;
      }
      return { type: 'Identifier', name: token.value } as Identifier;
    }

    if (token.type === 'NUMBER' || token.type === 'STRING') {
      advance();
      return { type: 'Literal', value: token.value } as Literal;
    }

    return null;
  }

  try {
    const ast = parseContract();
    return { ast, errors };
  } catch (e) {
    errors.push({
      line: 0,
      column: 0,
      message: `Parse error: ${e}`,
      severity: 'error'
    });
    return { ast: null, errors };
  }
}

interface Token {
  type: string;
  value: string;
  line: number;
  column: number;
}

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let line = 1;
  let column = 1;
  let i = 0;

  const keywords = ['contract', 'function', 'require', 'if', 'else', 'return', 'true', 'false'];

  while (i < source.length) {
    const char = source[i];

    // Whitespace
    if (/\s/.test(char)) {
      if (char === '\n') {
        line++;
        column = 1;
      } else {
        column++;
      }
      i++;
      continue;
    }

    // Comments
    if (char === '/' && source[i + 1] === '/') {
      while (i < source.length && source[i] !== '\n') i++;
      continue;
    }

    // Identifiers and keywords
    if (/[a-zA-Z_]/.test(char)) {
      let value = '';
      const startCol = column;
      while (i < source.length && /[a-zA-Z0-9_]/.test(source[i])) {
        value += source[i];
        i++;
        column++;
      }
      tokens.push({
        type: keywords.includes(value) ? 'KEYWORD' : 'IDENTIFIER',
        value,
        line,
        column: startCol
      });
      continue;
    }

    // Numbers
    if (/[0-9]/.test(char)) {
      let value = '';
      const startCol = column;
      while (i < source.length && /[0-9]/.test(source[i])) {
        value += source[i];
        i++;
        column++;
      }
      tokens.push({ type: 'NUMBER', value, line, column: startCol });
      continue;
    }

    // Strings
    if (char === '"' || char === "'") {
      const quote = char;
      let value = '';
      const startCol = column;
      i++;
      column++;
      while (i < source.length && source[i] !== quote) {
        value += source[i];
        i++;
        column++;
      }
      i++;
      column++;
      tokens.push({ type: 'STRING', value, line, column: startCol });
      continue;
    }

    // Operators and punctuation
    const ops: Record<string, string> = {
      '(': 'LPAREN', ')': 'RPAREN', '{': 'LBRACE', '}': 'RBRACE',
      ';': 'SEMICOLON', ',': 'COMMA', '.': 'DOT',
      '+': 'PLUS', '-': 'MINUS', '*': 'STAR', '/': 'SLASH',
      '>': 'GT', '<': 'LT', '=': 'EQ', '!': 'NOT'
    };

    // Two-char operators
    if (source[i + 1] && ops[char + source[i + 1]]) {
      const op = char + source[i + 1];
      tokens.push({ type: op === '==' ? 'EQ' : op === '!=' ? 'NEQ' : op === '>=' ? 'GTE' : 'LTE', value: op, line, column });
      i += 2;
      column += 2;
      continue;
    }

    if (ops[char]) {
      tokens.push({ type: ops[char], value: char, line, column });
      i++;
      column++;
      continue;
    }

    i++;
    column++;
  }

  return tokens;
}
