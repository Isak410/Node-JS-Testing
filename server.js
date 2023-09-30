const express = require('express');
const { sqlQuery } = require('./public/js');
const app = express();
const port = process.env.PORT || 8080; // Use the specified PORT or default to 3000
const sql = require("mssql/msnodesqlv8");
const myScript = require('./public/js/index')

// Define a route to serve your HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.get('/run-script', (req, res) => {
  
    myScript
    .sqlQuery()
    .then(result => {
      console.log("resultsdfga: ", result);
      res.json(result);
    })
    .catch(error => {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred" });
    });
  });

  app.use(express.json())
  
  app.post('/run-delete-script', (req, res) => {
  const { int } = req.body
  console.log(int)
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
      console.log(err)
    } else {
      var request = new sql.Request();
      request.query("DELETE FROM brukere Where ID = "+int+""), function (err, result) {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          response.json("Successfully deleted")
          resolve("Successfully deleted row with specific id")
        }
      }
    }
  })
  response.json("Yap Yap")
})

  app.post('/run-insert-script', (req, response) => {
    console.log("Received POST request to insert data...");
    console.log(req.body)
    const { Fornavn, Etternavn, Alder, Haarfarge, Hobby} = req.body;
    console.log(Fornavn)

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
        response.status(500).json({ error: 'Error connecting to the database' });
      } else {
        var request = new sql.Request();
        request.query("INSERT INTO brukere (Fornavn, Etternavn, Alder, Haarfarge, Hobby) VALUES ( '"+Fornavn+"', '"+Etternavn+"', '"+Alder+"', '"+Haarfarge+"', '"+Hobby+"')"), function (err, result) {
          if (err) {
            console.log(err);
            reject(err); // Reject the promise if there's an error
          } else {
            response.json("successful insertion")
            resolve("Data inserted successfully."); // Resolve the promise with the JSON data
          }
        };
      }
    });
    response.json("Successful Insertion")
  });

// Serve static files from the "public" directory
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});