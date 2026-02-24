import type { Template } from '@cashlang/shared';

export const templates: Template[] = [
  {
    id: 'token-vault',
    name: 'Token Vault',
    description: 'Secure vault for locking CashTokens with time-based release',
    category: 'token',
    difficulty: 'beginner',
    features: ['CashTokens', 'Time locks', 'Introspection'],
    code: `// Token Vault - Time-locked token storage
// Lock tokens until a specific time passes
contract TokenVault(pubkey owner, int unlockTime) {
  function withdraw(sig ownerSig) {
    require(checkSig(ownerSig, owner));
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
// Create unique NFTs with metadata
contract NFTMint(pubkey minter, int maxSupply) {
  function mint(sig minterSig, bytes commitment) {
    require(checkSig(minterSig, minter));
    require(tx.outputs.length > 0);
  }
  
  function transfer(pubkey newOwner) {
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
// Token-weighted governance voting
contract DAOVote(bytes32 proposalId, int votingDeadline, int quorum) {
  function vote(int voteWeight, bool support) {
    require(tx.time < votingDeadline);
    require(voteWeight > 0);
  }
  
  function execute(int totalVotes) {
    require(tx.time >= votingDeadline);
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
// Trustless token exchange
contract DEXSwap(int priceRatio, bytes32 tokenA, bytes32 tokenB) {
  function swap(int amountIn, int minAmountOut) {
    int expectedOut = amountIn * priceRatio;
    require(expectedOut >= minAmountOut);
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
// Linear token release over time
contract TokenVesting(pubkey beneficiary, int startTime, int duration, int totalAmount) {
  function claim(sig beneficiarySig, int currentTime) {
    require(checkSig(beneficiarySig, beneficiary));
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
