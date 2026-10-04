// Services: hovering a column swaps the intro for that service's image stack.
const services = document.querySelector('.services');
const desc = services.querySelector('.services__desc');
const defaultDesc = desc.innerHTML;

services.querySelectorAll('.services__cols a').forEach((link) => {
  const show = () => {
    services.classList.add('is-hovering');
    desc.textContent = link.dataset.desc || '';
  };
  link.addEventListener('mouseenter', show);
  link.addEventListener('focus', show);
});

const hide = () => {
  services.classList.remove('is-hovering');
  desc.innerHTML = defaultDesc;
};
services.querySelector('.services__cols').addEventListener('mouseleave', hide);
services.querySelectorAll('.services__cols a').forEach((link) => link.addEventListener('blur', hide));
