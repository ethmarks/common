export default class EthmarksFooter extends HTMLElement {
  connectedCallback() {
    const sourceLink =
      this.getAttribute("source") ||
      "https://github.com/ethmarks/ethmarks.github.io";

    const currentYear = new Date().getFullYear();

    function getOverflowClass() {
      const contentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      );
      if (contentHeight === 0 || contentHeight < window.innerHeight) {
        return "";
      } else {
        return "height-overflow";
      }
    }

    this.innerHTML = `
      <style>
        footer { position: fixed; }
        footer.height-overflow { position: static; }
      </style>
    <footer class="${getOverflowClass()}">
        <span id="source">
            <a href="${sourceLink}" id="sourcelink">Website Source</a>
        </span>
        <span id="copyright"><a href="https://ethmarks.github.io/about/">Ethan Marks</a>, &copy;${currentYear}</span>
        <span id="email">
            <a href="mailto:ethmarks.dev@gmail.com">Contact</a>
        </span>
    </footer>`;

    this.resizeObserver = new ResizeObserver(() => {
      this.querySelector("footer").classList = getOverflowClass();
    });

    this.resizeObserver.observe(document.body);
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
