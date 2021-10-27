const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.helloWorld = functions.https.onRequest((req, res) => {
    
 
    switch(req.body.selectedValue){
        case "Add":
            const add =req.body.number1 + req.body.number2
            res.send(add)
    break;
    case "Subtract":
      const subtract =req.body.number1 - req.body.number2
      res.send(subtract)
  break;
  case "Multiply":
      const multiply =req.body.number1 * req.body.number2
      res.send(multiply)
      break;
      default:
          text = "Looking forward to the Weekend";
  }
  });