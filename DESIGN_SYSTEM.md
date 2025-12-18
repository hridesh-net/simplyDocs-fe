# Design System Documentation

## 🎨 Overview

This design system provides a comprehensive, reusable CSS framework built for scalability and future development. It follows modern design principles and includes both utility classes and semantic components.

## 📁 File Structure

```
src/styles/
├── design-system.css    # Core utilities and design tokens
├── doc-content.css      # Specialized styles for HTML documentation
└── index.css           # Main stylesheet with imports
```

## 🎯 Design Tokens

### Colors
```css
/* Primary Palette */
--color-primary-50 to --color-primary-900

/* Neutral Palette */
--color-neutral-50 to --color-neutral-900

/* Semantic Colors */
--color-success-50, --color-success-500, --color-success-700
--color-error-50, --color-error-500, --color-error-700
--color-warning-50, --color-warning-500, --color-warning-700
```

### Spacing Scale
```css
--space-1: 0.25rem    /* 4px */
--space-2: 0.5rem     /* 8px */
--space-4: 1rem       /* 16px */
--space-8: 2rem       /* 32px */
/* ... up to --space-24 */
```

### Typography Scale
```css
--text-xs: 0.75rem    /* 12px */
--text-sm: 0.875rem   /* 14px */
--text-base: 1rem     /* 16px */
--text-xl: 1.25rem    /* 20px */
/* ... up to --text-6xl */
```

## 🛠 Utility Classes

### Layout
```html
<!-- Containers -->
<div class="container">         <!-- Max-width with auto margins -->
<div class="container-sm">      <!-- Small container (640px) -->
<div class="container-lg">      <!-- Large container (1024px) -->

<!-- Flexbox -->
<div class="flex items-center justify-between">
<div class="flex-col gap-4">
<div class="flex-wrap">

<!-- Grid -->
<div class="grid grid-cols-3 gap-6">
<div class="grid-cols-auto">    <!-- Auto-fit columns -->
```

### Spacing
```html
<!-- Padding -->
<div class="p-4">              <!-- All sides -->
<div class="px-6 py-4">        <!-- Horizontal/Vertical -->

<!-- Margin -->
<div class="m-4">              <!-- All sides -->
<div class="mx-auto">          <!-- Center horizontally -->
<div class="mt-8 mb-4">        <!-- Top/Bottom -->
```

### Typography
```html
<!-- Size & Weight -->
<h1 class="text-4xl font-bold">
<p class="text-base font-normal">
<span class="text-sm font-medium">

<!-- Color -->
<p class="text-primary">       <!-- Primary text color -->
<p class="text-secondary">     <!-- Secondary text color -->
<p class="text-blue-600">      <!-- Specific color -->

<!-- Alignment -->
<p class="text-center">
<p class="text-left">
```

### Background & Borders
```html
<!-- Background -->
<div class="bg-primary">       <!-- Primary background -->
<div class="bg-blue-50">       <!-- Light blue background -->

<!-- Borders -->
<div class="border rounded-lg">
<div class="border-t">         <!-- Top border only -->

<!-- Border Radius -->
<div class="rounded">          <!-- Small radius -->
<div class="rounded-xl">       <!-- Extra large radius -->
<div class="rounded-full">     <!-- Fully rounded -->
```

### Shadows & Effects
```html
<!-- Shadows -->
<div class="shadow">           <!-- Base shadow -->
<div class="shadow-lg">        <!-- Large shadow -->
<div class="shadow-xl">        <!-- Extra large shadow -->

<!-- Transitions -->
<div class="transition">       <!-- All properties -->
<div class="transition-fast">  <!-- Fast transition -->

<!-- Transforms -->
<div class="hover:scale-105">  <!-- Scale on hover -->
<div class="hover:shadow-lg">  <!-- Shadow on hover -->
```

## 📝 Documentation Content Styles

### Usage
```html
<!-- Wrap any HTML content from backend -->
<div class="doc-content-wrapper" dangerouslySetInnerHTML={{ __html: htmlContent }} />
```

### Features
- **Typography**: Styled headings, paragraphs, lists
- **Code**: Syntax highlighting for inline code and blocks
- **Tables**: Responsive, styled tables
- **Links**: Hover effects and proper contrast
- **Images**: Responsive with shadows and borders
- **Blockquotes**: Styled with left border and background

## 🎨 Component Examples

### Card Component
```html
<div class="bg-primary border rounded-xl shadow-lg p-6 transition hover:shadow-xl">
  <h3 class="text-xl font-semibold mb-4">Card Title</h3>
  <p class="text-secondary">Card content goes here...</p>
</div>
```

### Button Component
```html
<!-- Primary Button -->
<button class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition hover:bg-blue-700 hover:scale-105 shadow-lg">
  Primary Button
</button>

<!-- Secondary Button -->
<button class="bg-secondary border text-primary px-6 py-3 rounded-lg font-semibold transition hover:bg-tertiary">
  Secondary Button
</button>
```

### Input Component
```html
<input class="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 bg-primary text-primary transition" 
       placeholder="Enter text...">
```

### Navigation Component
```html
<nav class="flex items-center justify-between p-4 bg-primary border-b">
  <div class="flex items-center gap-2">
    <span class="text-2xl">📚</span>
    <span class="text-xl font-bold">DocGen</span>
  </div>
  <div class="flex gap-6">
    <a href="#" class="text-secondary hover:text-primary transition">Home</a>
    <a href="#" class="text-secondary hover:text-primary transition">Docs</a>
  </div>
</nav>
```

## 📱 Responsive Design

### Breakpoints
- `sm`: 640px and up
- `md`: 768px and up  
- `lg`: 1024px and up

### Usage
```html
<!-- Responsive Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

<!-- Responsive Text -->
<h1 class="text-2xl md:text-4xl lg:text-6xl">

<!-- Responsive Spacing -->
<div class="p-4 md:p-6 lg:p-8">

<!-- Show/Hide on Different Screens -->
<div class="block md:hidden">Mobile only</div>
<div class="hidden md:flex">Desktop only</div>
```

## 🌙 Dark Mode

### Automatic Theme Detection
The system automatically detects user preference and applies the appropriate theme.

### Theme Variables
```css
/* Light theme (default) */
--color-bg-primary: #ffffff;
--color-text-primary: #0f172a;

/* Dark theme */
[data-theme="dark"] {
  --color-bg-primary: #0f172a;
  --color-text-primary: #f1f5f9;
}
```

### Usage
All utility classes automatically adapt to the current theme. No additional classes needed.

## 🚀 Future Development

### Adding New Utilities
1. **Add to design-system.css**: Follow existing patterns
2. **Use design tokens**: Reference CSS custom properties
3. **Include responsive variants**: Add `sm:`, `md:`, `lg:` prefixes
4. **Test in both themes**: Ensure dark mode compatibility

### Custom Components
```css
/* Example: Custom Alert Component */
.alert {
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  transition: var(--transition-base);
}

.alert-success {
  background: var(--color-success-50);
  border-color: var(--color-success-200);
  color: var(--color-success-700);
}
```

### Best Practices
1. **Use design tokens**: Always reference CSS custom properties
2. **Follow naming conventions**: Use consistent prefixes and patterns
3. **Mobile-first**: Design for mobile, enhance for desktop
4. **Semantic HTML**: Use proper HTML elements with utility classes
5. **Accessibility**: Ensure proper contrast and focus states

## 📚 Resources

- **Design Tokens**: All variables defined in `design-system.css`
- **Component Examples**: See existing pages for implementation patterns
- **Responsive Utilities**: Follow Tailwind CSS conventions
- **Dark Mode**: Automatic with CSS custom properties

This design system provides a solid foundation for consistent, maintainable, and scalable UI development! 🎨