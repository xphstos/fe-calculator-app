import { onMount } from "svelte";
export const THEMES = ["dark", "light", "contrast"] as const;
type Theme = (typeof THEMES)[number];

function isTheme(value: any): value is Theme {
  return THEMES.includes(value);
}

export function createTheme() {
  let initialThemeIndex = 0;
  let initialLocaStorage = localStorage.getItem("theme");
  if (
    typeof initialLocaStorage === "string" &&
    isTheme(JSON.parse(initialLocaStorage))
  ) {
    initialThemeIndex = THEMES.indexOf(JSON.parse(initialLocaStorage));
  }

  let theme: number = $state(initialThemeIndex);
  let value: Theme = $derived(THEMES[theme]);

  $effect(() => {
    localStorage.setItem("theme", JSON.stringify(value));
    document.documentElement.dataset.theme = value;
  });

  onMount(() => {
    document.documentElement.dataset.theme = value;
  });

  return {
    get theme() {
      return theme;
    },
    get value() {
      return value;
    },
    set theme(i: number) {
      if (i > THEMES.length - 1) return;
      document.documentElement.dataset.theme = THEMES[i];
      theme = i;
    },
    toggleTheme() {
      let newTheme = theme + 1;
      if (newTheme > THEMES.length - 1) {
        newTheme = 0;
      }

      document.documentElement.dataset.theme = THEMES[newTheme];
      return (theme = newTheme);
    },
  };
}
