//create promise มักทำโดย api
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve({ name: "Poon", age: 27 }); // pass ได้แค่ single argument อยากส่งหลายอย่างให้ pass object
    // resolve("This is my other resolve data"); // promise สามารถ resolve ได้ครั้งเดียว
    reject("Something went wrong!");
  }, 5000);
});

console.log("before");

promise
  .then(data => {
    console.log("1", data);
  })
  .catch(error => {
    // Fires when promise rejected
    console.log("error: ", error);
  });

console.log("after");
