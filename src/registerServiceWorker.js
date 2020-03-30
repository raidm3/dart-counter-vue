import { Workbox } from "workbox-window";

let wb;

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     wb = navigator.serviceWorker.register('/service-worker.js').then(registration => {
//       console.log('SW registered: ', registration); //eslint-disable-line
//     }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError); //eslint-disable-line
//     });
//   });
// } else {
//   wb = null;
// }

if ("serviceWorker" in navigator) {
  wb = new Workbox(`${process.env.BASE_URL}service-worker.js`);

  // wb.addEventListener("controlling", () => {
  //   window.location.reload();
  // });

  wb.register();
} else {
  wb = null;
}

export default wb;