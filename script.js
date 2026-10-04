// Blur concept: on touch screens (no hover) a tap brings an item into focus.
document.querySelectorAll('.blur-focus').forEach((el) => {
  el.addEventListener('pointerup', (e) => {
    if (e.pointerType !== 'mouse') el.classList.toggle('is-clear');
  });
});

// Services: clicking a service slides the columns before it over to the left,
// like a sliding door, and shows that service's work in the space it opens.
const services = document.querySelector('.services');
if (services) {
  const panel = services.querySelector('.services__panel');
  const cols = [...services.querySelectorAll('.col')];
  const desc = services.querySelector('.services__desc');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = -1;

  // FLIP: remember where things are, rearrange, then animate from old to new spot.
  const slide = (change) => {
    const items = [panel, ...cols];
    const before = items.map((el) => el.getBoundingClientRect().left);
    change();
    if (reduceMotion.matches) return;
    items.forEach((el, i) => {
      const dx = before[i] - el.getBoundingClientRect().left;
      if (!dx) return;
      el.animate(
        [{ transform: `translateX(${dx}px)` }, { transform: 'translateX(0)' }],
        { duration: 700, easing: 'cubic-bezier(.65, 0, .35, 1)' }
      );
    });
  };

  const open = (index) => {
    slide(() => {
      active = index;
      cols.forEach((col, i) => {
        col.classList.toggle('is-before', i < index);
        col.classList.toggle('is-active', i === index);
        col.setAttribute('aria-expanded', i === index);
      });
      services.classList.toggle('is-open', index > -1);
      if (index > -1) desc.textContent = cols[index].dataset.desc;
    });
  };

  cols.forEach((col, i) => {
    col.setAttribute('aria-expanded', 'false');
    // Clicking the open service again closes the door.
    col.addEventListener('click', () => open(active === i ? -1 : i));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && active > -1) open(-1);
  });
}
