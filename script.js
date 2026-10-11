const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));
const track = document.querySelector('.screenshot-track');
document.querySelector('.screen-prev')?.addEventListener('click', () => {
  track?.scrollBy({ left: -Math.max(300, track.clientWidth * .75), behavior: 'smooth' });
});
document.querySelector('.screen-next')?.addEventListener('click', () => {
  track?.scrollBy({ left: Math.max(300, track.clientWidth * .75), behavior: 'smooth' });
});
// IMPORTANT: Replace the placeholder GitHub Releases URL in index.html with your real owner/repository.

const screenshotButtons = [...document.querySelectorAll('.screenshot-open')];
const viewer = document.querySelector('.screenshot-viewer');
const viewerImage = viewer?.querySelector('.viewer-image');
const viewerCounter = viewer?.querySelector('.viewer-counter');
const viewerCaption = viewer?.querySelector('.viewer-caption');
let activeScreenshot = 0;
function showScreenshot(index) {
  activeScreenshot = (index + screenshotButtons.length) % screenshotButtons.length;
  const card = screenshotButtons[activeScreenshot].closest('.screenshot-card');
  const image = card.querySelector('img');
  viewerImage.src = image.src;
  viewerImage.alt = image.alt || card.querySelector('h3').textContent;
  viewerCounter.textContent = `${activeScreenshot + 1} / ${screenshotButtons.length}`;
  viewerCaption.textContent = card.querySelector('h3').textContent;
}
screenshotButtons.forEach((button, index) => button.addEventListener('click', () => {
  showScreenshot(index);
  viewer.showModal();
}));
viewer?.querySelector('.viewer-close')?.addEventListener('click', () => viewer.close());
viewer?.querySelector('.viewer-prev')?.addEventListener('click', () => showScreenshot(activeScreenshot - 1));
viewer?.querySelector('.viewer-next')?.addEventListener('click', () => showScreenshot(activeScreenshot + 1));
viewer?.addEventListener('click', event => {
  if (event.target === viewer) viewer.close();
});
viewer?.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') showScreenshot(activeScreenshot - 1);
  if (event.key === 'ArrowRight') showScreenshot(activeScreenshot + 1);
});