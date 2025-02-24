const myCounter = () => {
  let myArray = [];
  for (let counter = 0; counter <= 3; counter += 1) {
    myArray.push(counter);
    for (let counterTwo = 2; counterTwo <= 3; counterTwo += 1) {
      myArray.push(counterTwo);
    }
  }
  return myArray;
};

module.exports = myCounter;
