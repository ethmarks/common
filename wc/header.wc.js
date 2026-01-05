class EthmarksHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
          <a href="https://ethmarks.github.io/" id="title" tabindex="0" aria-label="Home">Ethan Marks</a>
          <nav>
              <a id="nav-home" class="staggered" href="https://ethmarks.github.io/">Home</a>
              <a id="nav-about" class="staggered" href="https://ethmarks.github.io/about/">About</a>
              <a id="nav-posts" class="staggered" href="https://ethmarks.github.io/posts/">Posts</a>
              <a id="nav-blips" class="staggered" href="https://ethmarks.github.io/blips/">Blips</a>
              <a id="nav-projects" class="staggered" href="https://ethmarks.github.io/tags/projects/">Projects</a>
          </nav>
      </header>`;

    const activeLink = this.getAttribute("active");
    if (activeLink) {
      const targetLink = this.querySelector("#nav-" + activeLink.toLowerCase());
      if (targetLink) {
        targetLink.classList.add("active");
      }
    }
  }
}
