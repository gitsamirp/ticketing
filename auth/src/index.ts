const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/api/users/currentuser', (req, res) => {
    res.send("Hi There");
});

app.listen(3000, () => {
    console.log("listening on portsss 3000");
});
