const express = require('express')
const path = require("path");
const os = require("os");
const systemInfoPromise = require('./models/SystemInfo');
const { writeAFile } = require('./models/Writefile');
const { readAFile } = require('./models/ReadFile');

const PORT = process.env.PORT || 5000
var app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('pages/index', {fileSize: "100"}));

app.get("/system-info", (req, res, next) => {
  systemInfoPromise.systemInfo().then((sysInfo)=>{
    res.render("pages/SystemInfo", {systemInfo: sysInfo});
  })
  // res.render("pages/SystemInfo", {systemInfo: systemInfoObj});
});

app.get("/writeToHome", (req, res, next) => {
  writeAFile(os.homedir()).then(()=>{
    res.send("file written to home directory");
  }).catch(err => {
    res.send(err);
  });
});

app.get("/readHomeFile", (req, res, next) => {
  readAFile(os.homedir()).then((data) => {
    res.send(data);
  }).catch(err => {
    res.send(err);
  });
});








app.use("/download-test-file", (req, res, next) => {
  var filePath = path.join(__dirname, "app-assets", "tiktoksong.mp3");

  res.sendFile(filePath, (err)=>{
    if(err){
      next(err);
    }else{
      console.log("mp3 file sent");
      next();
    }
  })
});

app.get("/download-test-file", (req, res) => {
  console.log("File sent");
  res.send();
})


app.listen(PORT, () => console.log(`Listening on ${PORT}`))
