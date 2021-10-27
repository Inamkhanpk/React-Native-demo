import PushNotification ,{Importance} from 'react-native-push-notification'

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log('LOCAL NOTIFICATION ==>', notification)
  },

  popInitialNotification: true,
  requestPermissions: true
})


PushNotification.createChannel(
    {
      channelId: "123", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

export const LocalNotification = () => {
    

  PushNotification.localNotification({
    channelId: "123",
    autoCancel: true,
    bigText:
      'Hello from Firebase',
    subText: 'Local Notification Demo',
    title: 'Hand Wave',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]'
  })
}

// export const ScheduledLocalNotification = () => {
//     PushNotification.configure({
//         // (required) Called when a remote or local notification is opened or received
//         onNotification: function(notification) {
//           console.log('LOCAL NOTIFICATION ==>', notification)
//         },
      
//         popInitialNotification: true,
//         requestPermissions: true
//       })
      
//     PushNotification.createChannel(
//         {
//           channelId: "123", // (required)
//           channelName: "My channel", // (required)
//           channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
//           playSound: false, // (optional) default: true
//           soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
//           importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
//           vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
//         },
//         (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
//       );
      
   
//   PushNotification.localNotificationSchedule({
//     autoCancel: true,
//     bigText:
//       'This is local notification demo in React Native app. Only shown, when expanded.',
//     subText: 'Local Notification Demo',
//     title: 'Scheduled Notification Title',
//     message: 'Scheduled Notification Message',
//     vibrate: true,
//     vibration: 500,
//     playSound: true,
//     soundName: 'default',
//     actions: '["Yes", "No"]',
//     date: new Date(Date.now() + 3 * 1000) // in 3 secs
//   })

//   PushNotification.getChannels(function (channel_ids) {
//     console.log(channel_ids); // ['channel_id_1']
//   });
// }