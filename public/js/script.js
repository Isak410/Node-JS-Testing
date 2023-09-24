const resultElement = document.getElementById('queryResults');
const executeKnapp = document.getElementById('executeQuery')
const valueFelt = document.querySelector('#valueinput')
var arr1 = []

function sendQuery() {
  console.log("hallo verden!");
  fetch('/run-script')
    .then(response => response.json())
    .then(data => {
      const parsedData = JSON.parse(data)
      displayResult(parsedData)
    })
    .catch(error => {
      console.log('Error: ' + error);
    });
};

function displayResult(parsedData) {
  if (valueFelt.value < ((Object.values(parsedData)).length + 1) && valueFelt.value > 0) {
    var arr = Object.values(parsedData)
    for (let value of Object.values(arr[valueFelt.value-1])) {arr1.push(value)}
    resultElement.innerHTML = arr1
    arr1 = []
  } else {resultElement.innerHTML = "This object does not exist"}
}

executeKnapp.addEventListener('click', sendQuery)