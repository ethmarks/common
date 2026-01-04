<script>
    let count = 0;

    function increment() {
        count += 1;
    }

    function reset() {
        count = 0;
    }
</script>

<div class="container">
    <h2>The count is {count}</h2>

    <button on:click={increment}> Increment </button>

    <button on:click={reset} disabled={count === 0}> Reset </button>
</div>

<style>
    .container {
        text-align: center;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
    }

    button {
        background: #ff3e00;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
    }

    button:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
</style>
