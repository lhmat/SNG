document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".parallax-hero");
  if (!hero) return;

  const layers = hero.querySelectorAll("[data-parallax]");
  let heroOffsetTop = hero.offsetTop;
  let ticking = false;

  const applyParallax = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const relativeY = (scrollY - heroOffsetTop) * -1;

    layers.forEach((layer) => {
      const depth = parseFloat(layer.dataset.parallax) || 0;
      const translateY = relativeY * depth;
      layer.style.transform = `translate3d(0, ${translateY}px, 0)`;
    });

    ticking = false;
  };

  const requestUpdate = () => {
    if (!ticking) {
      requestAnimationFrame(applyParallax);
      ticking = true;
    }
  };

  const recalcOffset = () => {
    heroOffsetTop = hero.offsetTop;
    requestUpdate();
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", recalcOffset);
  window.addEventListener("orientationchange", recalcOffset);

  recalcOffset();
});
