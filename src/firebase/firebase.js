import * as firebase from "firebase";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

// Initialize Firebase
firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

// // child_removed
// database.ref("expenses").on("child_removed", snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });
// // child_changed
// database.ref("expenses").on("child_changed", snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });
// // child_added
// database.ref("expenses").on("child_added", snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

// // database
// //   .ref("expenses")
// //   .once("value")
// //   .then(snapshot => {
// //     const expenses = [];
// //     snapshot.forEach(childSnapshot => {
// //       expenses.push({
// //         id: childSnapshot.key,
// //         ...childSnapshot.val()
// //       });
// //     });
// //     console.log(expenses);
// //   });

// // database.ref("expenses").on("value", snapshot => {
// //   const expenses = [];
// //   snapshot.forEach(childSnapshot => {
// //     expenses.push({
// //       id: childSnapshot.key,
// //       ...childSnapshot.val()
// //     });
// //   });
// //   console.log(expenses);
// // });

// // database.ref("expenses").push({
// //   description: "Rent",
// //   note: "",
// //   amount: 109500,
// //   createdAt: 945442132
// // });

// // database.ref("notes").push({
// //   title: "Course",
// //   body: "Python React Javascript"
// // });

// // database.ref("notes").set(notes);

// // Fetching the data every time -> on method
// // const onValueChange = database.ref().on(
// //   "value",
// //   snapshot => {
// //     console.log(snapshot.val());
// //   },
// //   e => {
// //     console.log("error with fetchin", e);
// //   }
// // );

// // Fetching the data from the database single time
// // database
// //   .ref("location/city")
// //   .once("value")
// //   .then(snapshot => {
// //     const val = snapshot.val();
// //     console.log(val);
// //   })
// //   .catch(e => {
// //     console.log("error fetching", e);
// //   });

// // database
// //   .ref()
// //   .set({
// //     name: "Poonnakarn Panjasriprakarn",
// //     age: 27,
// //     stressLevel: 8,
// //     job: {
// //       title: "Doctor",
// //       company: "Hospital"
// //     },
// //     location: {
// //       city: "Bangkok",
// //       country: "Thailand"
// //     }
// //   })
// //   .then(() => {
// //     console.log("Data is saved!");
// //   })
// //   .catch(e => {
// //     console.log("This failed.", e);
// //   });

// // database.ref().update({
// //   stressLevel: 10,
// //   "job/company": "Amazon",
// //   "location/city": "Seattle"
// // });

// // database.ref().set("This is my data.");

// // database.ref("age").set(28);
// // database.ref("location/city").set("New York");

// // database
// //   .ref()
// //   .remove()
// //   .then(() => {
// //     console.log("remove successful!");
// //   })
// //   .catch(e => {
// //     console.log("error: ", e.message);
// //   });

// // database.ref("isSingle").set(null);
