## 🤝 Contributing

Contributions are welcome! If you find a bug or have a feature suggestion, please open an issue or submit a pull request.

## 🚀 Development Setup

### Prerequisites
- Node.js 20+
- Bun (recommended package manager)
- Git

### Getting Started
1. Fork and clone the repository
2. Install dependencies: `bun install`
3. Copy `env.example` to `.env` and configure your API keys
4. Build the project: `bun run build`
5. Run tests: `bun run test`

### Development Workflow
1. Create a feature branch from `main`
2. Make your changes following the coding standards
3. Add tests for new functionality
4. Ensure all tests pass: `bun run test`
5. Run linting: `bun run lint`
6. Format code: `bun run format`
7. Submit a pull request

## 📝 Coding Standards

### TypeScript
- Use TypeScript 5.8 features
- Prefer interfaces over types
- Use function declarations for pure functions
- Avoid enums; use maps instead
- Ensure all code is type-safe

### Code Style
- Follow Biome configuration
- Use descriptive variable names with auxiliary verbs
- Prefer iteration and modularization over code duplication
- Structure files: exported components, subcomponents, helpers, static content, types

### Effect.ts Patterns
- Use modern Effect.Service pattern
- Implement proper error handling with typed errors
- Use Layer composition for dependency injection
- Follow resource management best practices

## 🧪 Testing

### Test Guidelines
- Write tests for all new functionality
- Use real services (no mocks) as per project policy
- Use the shared configuration service for testing
- Ensure tests are deterministic and fast

### Running Tests
```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch

# Run tests with coverage
bun run test:coverage

# Run tests with UI
bun run test:ui
```

## 🔧 Available Scripts

- `bun run build` - Build the project
- `bun run build:watch` - Build with watch mode
- `bun run dev` - Start development mode
- `bun run test` - Run tests
- `bun run lint` - Run linter
- `bun run format` - Format code
- `bun run type-check` - Type check without building

## 📋 Pull Request Checklist

- [ ] Code follows project coding standards
- [ ] Tests pass and coverage is maintained
- [ ] Documentation is updated if needed
- [ ] Changes are tested locally
- [ ] Commit messages are clear and descriptive

## 🐛 Reporting Issues

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node.js version, etc.)
- Any relevant error messages or logs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.