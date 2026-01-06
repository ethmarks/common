<script>
    let { active } = $props();

    const activeLink = $derived(active);

    const navItems = [
        { name: "Home", href: "https://ethmarks.github.io/" },
        { name: "About", href: "https://ethmarks.github.io/about/" },
        { name: "Posts", href: "https://ethmarks.github.io/posts/" },
        { name: "Blips", href: "https://ethmarks.github.io/blips/" },
        { name: "Projects", href: "https://ethmarks.github.io/tags/projects/" },
    ];

    const today = new Date();
    const isBirthday = today.getMonth() === 8 && today.getDate() === 13; // September 13
    const birthdayClass = isBirthday ? "birthday-mode" : "";
</script>

<header class={birthdayClass}>
    <a
        href="https://ethmarks.github.io/"
        id="title"
        tabindex="0"
        aria-label="Home">Ethan Marks</a
    >
    <nav>
        {#each navItems as item}
            <a
                id="nav-{item.name.toLowerCase()}"
                class="staggered ${activeLink &&
                activeLink.toLowerCase() === item.name.toLowerCase()
                    ? 'active'
                    : ''}"
                href={item.href}
            >
                {item.name}
            </a>
        {/each}
    </nav>
</header>
