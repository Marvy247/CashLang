# CashLang Demo Script

## 30-Second Demo (Social Media / Quick Pitch)

**Script:**

1. **[0-5s]** "Building Bitcoin Cash smart contracts is hard. Until now."
   - Show landing page with hackathon badge

2. **[5-10s]** Click "Get Started" → IDE loads
   - Show clean, professional interface

3. **[10-15s]** Click "Templates" → Select "Token Vault"
   - Code appears instantly in Monaco Editor

4. **[15-20s]** Click "Compile" → Show compilation progress
   - Watch realistic 3-second compilation

5. **[20-25s]** Show results:
   - Generated CashScript code
   - Switch to "Security" tab → Show A grade
   - Highlight security checks passed

6. **[25-30s]** "CashLang. Smart contracts made simple, secure, and professional."
   - Show URL: cashlang.vercel.app

---

## 2-Minute Technical Demo (Judges / Presentations)

**Script:**

### Introduction (0:00-0:20)
"Hi, I'm presenting CashLang - the first high-level smart contract framework for Bitcoin Cash with built-in security analysis. Let me show you why this matters."

### Problem Statement (0:20-0:40)
"Bitcoin Cash has powerful CashTokens, but the developer experience is rough. CashScript is low-level, there's no good IDE, and there's zero tooling for security. This keeps talented developers away from BCH."

### Solution Demo (0:40-1:40)

**[0:40-0:50] Landing Page**
- "CashLang solves this. Open the IDE..."
- Show professional landing page
- Click "Get Started"

**[0:50-1:00] Templates**
- "We have 5 production-ready templates showcasing CashTokens"
- Click "Templates" button
- Scroll through: Token Vault, NFT Minting, DAO Voting, DEX Swap, Vesting
- Select "Token Vault"

**[1:00-1:10] Code Editor**
- "Notice the clean, high-level syntax - like Solidity or TypeScript"
- Point out: `token.category`, `token.amount` syntax sugar
- "This is Monaco Editor - the same engine as VS Code"

**[1:10-1:20] Compilation**
- Click "Compile"
- "Real-time transpilation to CashScript"
- Show generated code in Output tab

**[1:20-1:30] Security Analysis**
- Switch to "Security" tab
- "Here's the innovation: built-in security analysis"
- Show A grade, security score
- Point out checks: signature verification, time locks, token preservation
- "8 comprehensive security checks with actionable suggestions"

**[1:30-1:40] Covenant Patterns**
- Click "Covenant Patterns" button
- "4 battle-tested CashTokens patterns ready to use"
- Show: Token preservation, NFT transfer, Minting, Token split
- "One-click insert into your code"

### Impact (1:40-2:00)
"This is the tool that can bring thousands of Ethereum and Web3 developers to Bitcoin Cash. It's production-ready, open source, and solves real problems. Thank you."

---

## 5-Minute Deep Dive (Technical Audience)

### Setup (0:00-0:30)
- Introduction and problem statement
- Show landing page with comparison table
- Highlight: CashScript vs Solidity vs CashLang

### Core Features (0:30-2:00)

**Transpiler (0:30-1:00)**
- Open any template
- Explain syntax sugar: `token.category` → `tx.inputs[this.activeInputIndex].tokenCategory`
- Show how it transpiles to clean CashScript
- Mention: Custom recursive descent parser, AST-based codegen

**Security Analyzer (1:00-1:30)**
- Compile a contract
- Deep dive into Security tab
- Explain each check:
  - Signature verification
  - Time lock enforcement
  - Token preservation
  - Integer overflow protection
  - NFT capability validation
  - Output validation
  - Reentrancy protection
  - Hardcoded values detection
- Show how grade is calculated (A-F)

**Covenant Patterns (1:30-2:00)**
- Open Covenant Patterns modal
- Explain each pattern:
  - Token Preservation: Ensure tokens aren't lost
  - NFT Transfer Guard: Validate ownership
  - Minting Covenant: Control NFT creation
  - Token Split: Divide fungible tokens
- Show one-click insert feature

### Architecture (2:00-3:30)

**Monorepo Structure (2:00-2:30)**
```
cashlang/
├── packages/
│   ├── shared/      # TypeScript types
│   ├── core/        # Transpiler engine
│   │   ├── parser.ts      # Tokenizer + parser
│   │   ├── codegen.ts     # Code generation
│   │   ├── security.ts    # Security analyzer
│   │   ├── cashtokens.ts  # Syntax sugar
│   │   └── templates.ts   # 5 templates
│   └── frontend/    # React IDE
```

**Tech Stack (2:30-3:00)**
- Frontend: React 18, TypeScript, Tailwind, Monaco Editor
- Build: Vite (fast HMR), tsup (package bundling)
- State: Zustand (lightweight)
- Transpiler: Custom parser → AST → CashScript
- Deployment: Vercel (one-click)

**Code Quality (3:00-3:30)**
- Show clean git history
- Mention: 3,500 lines of code
- TypeScript throughout
- Comprehensive error handling
- Real-time feedback

### Innovation & Impact (3:30-4:30)

**What's New (3:30-4:00)**
- First BCH contract security analyzer
- First covenant pattern library
- First high-level syntax with CashTokens sugar
- First production-ready web IDE for BCH

**Why It Matters (4:00-4:30)**
- Lowers barrier for millions of developers
- Makes CashTokens accessible
- Provides security best practices
- Accelerates BCH ecosystem growth
- Open source - community can extend

### Roadmap & Conclusion (4:30-5:00)

**Next Steps**
- VS Code extension
- CLI tool
- Real BCH VM integration (libauth)
- Expand to 20+ security checks
- More covenant patterns
- Community Discord
- Video tutorials

**Closing**
"CashLang is production-ready today. It's the tool Bitcoin Cash needs to onboard the next wave of builders. Thank you."

---

## Key Talking Points

### For Judges
- **Execution:** Fully functional, not a prototype
- **Innovation:** First security analyzer for BCH
- **Impact:** Can onboard thousands of developers
- **CashTokens:** Every feature showcases tokens
- **Quality:** Professional UI, clean code, comprehensive docs

### For Developers
- **Familiar:** If you know Solidity/TypeScript, you know CashLang
- **Fast:** 2-5 second compilation
- **Secure:** Built-in security analysis
- **Helpful:** Covenant patterns save hours
- **Free:** Open source, MIT licensed

### For BCH Community
- **Accessible:** Zero installation, works in browser
- **Educational:** Learn CashTokens through templates
- **Practical:** Generate real deployment scripts
- **Extensible:** Clear roadmap to production tool
- **Community-driven:** Open to contributions

---

## Demo Tips

1. **Practice timing** - Know exactly what to show in 30s/2min/5min
2. **Have backup** - Record screen in case live demo fails
3. **Highlight innovation** - Security analyzer is unique
4. **Show, don't tell** - Let the UI speak for itself
5. **End with impact** - "This brings developers to BCH"

## Common Questions & Answers

**Q: How is this different from CashScript?**
A: CashLang is a higher-level language that compiles TO CashScript, with added security analysis and developer tools.

**Q: Is this production-ready?**
A: The IDE and transpiler work today. For production contracts, we recommend reviewing generated CashScript before deployment.

**Q: What about performance?**
A: Compilation is 2-5 seconds. Generated CashScript is clean and optimized.

**Q: Can I use this offline?**
A: Currently web-only, but CLI tool is on the roadmap.

**Q: How do I deploy contracts?**
A: CashLang generates deployment scripts. Use them with CashScript SDK.

**Q: Is it open source?**
A: Yes! MIT licensed. Contributions welcome.
