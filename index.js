const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

//serve client files, handle / get requests by serving the index.html file
app.use(express.static(__dirname + '/client'));
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname + '/client/index.html'));
});
  
//server starts listening
app.listen(PORT, () => {
    console.log('We are live on ' + PORT);
});