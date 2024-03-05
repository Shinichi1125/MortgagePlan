const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the Angular app
app.use(express.static('./'));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Start the app by listening on the default port
app.listen(process.env.PORT || 8080);
