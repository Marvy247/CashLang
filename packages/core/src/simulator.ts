import type { SimulationResult } from '@cashlang/shared';

// Simple BCH VM simulator (mock for MVP)
export function simulate(cashscript: string): SimulationResult {
  try {
    // Basic validation
    if (!cashscript.includes('contract')) {
      return {
        success: false,
        error: 'Invalid contract: missing contract declaration'
      };
    }

    // Mock successful simulation
    const logs = [
      '✓ Contract initialized',
      '✓ Function signatures validated',
      '✓ Type checking passed',
      '✓ Bytecode generation successful'
    ];

    // Estimate gas (mock)
    const gasUsed = Math.floor(Math.random() * 1000) + 500;

    return {
      success: true,
      logs,
      gasUsed,
      stackTrace: [
        'PUSH <owner>',
        'PUSH <sig>',
        'CHECKSIG',
        'VERIFY'
      ]
    };
  } catch (error) {
    return {
      success: false,
      error: `Simulation error: ${error}`
    };
  }
}

// Validate CashScript syntax (basic checks)
export function validateCashScript(code: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!code.trim()) {
    errors.push('Empty contract');
    return { valid: false, errors };
  }

  if (!code.includes('contract')) {
    errors.push('Missing contract declaration');
  }

  if (!code.includes('function')) {
    errors.push('Contract must have at least one function');
  }

  // Check for balanced braces
  const openBraces = (code.match(/{/g) || []).length;
  const closeBraces = (code.match(/}/g) || []).length;
  if (openBraces !== closeBraces) {
    errors.push('Unbalanced braces');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
