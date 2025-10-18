// theme_manager.ts
import { writable } from 'svelte/store';

interface Theme {
  name: string;
  description: string;
  author: string;
  version: string;
  colors: Record<string, string>;
}

// --- Load all theme JSON files dynamically ---
const themeFiles = import.meta.glob('./themes/*.json', { eager: true });

// --- Convert into usable objects ---
const loadedThemes: Record<string, Theme> = {};
for (const path in themeFiles) {
  const theme = (themeFiles[path] as any).default;
  loadedThemes[theme.name] = theme;
}

// --- Svelte store to track current theme ---
export const currentTheme = writable<Theme>(Object.values(loadedThemes)[0]);

// --- Functions ---
export function getAllThemes(): Theme[] {
  return Object.values(loadedThemes);
}

export function setTheme(name: string) {
  const theme = loadedThemes[name];
  if (!theme) {
    console.warn(`Theme "${name}" not found. Keeping current theme.`);
    return;
  }
  currentTheme.set(theme);
  localStorage.setItem('selectedTheme', name);
  applyTheme(theme);
}

// --- Apply theme to document root (CSS variables) ---
export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const colors = theme.colors;

  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
  // map to Flowbite variables
	root.style.setProperty('--color-primary-50', colors.button_bg);
	root.style.setProperty('--color-primary-100', colors.button_bg);
	root.style.setProperty('--color-primary-200', colors.button_bg);
	root.style.setProperty('--color-primary-300', colors.button_bg);
	root.style.setProperty('--color-primary-400', colors.button_bg);
	root.style.setProperty('--color-primary-500', colors.button_bg);
	root.style.setProperty('--color-primary-600', colors.button_bg);
	root.style.setProperty('--color-primary-700', colors.button_bg);
	root.style.setProperty('--color-primary-800', colors.button_bg);
	root.style.setProperty('--color-primary-900', colors.button_bg);

	root.style.setProperty('--color-secondary-50', colors.text_secondary);
	root.style.setProperty('--color-secondary-100', colors.text_primary);
	root.style.setProperty('--color-secondary-200', colors.header_bg);
	root.style.setProperty('--color-secondary-300', colors.input_bg);
	root.style.setProperty('--color-secondary-400', colors.input_border);
	root.style.setProperty('--color-secondary-500', colors.queue_block_bg);
	root.style.setProperty('--color-secondary-600', colors.queue_block_border);
	root.style.setProperty('--color-secondary-700', colors.table_bg);
	root.style.setProperty('--color-secondary-800', colors.table_grid);
	root.style.setProperty('--color-secondary-900', colors.results_box_bg);
}

// --- Initialize on load ---
export function initThemeManager(defaultName?: string) {
  const initialTheme = defaultName
    ? loadedThemes[defaultName] || Object.values(loadedThemes)[0]
    : Object.values(loadedThemes)[0];
  currentTheme.set(initialTheme);
  applyTheme(initialTheme);
}

export { loadedThemes };
