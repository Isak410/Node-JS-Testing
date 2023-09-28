const resultElement = document.getElementById('queryResults');
const executeKnapp = document.getElementById('executeQuery')
const valueFelt = document.querySelector('#valueinput')
const container = document.querySelector('#container')
const insertKnapp = document.querySelector('#insertKnapp')

const FornavnFelt = document.querySelector('#Input1')
const EtternavnFelt = document.querySelector('#Input2')
const AlderFelt = document.querySelector('#Input3')
const HaarfargeFelt = document.querySelector('#Input4')
const HobbyFelt = document.querySelector('#Input5')

const deleteDiv = document.querySelector('#deleteDiv')
const deleteKnapp = document.querySelector('#deleteKnapp')
const deleteField = document.querySelector('#deleteField')

const resField = document.getElementById('res')

var mainTable = document.getElementById('mainTable')

var bool = false
var bool1 = false

var arr1 = []
var finalArray = []

function defineDataToInsert() {
  for (let i = 1; i < 6; i++) {
    if (document.getElementById('Input'+i).value == '') {
      bool = true
    }
  }
  if (bool == false) {
  var dataObj = {
    "Fornavn":"", 
    "Etternavn":"", 
    "Alder":"", 
    "Haarfarge":"", 
    "Hobby":""
  }
  dataObj.Fornavn = FornavnFelt.value
  dataObj.Etternavn = EtternavnFelt.value
  dataObj.Alder = AlderFelt.value
  dataObj.Haarfarge = HaarfargeFelt.value
  dataObj.Hobby = HobbyFelt.value
  console.log(dataObj)
  return dataObj;
  
} else {
  var dataObj = {}
  return dataObj;
}
}

function sendQuery() {
  console.log("hallo verden!");
  fetch('/run-script')
    .then(response => response.json())
    .then(data => {
      const parsedData = JSON.parse(data)
      if(valueFelt.value == 0) {makeTable(parsedData);} else {displayResult(parsedData)}
    })
    .catch(error => {
      console.log('Error: ' + error);
    });
};

function insertQuery() {

  const dataToInsert = defineDataToInsert()
  var length1 = Object.keys(dataToInsert).length
  if (!length1 == 0) {
  console.log("Inserting data...");
  fetch('/run-insert-script', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToInsert), // Send the data to insert in the request body
  })
    .then(response => {
      response.json()
      console.log("Data inserted successfully")
      resField.innerHTML = "Data inserted successfully"
    })
    .then(data => {
      console.log(data.message)
    })
    .catch(error => {
      //console.log('Error: ' + error);
    });
} else {
  console.log("nothing in value fields")
  bool = false
};
}

function deleteFunc() {
  if (!deleteField.value == '') {
    var deleteInt = {"int":""}
  deleteInt.int = deleteField.value
  console.log(deleteInt)
  fetch('/run-delete-script', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(deleteInt), // Send the data to insert in the request body
  })
  .then(response => {
    response.json()
    console.log("Successfully deleted row with specific id")
  })
  } else {
    console.log("Delete Field Empty")
  }
  
}


function displayResult(parsedData) {
  console.log("displayresults func called")
  if (valueFelt.value < ((Object.values(parsedData)).length + 1) && valueFelt.value > 0) {
    var arr = Object.values(parsedData)
    for (let value of Object.values(arr[valueFelt.value-1])) {arr1.push(value)}
    resultElement.innerHTML = arr1
    arr1 = []
  }
  for (let i = 0; i < finalArray.length; i++) {
    for (let t = 0; t < finalArray[i].length; t++) {
      container.appendChild(document.createTextNode(finalArray[i][t] + ""))
      container.appendChild(document.createElement("br"))
      }
      container.appendChild(document.createTextNode("-----------------------"))
      container.appendChild(document.createElement("br"))
    }
}

function makeTable(parsedData) {
  mainTable.innerHTML = ""
  var arr = Object.values(parsedData)
    for (let o = 0; o < parsedData.length; o++) {
    finalArray[o] = []
    for (let value of Object.values(arr[o])) {finalArray[o].push(value)}
    console.log(finalArray)
  }
  for (let i = 0; i < finalArray.length; i++) {
    var row = (document.createElement('tr'))
    row.id = ("tr" + i)
    mainTable.appendChild(row)
    for (let t = 0; t < finalArray[i].length; t++) {
      var td = document.createElement("td")
      td.className = "td"+t
      td.textContent = finalArray[i][t]
      document.getElementById("tr"+i).appendChild(td)
    }
  }
}

executeKnapp.addEventListener('click', sendQuery)
insertKnapp.addEventListener('click', insertQuery)
deleteKnapp.addEventListener('click', deleteFunc)