if ('serviceWorker' in navigator) {
  console.log('serviceworker ada didalam navigartor')
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW registered with scope:', registration.scope);
      })
      .catch(err => {
        console.error('Registration failed:', err);
      });
  });
}

// const online = document.getElementById('online')



$(document).ready(function () {


  




})