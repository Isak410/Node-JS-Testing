const sql = require("mssql/msnodesqlv8");

function sqlQuery() {
  return new Promise((resolve, reject) => {
    console.log("Running");

    var config = {
      server: "DESKTOP-N9GI0V9\\SQLEXPRESS",
      database: "fdb",
      driver: "msnodesqlv8",
      options: {
        trustedConnection: true,
      },
    };

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

module.exports = {
  sqlQuery,
};

//sqlQuery()