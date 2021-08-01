
askPermission();

function askPermission() {
  return new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
    .then(function (permissionResult) {
      if (permissionResult !== 'granted') {
        throw new Error('We weren\'t granted permission.');
      } 
    });
}

self.addEventListener('push', function (e) {
  var options = {
    body: 'After a really long travel I\'m finallly here to deliver the good news: It worked!!!',
    icon: 'images/example.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {
        action: 'explore', title: 'Explore this new world',
        icon: 'images/checkmark.png'
      },
      {
        action: 'close', title: 'Close',
        icon: 'images/xmark.png'
      },
    ]
  };
  e.waitUntil(
    self.registration.showNotification('This notification was generated with the PushAPI!', options)
  );
});



