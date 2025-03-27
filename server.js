const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/findgenre'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/findgenre/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
