const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes.js');
const database = require('./db.js');

const app = express()
const port = 4000

app.use(cors())
app.use(bodyParser.json())
app.use(routes)

app.listen(port, () => console.log(`Site listening on port ${port}`));