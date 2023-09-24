const express = require('express');
const { sqlQuery } = require('./public/js');
const app = express();
const port = process.env.PORT || 8080; // Use the specified PORT or default to 3000

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

// Serve static files from the "public" directory
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});