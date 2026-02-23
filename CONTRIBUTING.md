# Contributing to CashLang

Thank you for your interest in contributing to CashLang! 🚀

## Getting Started

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/cashlang.git
   cd cashlang
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Build packages:**
   ```bash
   npm run build:core
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

## Project Structure

```
cashlang/
├── frontend/           # React IDE
├── packages/
│   ├── core/          # Transpiler (parser, codegen)
│   └── shared/        # Shared types
└── cli/               # CLI tool (future)
```

## Development Workflow

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic

3. **Test your changes:**
   ```bash
   npm run build
   npm run dev
   ```

4. **Commit with clear messages:**
   ```bash
   git commit -m "feat: add new feature"
   ```
   
   Use conventional commits:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation
   - `style:` - Code style changes
   - `refactor:` - Code refactoring
   - `test:` - Tests
   - `chore:` - Maintenance

5. **Push and create PR:**
   ```bash
   git push origin feature/your-feature-name
   ```

## Areas to Contribute

### 🔧 Core Transpiler
- Add more CashScript language features
- Improve parser error messages
- Optimize code generation
- Add type checking

### 🎨 Frontend/IDE
- New UI components
- Better syntax highlighting
- Keyboard shortcuts
- Mobile responsiveness

### 📚 Templates
- More contract examples
- Better documentation
- Real-world use cases

### 🧪 Testing
- Unit tests for parser
- Integration tests
- E2E tests

### 📖 Documentation
- Tutorials
- API documentation
- Video guides

## Code Style

- Use TypeScript
- Follow existing patterns
- Keep functions small and focused
- Write self-documenting code
- Add JSDoc comments for public APIs

## Questions?

Open an issue or join our Discord (coming soon)!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
