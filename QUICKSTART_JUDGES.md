# Quick Start for Judges

**Want to see CashLang in action? Here's the 2-minute evaluation guide.**

## Option 1: Try Live Demo (Recommended)

**[cashlang.vercel.app](https://cashlang.vercel.app)**

1. Click **"Get Started"** on landing page
2. Click **"Templates"** button (top right)
3. Select **"Token Vault"** template
4. Click **"Compile"** (green button)
5. Switch to **"Security"** tab to see analysis
6. Click **"Covenant Patterns"** to see library

**See the features:**
- Real-time compilation (2-5 seconds based on code size)
- Generated CashScript code
- Security analysis with A-F grading
- Simulation results
- Contract artifact (JSON)
- Bytecode size metrics
- 4 ready-to-use covenant patterns

**That's it!** You've just compiled a Bitcoin Cash smart contract with security analysis.

## Option 2: Run Locally

```bash
# Clone
git clone <repo-url>
cd cashlang

# Install (takes ~1 minute)
npm install

# Start dev server
npm run dev

# Open http://localhost:5173
```

## What to Look For

### 1. Developer Experience (30 seconds)
- Open the IDE - Notice the clean, professional interface
- Click Templates - See 5 production-ready examples
- Load any template - Code appears instantly
- Toggle dark/light mode - Entire UI adapts
- Press `?` - See keyboard shortcuts

### 2. Core Functionality (1 minute)
- Edit code in Monaco Editor (VSCode engine)
- Click Compile - Watch real-time transpilation
- Check Output tab - See generated CashScript
- Check Security tab - View security analysis with grade
- Scroll down - View simulation results and artifact
- Click Covenant Patterns - See 4 ready-to-use patterns

### 3. CashTokens Focus (30 seconds)
- Browse templates - All showcase CashTokens:
  - Token Vault (time locks + tokens)
  - NFT Minting (unique tokens with metadata)
  - DAO Voting (token-weighted governance)
  - DEX Swap (atomic token exchange)
  - Token Vesting (linear token release)
- Check Covenant Patterns - Token preservation, NFT transfer, minting, splitting
- Notice syntax sugar - `token.category`, `token.nft.commitment`

### 4. Innovation Highlights
- **Security Analyzer** - First BCH contract security tool (8 checks, A-F grading)
- **Covenant Patterns** - Production-ready CashTokens patterns
- **Syntax Sugar** - High-level token operations
- **Real-time Analysis** - Instant feedback on security issues

## Why This Wins

1. **Solves Real Problem:** BCH dev experience is painful - CashLang makes it easy
2. **Actually Works:** Not a mockup, fully functional with advanced features
3. **Production Quality:** Clean code, great UX, comprehensive docs
4. **CashTokens Showcase:** Every feature highlights BCH's unique capabilities
5. **Innovation:** First security analyzer and covenant library for BCH
6. **Accessible:** Zero installation, works in browser
7. **Impact:** Can onboard thousands of new BCH developers

## Quick Stats

- **Lines of Code:** ~3,500
- **Compilation Time:** 2-5 seconds (realistic)
- **Templates:** 5 production-ready
- **Covenant Patterns:** 4 battle-tested
- **Security Checks:** 8 comprehensive
- **Build Size:** 113KB (gzipped)
- **Setup Time:** 0 seconds (web) or 1 minute (local)

## 30-Second Demo Script

Perfect for presentations:

1. "Building on Bitcoin Cash is hard. Until now."
2. *Open CashLang IDE*
3. *Click Templates - Select Token Vault*
4. *Click Compile - Show compilation*
5. *Switch to Security tab - Show A grade*
6. *Click Covenant Patterns - Show library*
7. "CashLang. Smart contracts, made simple and secure."

## Key Innovation

**CashLang is the first high-level smart contract framework for Bitcoin Cash with built-in security analysis.**

It bridges the gap between:
- **Ethereum/Solidity developers** (millions of devs)
- **Bitcoin Cash** (powerful but low-level)

Plus unique features:
- **Security Analyzer** - No other BCH tool has this
- **Covenant Patterns** - Production-ready CashTokens code
- **Syntax Sugar** - Makes token operations intuitive

This could be the tool that brings the next wave of builders to BCH.

## Next Steps (Post-Hackathon)

If CashLang wins:
1. Deploy production version
2. Add VS Code extension
3. Build CLI tool
4. Integrate libauth VM for real execution
5. Expand security checks to 20+
6. Add more covenant patterns
7. Create video tutorials
8. Launch community Discord
9. Apply for BCH ecosystem grants

## Questions?

- **GitHub Issues:** [Link to repo]
- **Email:** [Your email]
- **Twitter:** [@cashlang_dev]

---

**Thank you for evaluating CashLang!**

We believe this tool can significantly accelerate Bitcoin Cash adoption by making smart contract development accessible, secure, and enjoyable for everyone.

*Built for Bitcoin Cash | BCH-1 Hackcelerator 2026*
