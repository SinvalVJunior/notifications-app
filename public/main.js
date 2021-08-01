Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
    if ('Notification' in window && navigator.serviceWorker) {
        //displayNotification();
    }
});

function displayNotification() {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        var options = {
          body: 'Here is a notification body!',
          icon: 'images/sword.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          },
          actions: [
            {action: 'explore', title: 'Explore this new world',
              icon: 'images/checkmark.png'},
            {action: 'close', title: 'Close notification',
              icon: 'images/xmark.png'},
          ]
        };
        reg.showNotification('Hello world!', options);
      });
    }
}

let subscribeButton = document.getElementById("subscribe-button");
subscribeButton.addEventListener("click", () => {
  subscribeUserToPush();
});


function subscribeUserToPush() {
  return navigator.serviceWorker.register('/service-worker.js')
  .then(function(registration) {
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        'BETZY4598TinToe6XDeERjLgEnnu-iur3upWomSWfjDCfzQEExt8YgwDZuiV61qa-dvarW0o5I0_HRYXAsTS_qg'
      )
    };

    return registration.pushManager.subscribe(subscribeOptions);
  })
  .then(function(pushSubscription) {
    console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
    return pushSubscription;
  });
}

