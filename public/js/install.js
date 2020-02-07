'use strict';

let deferredInstallPrompt = null;
const installButton = document.getElementById('installBtn');
installButton.addEventListener('click', installPWA);

// Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

/**
 * Event handler for beforeinstallprompt event.
 *   Saves the event & shows install button.
 *
 * @param {Event} evt
 */
function saveBeforeInstallPromptEvent(evt) {
  deferredInstallPrompt = evt;
  installButton.removeAttribute('hidden');
}


/**
 * Event handler for installBtn - Does the PWA installation.
 *
 * @param {Event} evt
 */
function installPWA(evt) {
  deferredInstallPrompt.prompt();
  evt.srcElement.setAttribute('hidden', true);

  // Log user response to prompt.
  deferredInstallPrompt.userChoice
    .then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', choice); //eslint-disable-line
      } else {
        console.log('User dismissed the A2HS prompt', choice); //eslint-disable-line
      }
      deferredInstallPrompt = null;
    });
}

// CODELAB: Add event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled);

/**
 * Event handler for appinstalled event.
 *   Log the installation to analytics or save the event somehow.
 *
 * @param {Event} evt
 */
function logAppInstalled(evt) {
  console.log('Weather App was installed.', evt); //eslint-disable-line
}