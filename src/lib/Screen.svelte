<script lang="ts">
  let { result } = $props();
</script>

<section title="screen">
  <output name="screen">{result}</output>
</section>

<style>
  section {
    padding: 1.5rem;
    border-radius: 0.75rem;
    background-color: var(--screen);
    font-size: 3.5rem;
    min-block-size: 8rem;
    display: flex;
    max-inline-size: 33.75rem;
    align-items: center;
    text-align: right;
    overflow-x: auto;

    @media (width < 768px) {
      font-size: 2.5rem;
      min-block-size: 6rem;
    }
  }

  output {
    min-inline-size: 0;
    margin-inline-start: auto;
    translate: 0 0.1em;
  }
</style>
