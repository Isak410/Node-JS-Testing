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

const viewInsert = document.querySelector('#viewInsert')
const avbrytKnapp = document.querySelector('#avbrytKnapp')

const resField = document.getElementById('res')

var mainTable = document.getElementById('mainTable')

var bool = false
var bool1 = false

var arr1 = []
var finalArray = []

var titleContents = ["ID", "Navn", "Etternavn", "Alder", "Hårfarge", "Hobby", "X"]

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
      resField.innerHTML = "no objects stored"
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
avbrytFunc()
}

function deleteFunc(delid) {
    var deleteInt = {"int":""}
  deleteInt.int = delid
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
  mainTable.innerHTML = ""
  setTimeout(() => sendQuery(), 2000)
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

  var titlerow = (document.createElement("tr"))
  titlerow.id = "titlerow" 
  mainTable.appendChild(titlerow)
  for (let k = 0; k < finalArray[0].length+1; k++) {
    var titletd = (document.createElement("td"))
    titletd.className = "titletd"
    titletd.id = "titletd"+k
    titletd.textContent = (titleContents[k])
    titlerow.appendChild(titletd)
  }
 
  for (let i = 0; i < finalArray.length; i++) {
    var row = (document.createElement("tr"))
    row.id = ("tr" + i)
    mainTable.appendChild(row)
    for (let t = 0; t < finalArray[i].length; t++) {
      var td = document.createElement("td")
      td.className = "td"+t
      td.textContent = finalArray[i][t]
      document.getElementById("tr"+i).appendChild(td)
    }

    var tdbut = document.createElement("td")
    var knapp = document.createElement("button")
    knapp.id = ("tdknapp"+i)
    knapp.className = "tdknapp"
    var delid = finalArray[i][0]
    knapp.addEventListener('click', (function(id) {
      return function() {
        deleteFunc(id);
      };
    })(delid));
    document.getElementById("tr"+i).appendChild(tdbut)
    tdbut.appendChild(knapp)
  }
}

const insertDiv = document.querySelector('#insertdiv')
const alt = document.querySelector('#alt')

function viewInsertFunc() {
  alt.style.opacity = "25%"
  alt.style.pointerEvents = "none"
  insertDiv.style.opacity = "100%"
  insertDiv.style.pointerEvents = "all"
}

function avbrytFunc() {
  alt.style.opacity = "100%"
  alt.style.pointerEvents = "all"
  insertDiv.style.opacity = "0%"
  insertDiv.style.pointerEvents = "none"
  for (let i = 1; i < 6; i++) {
    document.getElementById('Input'+i).value = ''
  }
}

executeKnapp.addEventListener('click', sendQuery)
insertKnapp.addEventListener('click', insertQuery)
deleteKnapp.addEventListener('click', deleteFunc)
viewInsert.addEventListener('click', viewInsertFunc)
avbrytKnapp.addEventListener('click', avbrytFunc)