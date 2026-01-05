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

    const today = new Date();
    const isBirthday = today.getMonth() === 8 && today.getDate() === 13; // September 13
    const birthdayClass = isBirthday ? "birthday-mode" : "";

    this.innerHTML = `
      <header class="${birthdayClass}">
          <a href="https://ethmarks.github.io/" id="title" tabindex="0" aria-label="Home">Ethan Marks</a>
          <nav>
              ${navItems
                .map((item) => {
                  const isActive =
                    activeLink &&
                    activeLink.toLowerCase() === item.name.toLowerCase();
                  const activeClass = isActive ? "active" : "";
                  return `<a id="nav-${item.name.toLowerCase()}" class="staggered ${activeClass}" href="${item.href}">${item.name}</a>`;
                })
                .join("")}
          </nav>
      </header>`;
  }
}
