<script lang="ts">
  import { createTheme, THEMES } from "$utils/createTheme.svelte";
  import { createCalculator, KEYS } from "$utils/createCalculator.svelte";
  import Screen from "$lib/Screen.svelte";

  const theme = createTheme();
  const calc = createCalculator();
</script>

<svelte:head>
  <title>Frontend Mentor | Calculator app</title>
  <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@700&display=swap"
    rel="stylesheet"
  />
</svelte:head>
<svelte:window on:keydown|preventDefault={calc.onKeyDown} />

<main>
  <article>
    <header>
      <h1>calc</h1>
      <span>THEME</span>
      <div>
        <div class="theme-buttons-list">
          {#each Array.from({ length: THEMES.length }) as _, i}
            <button
              class="theme-button"
              class:active={theme.theme === i}
              onclick={() => (theme.theme = i)}
              type="button">{i + 1}</button
            >
          {/each}
        </div>
        <button
          type="button"
          class="theme-toggler"
          data-active-index={theme.theme}
          onclick={theme.toggleTheme}
          aria-label="toggle theme"
        ></button>
      </div>
    </header>
    <Screen result={calc.input} />
    <section title="keypad">
      {#each KEYS as key}
        <button
          type="button"
          class="keypad-button"
          class:reset={key.code === "Reset"}
          class:delete={key.code === "Delete"}
          class:result={key.code === "="}
          onclick={() => calc.onKeyClick(key.code)}
        >
          <span>{key.label}</span>
        </button>
      {/each}
    </section>
  </article>
</main>

<style>
  main {
    display: flex;
    padding: 1.5rem;
    background: var(--ground);
    color: var(--ink);
  }

  article {
    margin: auto;
    inline-size: min(33.75rem, 100%);
    display: grid;
    gap: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;

    span {
      font-size: 0.875rem;
      margin-inline-start: auto;
      padding-block-end: 0.35rem;
    }
  }

  .theme-buttons-list {
    display: flex;
    align-items: center;
  }

  .theme-button {
    font-size: 0.875rem;
    display: flex;
    aspect-ratio: 1;
    align-items: center;
    justify-content: center;
    transition: opacity 0.15s ease;
    flex: 1;
    opacity: 0.5;
    color: inherit;

    &.active {
      opacity: 1;
    }

    &:focus,
    &:focus-visible,
    &:hover {
      opacity: 1;
    }
  }

  .theme-toggler {
    min-block-size: 1.75rem;
    border-radius: 100vmax;
    min-inline-size: 4.5rem;
    background-color: var(--underground);
    position: relative;
    display: block;

    &::before {
      content: "";
      position: absolute;
      aspect-ratio: 1;
      inline-size: 1rem;
      border-radius: 100vmax;
      background-color: var(--key-result);
      transition: all 0.2s ease;
      top: 0.4rem;
      left: 0.4rem;
    }

    &[data-active-index="0"] {
      &::before {
        translate: 0 0;
      }
    }

    &[data-active-index="1"] {
      &::before {
        translate: calc(100% + 0.35rem) 0;
      }
    }

    &[data-active-index="2"] {
      &::before {
        translate: calc(200% + 0.6rem) 0;
      }
    }
  }

  section[title="keypad"] {
    padding: 1.5rem 1.5rem 2rem 1.5rem;
    border-radius: 0.75rem;
    background: var(--underground);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem 1.5rem;
  }

  .keypad-button {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 0.625rem;
    min-block-size: 4rem;
    font-size: 2.5rem;
    color: var(--key-ink);
    background-color: var(--key);
    box-shadow: 0 0.5rem 0 0 var(--key-shadow);
    transition: all 0.15s linear;

    @media (width < 768px) {
      font-size: 2rem;
    }

    span {
      translate: 0 0.1em;
    }

    &:focus {
      outline-color: transparent;
    }

    &:hover,
    &:focus,
    &:focus-visible {
      translate: 0 0.25rem;
      box-shadow: 0 0.25rem 0 0 var(--key-shadow);
    }
  }

  .keypad-button.reset,
  .keypad-button.delete {
    font-size: 1.75rem;
    color: var(--white);
    background-color: var(--key-clear);
    box-shadow: 0 0.5rem 0 0 var(--key-clear-shadow);

    @media (width < 768px) {
      font-size: 1.25rem;
    }

    &:hover,
    &:focus,
    &:focus-visible {
      box-shadow: 0 0.25rem 0 0 var(--key-clear-shadow);
    }
  }

  .keypad-button.result {
    font-size: 1.75rem;
    color: var(--white);
    background-color: var(--key-result);
    box-shadow: 0 0.5rem 0 0 var(--key-result-shadow);

    &:hover,
    &:focus,
    &:focus-visible {
      box-shadow: 0 0.25rem 0 0 var(--key-result-shadow);
    }
  }

  .keypad-button.result,
  .keypad-button.reset {
    grid-column: span 2;
  }
</style>
