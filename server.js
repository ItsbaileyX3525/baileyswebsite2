const express = require('express');
const app = express();
const PORT = 3000;

// Root route handler
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start listening for requests
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});