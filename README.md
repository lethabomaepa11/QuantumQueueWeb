# QuantumQueue (Web version)

<p align="center">
  <img src="static/icons/QuantumQueue2.png" alt="QuantumQueue Logo" width="200"/>
</p>

<p align="center">
  <strong>Interactive learning tool for CPU Scheduling and Page Replacement Algorithms</strong>
</p>

just enter everything into the application, it has a built in random function and value editor for ease of use

The TAT and WT are also calculated when you view the solution as well as the responsiveness per process.
Feel free to enter your own values to view solutions or just practice the algorithms with the randomize function.

---

### Technologies Used

- [SvelteKit](https://kit.svelte.dev/) - Fast Frontend framework that compiles to highly optimized JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Flowbite Svelte](https://flowbite-svelte.com/) - Component library built on Tailwind CSS
- [PNPM](https://pnpm.io/) - Fast, disk space efficient package manager
- [Vite](https://vitejs.dev/) - Build tool
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Vitest](https://vitest.dev/) - Vite-native unit testing framework

---

### 🛠️ Development Guide

```bash
# Clone the repository
git clone https://github.com/lethabomaepa11/QuantumQueue-web.git
cd QuantumQueue

# Install dependencies
pnpm install

# Run the application
pnpm dev
```

## Features

All the features from the desktop version are available in this web version.
Check out the [desktop version README](https://github.com/dianbrown/QuantumQueue/blob/main/README.md) for more details.

### Folder structure

- `src/lib/features/cpu/` - CPU Scheduling algorithms state and logic
- `src/lib/features/pra/` - Page Replacement algorithms state and logic
- `src/routes/` - SvelteKit routes for the application
- `src/lib/components/` - Reusable Svelte components
- `src/routes/{page}/components/` - Page-specific components
