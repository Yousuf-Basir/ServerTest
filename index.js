const express = require('express')
var os = require('os');
var fs = require('fs');

const path = require('path');
const { resolve } = require('path');
const PORT = process.env.PORT || 5000

var app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('pages/index'))


app.get("/cpu-info", (req, res) => {
  var cpuInfo = {
    cpus: os.cpus(),
    totalmem: os.totalmem(),
    freemem: os.freemem()
  };
  res.json(cpuInfo)
})


app.get("/read-to-home", (req, res) => {
  var userHome = os.homedir();
  var fileWriteResp = "";


  fs.writeFile(userHome + '/helloworld.txt', 'Hello World!', function (err) {
    if (err) {
      fileWriteResp = "file writting failed";
      res.json({
        userHome: userHome,
        fileWriteResp: fileWriteResp
      });
    }
    fileWriteResp = "file writting success";
    res.json({
      userHome: userHome,
      fileWriteResp: fileWriteResp
    });
  });
});


app.listen(PORT, () => console.log(`Listening on ${PORT}`))
