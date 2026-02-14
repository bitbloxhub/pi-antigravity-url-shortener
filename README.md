# Pi Antigravity URL Shortener

A powerful, lightning-fast URL shortener built with Next.js 16 and Better Auth.

## Features

- **Authentication:** Powered by Better Auth with email/password support.
- **Management Interface:** Create, view, and delete your shortened URLs.
- **Redirection:** Fast path-based redirection via `/s/[code]`.
- **Theming:** Vibrant purple aesthetic using the DaisyUI Valentine theme (with Coffee for dark mode).
- **Style:** Built with tabs, trailing commas, and Fira Code.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/)
- **Auth:** [Better Auth](https://www.better-auth.com/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database:** PostgreSQL
- **UI:** [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Font:** [Fira Code](https://github.com/tonsky/FiraCode)

## Getting Started

### Prerequisites

- Node.js 20.9+
- pnpm
- A running PostgreSQL instance

### Installation

1. Clone the repo.
2. Install dependencies:
    ```bash
    pnpm install
    ```
3. Set up your environment variables in `.env.local`:
    ```env
    DATABASE_URL=postgres://user:password@localhost:2803/postgres
    BETTER_AUTH_SECRET=your_secret_here
    BETTER_AUTH_URL=http://localhost:3000
    NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
    ```
4. Push the database schema:
    ```bash
    npx drizzle-kit push
    ```
5. Run the development server:
    ```bash
    pnpm dev
    ```

## Development

See [AGENTS.md](./AGENTS.md) for detailed information on coding standards and internal architecture.
