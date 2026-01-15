export default class EthmarksFooter extends HTMLElement {
  connectedCallback() {
    const sourceLink =
      this.getAttribute("source") ||
      "https://github.com/ethmarks/ethmarks.github.io";
    const currentYear = new Date().getFullYear();

    this.innerHTML = `
    <footer>
        <span id="source">
            <a href="${sourceLink}" id="sourcelink">Website Source</a>
        </span>
        <span id="copyright"><a href="https://ethmarks.github.io/about/">Ethan Marks</a>, &copy;${currentYear}</span>
        <span id="email">
            <a href="mailto:ethmarks.dev@gmail.com">Contact</a>
        </span>
    </footer>`;
  }
}
