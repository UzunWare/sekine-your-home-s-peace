# Contributing to Sekine TV

First off, thank you for considering contributing to Sekine TV! It's people like you that make Sekine TV such a great tool for the Muslim community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

---

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members
- Be mindful of Islamic values and principles

---

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git
- A code editor (VS Code recommended)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/sekine-tv.git
   cd sekine-tv
   ```
3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/sekine-tv.git
   ```

---

## Development Setup

### Install Dependencies

```bash
npm install
# or
bun install
```

### Start Development Server

```bash
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:5173`

### Run Tests

```bash
npm run test
# or
bun test
```

### Build for Production

```bash
npm run build
# or
bun run build
```

---

## Project Structure

```
src/
├── components/          # React components
│   ├── idle-layouts/    # Idle screen layouts
│   ├── player/          # Media player components
│   ├── screensaver-layouts/
│   └── ui/              # shadcn/ui components
├── contexts/            # React contexts
├── data/                # Static data files
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/               # Route pages
│   ├── settings/        # Settings sub-pages
│   └── setup/           # Setup wizard pages
└── types/               # TypeScript types
```

---

## Making Changes

### Branch Naming

Create a branch for your changes:

```bash
git checkout -b type/description
```

**Branch types:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `style/` - Styling changes
- `test/` - Test additions/changes

**Examples:**
- `feature/add-tahajjud-prayer`
- `fix/prayer-time-calculation`
- `docs/update-readme`

### Commit Messages

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting, missing semicolons, etc.
- `refactor` - Code change that neither fixes a bug nor adds a feature
- `test` - Adding tests
- `chore` - Maintenance

**Examples:**
```
feat(qiblah): add compass visualization component
fix(prayer): correct Asr calculation for Hanafi method
docs(readme): add installation instructions
```

---

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type - use `unknown` if type is truly unknown
- Export types from dedicated type files

```typescript
// Good
interface PrayerCardProps {
  prayer: Prayer;
  isNext: boolean;
}

// Avoid
const PrayerCard = (props: any) => { ... }
```

### React Components

- Use functional components with hooks
- Keep components focused and small
- Extract reusable logic into custom hooks
- Use proper prop types

```typescript
// Good - Focused component
const PrayerTime = ({ prayer }: { prayer: Prayer }) => (
  <div className="prayer-time">
    <span>{prayer.name}</span>
    <span>{prayer.time}</span>
  </div>
);

// Avoid - Component doing too much
const PrayerEverything = () => {
  // Fetching, calculating, rendering all prayers...
}
```

### Styling

- Use Tailwind CSS classes
- Use semantic color tokens from the design system
- Avoid hardcoded colors - use CSS variables
- Keep responsive design in mind

```tsx
// Good - Using semantic tokens
<div className="bg-card text-foreground border-border">

// Avoid - Hardcoded colors
<div className="bg-[#1a1a2e] text-[#d4af37]">
```

### File Organization

- One component per file
- Name files after the component they export
- Keep related files close together
- Use index.ts for barrel exports

```
components/
├── QiblahCompass.tsx      # Single component
├── QiblahBadge.tsx
└── idle-layouts/
    ├── index.ts           # Barrel export
    ├── types.ts           # Shared types
    ├── ClassicLayout.tsx
    └── MinimalLayout.tsx
```

### Accessibility

- Add proper ARIA labels
- Ensure keyboard navigation works
- Use semantic HTML elements
- Test with screen readers

```tsx
<button
  aria-label="Play Adhan"
  data-focusable="true"
  onClick={handlePlay}
>
  <Volume2 className="w-5 h-5" />
</button>
```

### Islamic Content Guidelines

When adding Islamic content:

- Verify accuracy of Quranic text
- Use proper Arabic typography
- Include transliteration for non-Arabic speakers
- Cite sources for hadiths and quotes
- Respect different Islamic schools of thought

---

## Submitting Changes

### Pull Request Process

1. Update documentation if needed
2. Add tests for new functionality
3. Ensure all tests pass
4. Update the CHANGELOG if applicable
5. Create a pull request with a clear description

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
Describe how you tested the changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No new warnings
```

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Celebrate your contribution! 🎉

---

## Reporting Issues

### Bug Reports

Include:
- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Device/browser information

### Feature Requests

Include:
- Clear description of the feature
- Use case / why it's needed
- Possible implementation approach
- Mockups if applicable

### Security Issues

For security vulnerabilities, please email the maintainers directly instead of opening a public issue.

---

## Recognition

Contributors will be:
- Listed in the project README
- Mentioned in release notes
- Included in the contributors list

---

## Questions?

Feel free to:
- Open a discussion on GitHub
- Ask in the project's community channels
- Reach out to maintainers

---

**JazakAllah Khair for your contributions!** 🌙

May Allah reward your efforts in contributing to this project that benefits the Muslim Ummah.
