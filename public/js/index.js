const sql = require("mssql/msnodesqlv8");

var config = {
  server: "DESKTOP-N9GI0V9\\SQLEXPRESS",
  database: "fdb",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
  },
};

function sqlQuery() {
  return new Promise((resolve, reject) => {
    console.log("Running");

    sql.connect(config, function (err) {
      if (err) {
        console.log(err);
        reject(err); // Reject the promise if there's an error
      } else {
        var request = new sql.Request();
        request.query("select * from brukere;", function (err, result) {
          if (err) {
            console.log(err);
            reject(err); // Reject the promise if there's an error
          } else {
            console.log("resultat: ");
            console.log(result["recordset"]);
            var resu = result["recordset"];
            resolve(JSON.stringify(resu)); // Resolve the promise with the JSON data
          }
        });
      }
    });
  });
}

function sqlInsert(dataToInsert) {
  console.log(dataToInsert)
  return new Promise((resolve, reject) => {
    console.log("Running");

    sql.connect(config, function (err) {
      if (err) {
        console.log(err);
        reject(err); // Reject the promise if there's an error
      } else {
        var request = new sql.Request();
        request.query("INSERT INTO brukere (Fornavn, Etternavn, Alder, Haarfarge, Hobby) VALUES ('Ape', 'Katt', 25, 'grå', 'gaming');", function (err, result) {
          if (err) {
            console.log(err);
            reject(err); // Reject the promise if there's an error
          } else {
            console.log("Inserted data into 'brukere' table.");
            resolve("Data inserted successfully."); // Resolve the promise with the JSON data
          }
        });
      }
    });
  });
}

module.exports = {
  sqlQuery,
  sqlInsert
};

//sqlQuery()
//sqlInsert()