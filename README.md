# QuizCraftAI

Welcome to QuizCraftAI, a powerful AI-driven quiz platform built with NextJS, TailwindCSS, and OpenAI. This project allows you to create and deploy quizzes that leverage 
the capabilities of artificial intelligence.

## Getting Started
Follow these steps to set up QuizCraftAI on your local machine:

1. Clone this repository:

```bash
   git clone https://github.com/arepaFlipper/QuizCraftAI
   cd  QuizCraftAI
``` 

2. Install dependencies:
  ```bash
    npm install
  ```

3. Configure your environment variables. Create a .env.local file and add the required variables. You can use the provided .env.example as a template.

4. Run the development server:

```bash
    npm run dev
```

Your QuizCraftAI instance should now be accessible at http://localhost:3000.

## [5:13](https://youtu.be/vIyU4nInlt0?si=VEnVVGU8J5O7W0h3&t=290) create nextJS app
```bash
❯ npx create-next-app@latest --ts
✔ What is your project named? … quiz_craft_ai
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like to use `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to customize the default import alias (@/*)? … No / Yes
✔ What import alias would you like configured? … @/*
Creating a new Next.js app in /home/tovar/Documents/yt-tutos/Elliott-Chong/quizmify/quiz_craft_ai.

Using npm.

Initializing project with template: app-tw

Installing dependencies:
- react
- react-dom
- next

Installing devDependencies:
- typescript
- @types/node
- @types/react
- @types/react-dom
- autoprefixer
- postcss
- tailwindcss
- eslint
- eslint-config-next


added 333 packages, and audited 334 packages in 26s

117 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Success! Created quiz_craft_ai at /home/tovar/Documents/yt-tutos/Elliott-Chong/quizmify/quiz_craft_ai
```

## Install `shadcn`
```bash
❯ npx shadcn-ui@latest init

Need to install the following packages:
shadcn-ui@0.4.1
Ok to proceed? (y) y
✔ Would you like to use TypeScript (recommended)? … no / yes y
✔ Which style would you like to use? › New York
✔ Which color would you like to use as base color? › Slate
✔ Where is your global CSS file? … src/app/globals.css
✔ Would you like to use CSS variables for colors? … no / yes y
✔ Where is your tailwind.config.js located? … tailwind.config.js
✔ Configure the import alias for components: … @/components
✔ Configure the import alias for utils: … @/lib/utils
✔ Are you using React Server Components? … no / yes y
✔ Write configuration to components.json. Proceed? … yes

✔ Writing components.json...
✔ Initializing project...
✔ Installing dependencies...

Success! Project initialization completed.
```

## [11:13](https://youtu.be/vIyU4nInlt0?si=VEnVVGU8J5O7W0h3&t=673) set PlanetScale
You need a to add a payment method for this step.

## [11:15](https://youtu.be/vIyU4nInlt0?si=VEnVVGU8J5O7W0h3&t=675) Install prismadb as Development Dependency

The prisma dev dependency is used to initialize and push migrations into Database, 
through the Prisma schema file.
```bash
❯ npm install prisma -D
```
The prisma client is used to interact with the database:
```bash
❯ npm install @prisma/client
```

```bash
❯ npm prisma init --datasource-provider postgresql
```

## [14:00](https://youtu.be/vIyU4nInlt0?si=VEnVVGU8J5O7W0h3&t=840) set cachedPrisma

## [15:16](https://youtu.be/vIyU4nInlt0?si=VEnVVGU8J5O7W0h3&t=914) push migrations
```bash
❯ npx prisma db push
```

## [19:43](https://youtu.be/vIyU4nInlt0?si=VEnVVGU8J5O7W0h3&t=1183) Use schemas defined in pastebin

## [23:00](https://youtu.be/vIyU4nInlt0?si=VEnVVGU8J5O7W0h3&t=1380) Solve 'session.user' is possibly 'undefined'. [18048]
The following code is causing an error:
```bash
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
```

To solve it we extend the session types with the following:
```ts
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

```
## [45:30](https://youtu.be/vIyU4nInlt0?si=VEnVVGU8J5O7W0h3&t=2730) Import the User type
Due to we are fetching the user's data from `getAuthSession`, its proper type in `import { type User } from "next-auth";` itself.

## [55:30](https://youtu.be/vIyU4nInlt0?si=VEnVVGU8J5O7W0h3&t=3330) Handle error `next/image` Un-configured Host
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  }
}

module.exports = nextConfig
```

## Acknowledgements

This project was inspired by Elliot-Chong's fantastic YouTube tutorial titled "Build & Deploy: Full Stack AI Quiz Platform with NextJS 13, 
TailwindCSS, OpenAI, Next Auth." I express my gratitude to Elliot-Chong for providing valuable insights and guidance.

### Elliot-Chong's Tutorial:
Build & Deploy: Full Stack AI Quiz Platform with NextJS 13, TailwindCSS, OpenAI, Next Auth

## Contributing

Feel free to contribute to QuizCraftAI by opening issues or submitting pull requests. Your feedback and contributions are highly appreciated!
License

This project is licensed under the MIT License - see the LICENSE file for details.

