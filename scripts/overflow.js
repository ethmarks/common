function updateOverflowClasses() {
  const body = document.body;
  const bodyHeight = Math.max(
    document.documentElement.scrollHeight,
    body.scrollHeight,
  );
  if (!bodyHeight) return; // skip checking pre and table because if bodyHeight is 0, they couldn't exist
  const windowHeight = window.innerHeight;
  body.classList.toggle("height-overflow", bodyHeight > windowHeight);

  document.querySelectorAll("pre, table").forEach(function (el) {
    const elementWidth = el.scrollWidth;
    const parent = el.parentElement;
    const parentWidth = parent ? parent.clientWidth : window.innerWidth;
    if (elementWidth === 0) return;
    el.classList.toggle("width-overflow", elementWidth > parentWidth);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateOverflowClasses);
} else {
  updateOverflowClasses();
}
window.addEventListener("resize", updateOverflowClasses);
