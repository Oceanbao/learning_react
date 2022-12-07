# Next App Starter

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2oceabao%2nextup)

## Components ✨:

- NextJS 🚀
- TailwindCSS 🦄
- Typescript 🦺
- Dark Mode Support 🌓
- ESLint + Prettier Config 📂
- Husky 🐶
- Self-Hosted Inter Font ␊

## Getting started

- Clone the project

```bash
# http
git clone https://github.com/oceanbao/nextup.git
```

```bash
# ssh
git clone git@github.com:oceanbao/nextup.git
```

- With `create-next-app`

```bash
npx create-next-app -e https://github.com/oceanbao/nextup project-name
```

Install the required packages and run the template

```bash
cd project-name
yarn install
```

## Included

### Custom classNames function
> Under `/lib/classNames`

### Packages

1. Next-themes: An abstraction for themes in your Next.js app.
2. react-use: react-hooks

### Custom globals.css

1. custom underline
2. vercel navbar
3. removes firefox, edge and ie. bugs with overflows

### Absolute Imports

```tsx
import TextField from '../../../components/TextField.tsx'
```

changes to

```tsx
import TextField from 'components/TextField.tsx'
```

### SEO optimization found in `Container.tsx`

### Folder structuring & organization

> Under `/components/` & `/public/`

### Self Hosted Inter Font

> Under `/public/fonts/`

### 404 Page

### Favicons and more configs
