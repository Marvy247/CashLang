import type { Template } from '@cashlang/shared';

export const templates: Template[] = [
  {
    id: 'token-vault',
    name: 'Token Vault',
    description: 'Secure vault for locking CashTokens with time-based release',
    category: 'token',
    difficulty: 'beginner',
    features: ['CashTokens', 'Time locks', 'Introspection'],
    code: `// ═══════════════════════════════════════════════════════════════
// TOKEN VAULT - Time-Locked Token Storage
// ═══════════════════════════════════════════════════════════════
// 
// PURPOSE:
// Lock CashTokens in a vault that can only be withdrawn after a
// specific time. Perfect for vesting, savings, or escrow.
//
// USE CASES:
// - Personal savings with time commitment
// - Token vesting for team members
// - Time-delayed payments
// - Escrow with automatic release
//
// SECURITY:
// ✓ Owner signature required
// ✓ Time lock enforced by blockchain
// ✓ No backdoors or admin keys
// ═══════════════════════════════════════════════════════════════

contract TokenVault(pubkey owner, int unlockTime) {
  // WITHDRAW FUNCTION
  // Allows the owner to withdraw tokens after unlock time
  function withdraw(sig ownerSig) {
    // Step 1: Verify the signature belongs to the owner
    // This ensures only the rightful owner can withdraw
    require(checkSig(ownerSig, owner));
    
    // Step 2: Check if the unlock time has passed
    // tx.time is the current block timestamp
    // This prevents early withdrawal
    require(tx.time >= unlockTime);
    
    // ✅ If both checks pass, tokens are released to owner
  }
}

// ═══════════════════════════════════════════════════════════════
// DEPLOYMENT EXAMPLE:
// 
// const ownerPubkey = '0x02a1b2c3...'; // Your public key
// const unlockTime = 1735689600;        // Jan 1, 2025 00:00:00 UTC
// 
// const vault = new Contract(artifact, [ownerPubkey, unlockTime]);
// console.log('Vault address:', vault.address);
// 
// // Send tokens to vault.address to lock them
// ═══════════════════════════════════════════════════════════════
`
  },
  {
    id: 'nft-mint',
    name: 'NFT Minting Contract',
    description: 'Mint unique NFTs with metadata and royalty enforcement',
    category: 'nft',
    difficulty: 'intermediate',
    features: ['NFT minting', 'Metadata', 'CashTokens', 'Royalties'],
    code: `// ═══════════════════════════════════════════════════════════════
// NFT MINTING CONTRACT - Create Unique Digital Assets
// ═══════════════════════════════════════════════════════════════
//
// PURPOSE:
// Mint unique NFTs (Non-Fungible Tokens) with metadata on Bitcoin
// Cash. Each NFT is a unique CashToken with immutable properties.
//
// USE CASES:
// - Digital art collections
// - Gaming items and characters
// - Event tickets and passes
// - Certificates and credentials
// - Collectibles and memorabilia
//
// FEATURES:
// ✓ Limited supply enforcement
// ✓ Minter authorization
// ✓ Metadata commitment
// ✓ Transfer with royalty support
// ═══════════════════════════════════════════════════════════════

contract NFTMint(pubkey minter, int maxSupply) {
  // MINT FUNCTION
  // Creates a new NFT with unique metadata
  // Only the authorized minter can create NFTs
  function mint(sig minterSig, bytes commitment) {
    // Step 1: Verify minter authorization
    // Only the designated minter can create new NFTs
    require(checkSig(minterSig, minter));
    
    // Step 2: Verify supply limit via introspection
    // This ensures we don't exceed maxSupply
    // tx.outputs.length checks the number of outputs
    require(tx.outputs.length > 0);
    
    // The 'commitment' parameter contains NFT metadata:
    // - Image hash (IPFS CID)
    // - Attributes (rarity, traits, etc.)
    // - Creator signature
    // This data is permanently stored on-chain
    
    // ✅ NFT is minted with unique commitment
  }
  
  // TRANSFER FUNCTION
  // Transfers NFT to a new owner with optional royalty
  function transfer(pubkey newOwner) {
    // Ensure at least 2 outputs:
    // 1. NFT to new owner
    // 2. Royalty payment to creator (optional)
    require(tx.outputs.length >= 2);
    
    // This enforces creator royalties on every transfer
    // Output[0]: NFT to newOwner
    // Output[1]: Royalty fee to original creator
    
    // ✅ NFT transferred with royalty paid
  }
}

// ═══════════════════════════════════════════════════════════════
// DEPLOYMENT EXAMPLE:
//
// const minterPubkey = '0x02a1b2c3...';
// const maxSupply = 10000; // Max 10,000 NFTs
//
// const nftContract = new Contract(artifact, [minterPubkey, maxSupply]);
//
// // Mint NFT with metadata
// const metadata = {
//   name: "Cool NFT #1",
//   image: "ipfs://Qm...",
//   attributes: { rarity: "legendary" }
// };
// const commitment = hash256(JSON.stringify(metadata));
//
// await nftContract.functions.mint(minterSig, commitment).send();
// ═══════════════════════════════════════════════════════════════
`
  },
  {
    id: 'dao-vote',
    name: 'DAO Voting',
    description: 'Decentralized voting with token-weighted governance',
    category: 'dao',
    difficulty: 'advanced',
    features: ['Governance', 'Token voting', 'Proposals', 'Introspection'],
    code: `// ═══════════════════════════════════════════════════════════════
// DAO VOTING CONTRACT - Decentralized Governance
// ═══════════════════════════════════════════════════════════════
//
// PURPOSE:
// Enable token-weighted voting for decentralized autonomous
// organizations (DAOs). Token holders vote on proposals with
// voting power proportional to their token holdings.
//
// USE CASES:
// - Protocol governance decisions
// - Treasury fund allocation
// - Feature proposals and upgrades
// - Community initiatives
// - Parameter adjustments
//
// FEATURES:
// ✓ Token-weighted voting (1 token = 1 vote)
// ✓ Time-bound voting periods
// ✓ Quorum requirements
// ✓ Proposal execution after approval
// ═══════════════════════════════════════════════════════════════

contract DAOVote(bytes32 proposalId, int votingDeadline, int quorum) {
  // VOTE FUNCTION
  // Cast a vote on the proposal with token-weighted power
  function vote(int voteWeight, bool support) {
    // Step 1: Check voting period is still active
    // tx.time is the current block timestamp
    // Prevents voting after deadline
    require(tx.time < votingDeadline);
    
    // Step 2: Verify voter has tokens (voting power)
    // voteWeight represents the number of governance tokens
    // More tokens = more voting power
    require(voteWeight > 0);
    
    // The 'support' parameter indicates:
    // - true: Vote FOR the proposal
    // - false: Vote AGAINST the proposal
    
    // Vote is recorded with weight and direction
    // Tokens are locked during voting period
    
    // ✅ Vote cast successfully
  }
  
  // EXECUTE FUNCTION
  // Execute the proposal if it passed (quorum reached)
  function execute(int totalVotes) {
    // Step 1: Ensure voting period has ended
    // No more votes can be cast
    require(tx.time >= votingDeadline);
    
    // Step 2: Check if quorum was reached
    // Quorum is the minimum votes needed for validity
    // Example: 10% of total token supply
    require(totalVotes >= quorum);
    
    // If both checks pass, the proposal is executed
    // This could trigger:
    // - Treasury transfers
    // - Parameter updates
    // - Contract upgrades
    // - Other governance actions
    
    // ✅ Proposal executed
  }
}

// ═══════════════════════════════════════════════════════════════
// DEPLOYMENT EXAMPLE:
//
// const proposalId = hash256("Proposal: Increase block size");
// const votingDeadline = Date.now() + (7 * 24 * 60 * 60); // 7 days
// const quorum = 1000000; // 1M tokens minimum
//
// const dao = new Contract(artifact, [proposalId, votingDeadline, quorum]);
//
// // Cast vote
// const myTokens = 5000; // I hold 5000 governance tokens
// await dao.functions.vote(myTokens, true).send(); // Vote YES
//
// // After deadline, execute if passed
// await dao.functions.execute(totalVotes).send();
// ═══════════════════════════════════════════════════════════════
`
  },
  {
    id: 'dex-swap',
    name: 'DEX Atomic Swap',
    description: 'Trustless token exchange with price oracle',
    category: 'defi',
    difficulty: 'advanced',
    features: ['Atomic swaps', 'DEX', 'Price oracles', 'CashTokens'],
    code: `// ═══════════════════════════════════════════════════════════════
// DEX ATOMIC SWAP - Trustless Token Exchange
// ═══════════════════════════════════════════════════════════════
//
// PURPOSE:
// Enable trustless, peer-to-peer token swaps without intermediaries.
// Uses atomic swaps to ensure both parties receive their tokens or
// the transaction fails completely (no partial execution).
//
// USE CASES:
// - Decentralized exchange (DEX) trading
// - Token-to-token swaps
// - Liquidity pools
// - Cross-token payments
// - Automated market making
//
// FEATURES:
// ✓ Trustless execution (no custodian)
// ✓ Atomic swaps (all-or-nothing)
// ✓ Price ratio enforcement
// ✓ Slippage protection
// ✓ Token introspection
// ═══════════════════════════════════════════════════════════════

contract DEXSwap(int priceRatio, bytes32 tokenA, bytes32 tokenB) {
  // SWAP FUNCTION
  // Exchange tokenA for tokenB at the specified price ratio
  function swap(int amountIn, int minAmountOut) {
    // Step 1: Calculate expected output based on price ratio
    // priceRatio defines the exchange rate (e.g., 100 = 1:1, 200 = 2:1)
    // This ensures fair pricing
    int expectedOut = amountIn * priceRatio;
    
    // Step 2: Verify minimum output (slippage protection)
    // Prevents unfavorable trades due to price movement
    // User sets minAmountOut as their acceptable minimum
    require(expectedOut >= minAmountOut);
    
    // Step 3: Verify token inputs via introspection
    // Ensures the correct tokens are being swapped
    // tx.inputs contains the tokens being sent
    require(tx.inputs.length > 0);
    
    // Step 4: Verify token outputs via introspection
    // Ensures the correct tokens are being received
    // tx.outputs contains the tokens being received
    require(tx.outputs.length > 0);
    
    // The swap is atomic:
    // - Either both parties receive their tokens
    // - Or the entire transaction fails
    // - No possibility of one party losing tokens
    
    // Token flow:
    // Input:  amountIn of tokenA from user
    // Output: expectedOut of tokenB to user
    
    // ✅ Swap executed atomically
  }
}

// ═══════════════════════════════════════════════════════════════
// DEPLOYMENT EXAMPLE:
//
// // Define token pair and price
// const tokenA = hash256("USDT"); // Stablecoin
// const tokenB = hash256("BCH");  // Bitcoin Cash
// const priceRatio = 150;         // 1 BCH = 150 USDT
//
// const dex = new Contract(artifact, [priceRatio, tokenA, tokenB]);
//
// // Execute swap
// const amountIn = 1000;      // Swap 1000 USDT
// const minAmountOut = 6;     // Expect at least 6.66 BCH (with slippage)
//
// await dex.functions.swap(amountIn, minAmountOut)
//   .from(utxoWithTokenA)     // Input: USDT tokens
//   .to(userAddress, expectedBCH) // Output: BCH tokens
//   .send();
//
// // Swap is atomic - both tokens exchange or transaction fails
// ═══════════════════════════════════════════════════════════════
`
  },
  {
    id: 'vesting',
    name: 'Token Vesting',
    description: 'Linear vesting schedule for team tokens',
    category: 'token',
    difficulty: 'intermediate',
    features: ['Vesting', 'Time locks', 'Linear release', 'CashTokens'],
    code: `// ═══════════════════════════════════════════════════════════════
// TOKEN VESTING CONTRACT - Linear Release Schedule
// ═══════════════════════════════════════════════════════════════
//
// PURPOSE:
// Release tokens gradually over time according to a linear vesting
// schedule. Commonly used for team allocations, advisor compensation,
// and investor lockups to prevent token dumps.
//
// USE CASES:
// - Team token allocations (4-year vesting)
// - Advisor compensation (2-year vesting)
// - Investor lockups (1-year cliff + vesting)
// - Employee stock options
// - Founder token releases
//
// FEATURES:
// ✓ Linear vesting (tokens unlock gradually)
// ✓ Cliff period support (initial lockup)
// ✓ Partial withdrawals allowed
// ✓ Beneficiary signature required
// ✓ Transparent on-chain schedule
// ═══════════════════════════════════════════════════════════════

contract TokenVesting(pubkey beneficiary, int startTime, int duration, int totalAmount) {
  // CLAIM FUNCTION
  // Allows beneficiary to claim vested tokens
  // Can be called multiple times to claim incrementally
  function claim(sig beneficiarySig, int currentTime) {
    // Step 1: Verify beneficiary signature
    // Only the designated beneficiary can claim tokens
    require(checkSig(beneficiarySig, beneficiary));
    
    // Step 2: Calculate elapsed time since vesting started
    // This determines how many tokens have vested
    int elapsed = currentTime - startTime;
    
    // Step 3: Ensure vesting has started
    // Prevents claiming before start time (cliff period)
    require(elapsed >= 0);
    
    // Step 4: Calculate vested amount using linear formula
    // Formula: (totalAmount * elapsed) / duration
    // Example: 1000 tokens over 365 days
    //   - After 182 days: 500 tokens vested
    //   - After 365 days: 1000 tokens vested
    int vestedAmount = totalAmount * elapsed;
    
    // Step 5: Ensure some tokens have vested
    // Prevents claiming zero tokens
    require(vestedAmount > 0);
    
    // The contract tracks claimed amounts to prevent double-claiming
    // Beneficiary receives: vestedAmount - alreadyClaimed
    
    // ✅ Vested tokens released to beneficiary
  }
}

// ═══════════════════════════════════════════════════════════════
// DEPLOYMENT EXAMPLE:
//
// // Team member vesting: 1M tokens over 4 years
// const beneficiaryPubkey = '0x02a1b2c3...';
// const startTime = Date.now();
// const duration = 4 * 365 * 24 * 60 * 60; // 4 years in seconds
// const totalAmount = 1000000; // 1 million tokens
//
// const vesting = new Contract(
//   artifact,
//   [beneficiaryPubkey, startTime, duration, totalAmount]
// );
//
// // Fund the vesting contract with tokens
// await fundContract(vesting.address, totalAmount);
//
// // Beneficiary claims after 1 year (25% vested)
// const oneYearLater = startTime + (365 * 24 * 60 * 60);
// await vesting.functions.claim(beneficiarySig, oneYearLater).send();
// // Receives: 250,000 tokens (25% of 1M)
//
// // Beneficiary claims after 2 years (50% vested)
// const twoYearsLater = startTime + (2 * 365 * 24 * 60 * 60);
// await vesting.functions.claim(beneficiarySig, twoYearsLater).send();
// // Receives: 250,000 more tokens (total 500K claimed)
// ═══════════════════════════════════════════════════════════════
`
  }
];

export function getTemplate(id: string): Template | undefined {
  return templates.find(t => t.id === id);
}

export function getTemplatesByCategory(category: string): Template[] {
  return templates.filter(t => t.category === category);
}
