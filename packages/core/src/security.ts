// Contract Security Analyzer for CashLang

export interface SecurityIssue {
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  line?: number;
  suggestion: string;
}

export interface SecurityReport {
  score: number; // 0-100
  issues: SecurityIssue[];
  passed: string[];
}

// Security checks for smart contracts
export function analyzeContract(source: string, cashscript: string): SecurityReport {
  const issues: SecurityIssue[] = [];
  const passed: string[] = [];

  // Check 1: Missing signature verification
  if (!cashscript.includes('checkSig') && !cashscript.includes('checkMultiSig')) {
    issues.push({
      severity: 'critical',
      title: 'No Signature Verification',
      description: 'Contract does not verify any signatures, allowing anyone to spend funds',
      suggestion: 'Add checkSig() or checkMultiSig() to verify ownership'
    });
  } else {
    passed.push('Signature verification present');
  }

  // Check 2: Time lock validation
  if (source.includes('unlockTime') || source.includes('lockTime')) {
    if (!cashscript.includes('tx.time') && !cashscript.includes('tx.age')) {
      issues.push({
        severity: 'warning',
        title: 'Time Lock Not Enforced',
        description: 'Contract has time parameters but does not check tx.time or tx.age',
        suggestion: 'Add require(tx.time >= unlockTime) to enforce time locks'
      });
    } else {
      passed.push('Time lock properly enforced');
    }
  }

  // Check 3: Token preservation in CashTokens contracts
  if (source.includes('token.') || cashscript.includes('tokenCategory')) {
    const hasTokenPreservation = 
      cashscript.includes('tokenCategory') && 
      cashscript.includes('tx.outputs');
    
    if (!hasTokenPreservation) {
      issues.push({
        severity: 'warning',
        title: 'Token Preservation Not Verified',
        description: 'CashTokens contract should verify tokens are preserved in outputs',
        suggestion: 'Add checks to ensure output tokens match input tokens'
      });
    } else {
      passed.push('Token preservation verified');
    }
  }

  // Check 4: Integer overflow protection
  if (cashscript.match(/\+|\-|\*|\//)) {
    if (!cashscript.includes('require') || cashscript.split('require').length < 2) {
      issues.push({
        severity: 'warning',
        title: 'Potential Integer Overflow',
        description: 'Arithmetic operations without sufficient validation',
        suggestion: 'Add require() statements to validate arithmetic results'
      });
    } else {
      passed.push('Arithmetic operations validated');
    }
  }

  // Check 5: Reentrancy protection (covenant loops)
  const requireCount = (cashscript.match(/require/g) || []).length;
  if (requireCount === 0) {
    issues.push({
      severity: 'critical',
      title: 'No Input Validation',
      description: 'Contract has no require() statements to validate conditions',
      suggestion: 'Add require() statements to validate all critical conditions'
    });
  } else {
    passed.push(`${requireCount} validation check${requireCount > 1 ? 's' : ''} present`);
  }

  // Check 6: NFT capability validation
  if (source.includes('nft.capability') || cashscript.includes('nftCapability')) {
    const hasCapabilityCheck = cashscript.includes('nftCapability') && cashscript.includes('==');
    if (!hasCapabilityCheck) {
      issues.push({
        severity: 'warning',
        title: 'NFT Capability Not Validated',
        description: 'NFT operations should validate capability (minting/mutable/none)',
        suggestion: 'Add require(token.nft.capability == expectedValue)'
      });
    } else {
      passed.push('NFT capability validated');
    }
  }

  // Check 7: Output validation
  if (cashscript.includes('tx.outputs')) {
    const hasOutputValidation = 
      cashscript.includes('tx.outputs') && 
      (cashscript.includes('lockingBytecode') || cashscript.includes('value'));
    
    if (!hasOutputValidation) {
      issues.push({
        severity: 'info',
        title: 'Limited Output Validation',
        description: 'Consider validating output values and locking bytecode',
        suggestion: 'Add checks for output amounts and recipient addresses'
      });
    } else {
      passed.push('Output validation present');
    }
  }

  // Check 8: Hardcoded values
  const hardcodedNumbers = cashscript.match(/\b\d{6,}\b/g);
  if (hardcodedNumbers && hardcodedNumbers.length > 0) {
    issues.push({
      severity: 'info',
      title: 'Hardcoded Values Detected',
      description: `Found ${hardcodedNumbers.length} large hardcoded number(s)`,
      suggestion: 'Consider using contract parameters for flexibility'
    });
  }

  // Calculate security score
  const criticalCount = issues.filter(i => i.severity === 'critical').length;
  const warningCount = issues.filter(i => i.severity === 'warning').length;
  const infoCount = issues.filter(i => i.severity === 'info').length;

  let score = 100;
  score -= criticalCount * 30;
  score -= warningCount * 15;
  score -= infoCount * 5;
  score = Math.max(0, Math.min(100, score));

  return {
    score,
    issues,
    passed
  };
}

// Get security grade from score
export function getSecurityGrade(score: number): { grade: string; color: string; label: string } {
  if (score >= 90) return { grade: 'A', color: 'green', label: 'Excellent' };
  if (score >= 75) return { grade: 'B', color: 'blue', label: 'Good' };
  if (score >= 60) return { grade: 'C', color: 'yellow', label: 'Fair' };
  if (score >= 40) return { grade: 'D', color: 'orange', label: 'Poor' };
  return { grade: 'F', color: 'red', label: 'Critical Issues' };
}
