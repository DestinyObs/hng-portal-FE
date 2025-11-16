# HNG Portal

A digital platform that simplifies the entire HNG internship experience, connecting talents with companies through a comprehensive job discovery and application system.

## Overview

HNG Portal serves as the central hub for communication, assessment, and growth during the HNG internship program. The platform enables users to build professional profiles, discover opportunities, and access essential tools that support collaboration, skill development, and task execution.

## Tech Stack

### Frontend

- **Next.js** - React framework for production-grade applications
- **Tailwind CSS** - Utility-first CSS framework for styling
- **shadcn/ui** - Component library built on Radix UI
- **Lucide React** - Icon library for beautiful, consistent icons

## Key Features

### For Talents

- **Onboarding**: Select account type and personalized dashboard setup
- **Talent Profile**: Build and maintain a professional profile showcasing skills, experience, education, and certifications
- **Job Discovery**: Browse and apply for opportunities tailored to skills and experience level
- **Verification**: Request profile verification to boost credibility and visibility in search results
- **Dashboard**: Track job applications, profile views, skill endorsements, and recommended opportunities

### For Companies

- **Job Posting**: Create and publish job listings with role descriptions, required skills, and deadlines
- **Applicant Management**: View all applicants and their profiles with skill match analysis
- **Talent Search**: Access verified talent pool with advanced filtering
- **Dashboard**: Monitor job postings, applications, and talent engagement

## Benefits

### Clarity

A single place to manage tasks, track progress, and stay organized throughout the internship.

### Professional Visibility

Professional profiles that showcase skills, making talents more discoverable to recruiters.

### Growth

Structured learning, continuous feedback, and real-time insights that help talents improve faster.

### Opportunities

Increased exposure to job postings, higher ranking for verified applicants, and more chances of being selected.

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- pnpm package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/hngprojects/hng-portal-FE.git
cd hng-portal-FE
```

2. Install dependencies

```bash
pnpm install
```

3. Run the development server

```bash
pnpm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm run build
pnpm start
```

## Project Structure

```
hng-portal-FE/
├── .husky/           # Git hooks configuration
├── app/              # Next.js app directory
├── components/       # React components
├── lib/              # Utility functions and helpers
├── public/           # Static assets
├── .gitignore        # Git ignore rules
├── .prettierignore   # Prettier ignore rules
├── .prettierrc       # Prettier configuration
├── components.json   # shadcn/ui configuration
├── eslint.config.mjs # ESLint configuration
├── next.config.ts    # Next.js configuration
├── package.json      # Project dependencies
├── postcss.config.mjs # PostCSS configuration
├── README.md         # Project documentation
└── tsconfig.json     # TypeScript configuration
```

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm start` - Start production server
- `pnpm run lint` - Run ESLint to check code quality
- `pnpm run prepare` - Set up Husky git hooks

## Contributing

This project was developed by a collaborative team of designers and developers as part of the HNG internship program.

### Code Quality

The project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for git hooks
- **lint-staged** for running linters on staged files

Pre-commit hooks automatically run to ensure code quality before commits.
