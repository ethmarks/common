export default class EthmarksHeader extends HTMLElement {
  connectedCallback() {
    const navItems = [
      { name: "Home", href: "https://ethmarks.github.io/" },
      { name: "About", href: "https://ethmarks.github.io/about/" },
      { name: "Posts", href: "https://ethmarks.github.io/posts/" },
      { name: "Blips", href: "https://ethmarks.github.io/blips/" },
      { name: "Projects", href: "https://ethmarks.github.io/tags/projects/" },
    ];

    const activeLink = this.getAttribute("active");

    this.innerHTML = `
      <header>
          <a href="https://ethmarks.github.io/" id="title" tabindex="0" aria-label="Home">Ethan Marks</a>
          <nav>
              ${navItems
                .map((item) => {
                  const isActive =
                    activeLink &&
                    activeLink.toLowerCase() === item.name.toLowerCase();
                  const activeClass = isActive
                    ? "staggered active"
                    : "staggered";
                  return `<a id="nav-${item.name.toLowerCase()}" class="${activeClass}" href="${item.href}">${item.name}</a>`;
                })
                .join("")}
          </nav>
      </header>`;
  }
}
