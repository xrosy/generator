/* eslint-disable no-console */
const express = require('express');

const DEFAULT_SERVICE_PORT = 9090;
const app = express();

// server.engine('html', ejs.renderFile);
app.set('views', 'dist');
app.set('view engine', 'html');

app.use(function(req, res) {
  res.status(404).send('Sorry cant find that!');
});


app.listen(DEFAULT_SERVICE_PORT, err => {
  if (err) return console.log(err);

  console.primary(`Listening on port :${DEFAULT_SERVICE_PORT}. Open up http://127.0.0.1:${DEFAULT_SERVICE_PORT}/ in your browser.`);
});
