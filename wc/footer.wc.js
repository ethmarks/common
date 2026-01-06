export default class EthmarksFooter extends HTMLElement {
  connectedCallback() {
    const sourceLink =
      this.getAttribute("source") ||
      "https://github.com/ethmarks/ethmarks.github.io";

    const currentYear = new Date().getFullYear();

    function getOverflowClass() {
      if (
        document.documentElement.scrollHeight >
        document.documentElement.clientHeight
      ) {
        return "height-overflow";
      } else {
        return "";
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

    this.resizeHandler = () => {
      this.querySelector("footer").classList = getOverflowClass();
    };
    window.visualViewport?.addEventListener("resize", this.resizeHandler);
    this.resizeObserver = new ResizeObserver(this.resizeHandler);
    this.resizeObserver.observe(document.documentElement);
  }

  disconnectedCallback() {
    if (this.resizeHandler) {
      window.visualViewport?.removeEventListener("resize", this.resizeHandler);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
