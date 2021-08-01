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
  subscribeUser();
  navigator.serviceWorker.getRegistration().then(function(reg) {
    reg.pushManager.getSubscription().then((sub) => {
      console.log("The subscription is");
      console.log('Endpoint URL: ', sub.endpoint);
    })
  });
});


function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(reg) {

      console.log("Starting subscription");
      reg.pushManager.subscribe({
        userVisibleOnly: true
      }).then(function(sub) {
        console.log('Endpoint URL: ', sub.endpoint);
      }).catch(function(e) {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Unable to subscribe to push', e);
        }
      });
    })
  }
}

