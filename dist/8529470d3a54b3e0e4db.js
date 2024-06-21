import { TimerPartComponent } from './node_modules/@labsgs/problema_pruebas/library/timer/TimerPartComponent.js';
import { TimerPlayerComponent } from './node_modules/@labsgs/problema_pruebas/library/timer/TimerPlayerComponent.js';
if (!customElements.get('timer-part-component')) {
  customElements.define('timer-part-component', TimerPartComponent);
}
if (!customElements.get('timer-player-component')) {
  customElements.define('timer-player-component', TimerPlayerComponent);
}
document.addEventListener('DOMContentLoaded', () => {
  const timerDiv = document.getElementById('timer');
  timerDiv.innerHTML = `
    <img src="./src/logos/TimerPWA-logos_transparent.png" width="400px" height="400px" alt="Logo">
    <timer-player-component>
      <timer-part-component slot="timerplayer"></timer-part-component>
    </timer-player-component>
  `;
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js', {
    scope: './'
  }).then(() => console.log('Service worker registered')).catch(err => console.error('Failed to register service worker', err));
}