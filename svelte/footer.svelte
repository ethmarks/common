<script>
    import { onMount } from "svelte";

    let { source } = $props();

    const sourceLink = $derived(
        source || "https://github.com/ethmarks/ethmarks.github.io",
    );

    const currentYear = new Date().getFullYear();

    let hasOverflow = $state(false);

    function getOverflowClass() {
        return document.documentElement.scrollHeight >
            document.documentElement.clientHeight
            ? "height-overflow"
            : "";
    }

    function updateOverflow() {
        hasOverflow = getOverflowClass() === "height-overflow";
    }

    onMount(() => {
        updateOverflow();

        const resizeHandler = updateOverflow;
        window.visualViewport.addEventListener("resize", resizeHandler);
        const resizeObserver = new ResizeObserver(resizeHandler);
        resizeObserver.observe(document.documentElement);

        return () => {
            window.visualViewport.removeEventListener("resize", resizeHandler);
            resizeObserver.disconnect();
        };
    });
</script>

<footer class={hasOverflow ? "height-overflow" : ""}>
    <span id="source">
        <a href={sourceLink} id="sourcelink">Website Source</a>
    </span>
    <span id="copyright"
        ><a href="https://ethmarks.github.io/about/">Ethan Marks</a>, &copy;{currentYear}</span
    >
    <span id="email">
        <a href="mailto:ethmarks.dev@gmail.com">Contact</a>
    </span>
</footer>

<style>
    footer {
        position: fixed;
    }
    footer.height-overflow {
        position: static;
    }
</style>
