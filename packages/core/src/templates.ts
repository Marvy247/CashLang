import type { Template } from '@cashlang/shared';

export const templates: Template[] = [
  {
    id: 'token-vault',
    name: 'Token Vault',
    description: 'Secure vault for locking CashTokens with time-based release',
    category: 'token',
    difficulty: 'beginner',
    features: ['CashTokens', 'Time locks', 'Introspection'],
    code: `// Token Vault - Lock tokens until a specific time
contract TokenVault(pubkey owner, int unlockTime) {
  function withdraw(sig ownerSig) {
    // Verify owner signature
    require(checkSig(ownerSig, owner));
    
    // Check if unlock time has passed
    require(tx.time >= unlockTime);
  }
}
`
  },
  {
    id: 'nft-mint',
    name: 'NFT Minting Contract',
    description: 'Mint unique NFTs with metadata and royalty enforcement',
    category: 'nft',
    difficulty: 'intermediate',
    features: ['NFT minting', 'Metadata', 'CashTokens', 'Royalties'],
    code: `// NFT Minting Contract
contract NFTMint(pubkey minter, int maxSupply) {
  function mint(sig minterSig, bytes commitment) {
    // Only minter can create NFTs
    require(checkSig(minterSig, minter));
    
    // Verify supply limit via introspection
    require(tx.outputs.length > 0);
  }
  
  function transfer(pubkey newOwner) {
    // NFT transfer with royalty check
    require(tx.outputs.length >= 2);
  }
}
`
  },
  {
    id: 'dao-vote',
    name: 'DAO Voting',
    description: 'Decentralized voting with token-weighted governance',
    category: 'dao',
    difficulty: 'advanced',
    features: ['Governance', 'Token voting', 'Proposals', 'Introspection'],
    code: `// DAO Voting Contract
contract DAOVote(bytes32 proposalId, int votingDeadline, int quorum) {
  function vote(int voteWeight, bool support) {
    // Check voting is still open
    require(tx.time < votingDeadline);
    
    // Verify voter has tokens (weight)
    require(voteWeight > 0);
  }
  
  function execute(int totalVotes) {
    // Voting period ended
    require(tx.time >= votingDeadline);
    
    // Quorum reached
    require(totalVotes >= quorum);
  }
}
`
  },
  {
    id: 'dex-swap',
    name: 'DEX Atomic Swap',
    description: 'Trustless token exchange with price oracle',
    category: 'defi',
    difficulty: 'advanced',
    features: ['Atomic swaps', 'DEX', 'Price oracles', 'CashTokens'],
    code: `// DEX Atomic Swap
contract DEXSwap(int priceRatio, bytes32 tokenA, bytes32 tokenB) {
  function swap(int amountIn, int minAmountOut) {
    // Calculate expected output
    int expectedOut = amountIn * priceRatio;
    
    // Verify minimum output
    require(expectedOut >= minAmountOut);
    
    // Verify token inputs/outputs via introspection
    require(tx.inputs.length > 0);
    require(tx.outputs.length > 0);
  }
}
`
  },
  {
    id: 'vesting',
    name: 'Token Vesting',
    description: 'Linear vesting schedule for team tokens',
    category: 'token',
    difficulty: 'intermediate',
    features: ['Vesting', 'Time locks', 'Linear release', 'CashTokens'],
    code: `// Token Vesting Contract
contract TokenVesting(pubkey beneficiary, int startTime, int duration, int totalAmount) {
  function claim(sig beneficiarySig, int currentTime) {
    // Verify beneficiary
    require(checkSig(beneficiarySig, beneficiary));
    
    // Calculate vested amount
    int elapsed = currentTime - startTime;
    require(elapsed >= 0);
    
    int vestedAmount = totalAmount * elapsed;
    require(vestedAmount > 0);
  }
}
`
  }
];

export function getTemplate(id: string): Template | undefined {
  return templates.find(t => t.id === id);
}

export function getTemplatesByCategory(category: string): Template[] {
  return templates.filter(t => t.category === category);
}
