// CashTokens syntax sugar and covenant patterns

export interface TokenHelper {
  pattern: RegExp;
  replacement: string;
  description: string;
}

// Syntax sugar transformations for CashTokens
export const tokenHelpers: TokenHelper[] = [
  {
    pattern: /token\.category/g,
    replacement: 'tx.inputs[this.activeInputIndex].tokenCategory',
    description: 'Access token category of current input'
  },
  {
    pattern: /token\.amount/g,
    replacement: 'tx.inputs[this.activeInputIndex].tokenAmount',
    description: 'Access fungible token amount'
  },
  {
    pattern: /token\.nft\.commitment/g,
    replacement: 'tx.inputs[this.activeInputIndex].nftCommitment',
    description: 'Access NFT commitment data'
  },
  {
    pattern: /token\.nft\.capability/g,
    replacement: 'tx.inputs[this.activeInputIndex].nftCapability',
    description: 'Access NFT capability (none/mutable/minting)'
  },
  {
    pattern: /output\[(\d+)\]\.token\.category/g,
    replacement: 'tx.outputs[$1].tokenCategory',
    description: 'Access output token category'
  },
  {
    pattern: /output\[(\d+)\]\.token\.amount/g,
    replacement: 'tx.outputs[$1].tokenAmount',
    description: 'Access output token amount'
  }
];

// Covenant pattern templates
export const covenantPatterns = [
  {
    id: 'token-preservation',
    name: 'Token Preservation',
    description: 'Ensure tokens are preserved in outputs',
    code: `// Preserve token category and amount
bytes category = token.category;
int amount = token.amount;
require(output[0].token.category == category);
require(output[0].token.amount == amount);`
  },
  {
    id: 'nft-transfer',
    name: 'NFT Transfer Guard',
    description: 'Validate NFT transfer with ownership check',
    code: `// Verify NFT ownership and transfer
require(token.nft.capability == 0x00); // immutable
bytes commitment = token.nft.commitment;
require(output[0].token.nft.commitment == commitment);
require(checkSig(ownerSig, owner));`
  },
  {
    id: 'minting-covenant',
    name: 'Minting Covenant',
    description: 'Control NFT minting with authority check',
    code: `// Minting authority check
require(token.nft.capability == 0x02); // minting
require(checkSig(minterSig, minter));
// Preserve minting token
require(output[0].token.category == token.category);
require(output[0].token.nft.capability == 0x02);`
  },
  {
    id: 'token-split',
    name: 'Token Split',
    description: 'Split fungible tokens across outputs',
    code: `// Split tokens while preserving total
int totalAmount = token.amount;
int output1Amount = output[0].token.amount;
int output2Amount = output[1].token.amount;
require(output1Amount + output2Amount == totalAmount);
require(output[0].token.category == token.category);
require(output[1].token.category == token.category);`
  }
];

// Apply CashTokens syntax sugar to code
export function applyCashTokensSugar(code: string): string {
  let transformed = code;
  
  for (const helper of tokenHelpers) {
    transformed = transformed.replace(helper.pattern, helper.replacement);
  }
  
  return transformed;
}

// Get covenant pattern by ID
export function getCovenantPattern(id: string): string | null {
  const pattern = covenantPatterns.find(p => p.id === id);
  return pattern ? pattern.code : null;
}
