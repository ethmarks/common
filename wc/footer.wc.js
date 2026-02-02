export default class EthmarksFooter extends HTMLElement {
  connectedCallback() {
    const hydrate = this.hasAttribute("hydrate");
    const source = this.getAttribute("source") || "https://github.com/ethmarks";

    const existingFooter = this.querySelector(":scope > footer");

    // if there's already a <footer> child, we shouldn't destructively hydrate
    if (existingFooter && !hydrate) {
      const sourceLink = existingFooter.querySelector("#sourcelink");
      if (sourceLink) sourceLink.setAttribute("href", source);
      return;
    }

    this.innerHTML = `
    <footer>
        <span id="source">
            <a href="${source}" id="sourcelink">Website Source</a>
        </span>
        <span id="email">
            <a href="mailto:ethmarks.dev@gmail.com">Contact</a>
        </span>
    </footer>`;
  }
}
