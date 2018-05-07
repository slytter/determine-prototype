var express = require('express')
var app = express()
var fs = require('fs');
 
app.get('/getPrototype', function (req, res) {
    loadFile('/A.txt').then(A => {
        loadFile('/B.txt').then(B=>{
            if(A.length > B.length){
                res.send('B');
            }else if(A.length < B.length){
                res.send('A');
            }else{
                res.send((Math.random() > 0.5) ? 'A' : 'B');
            }
        })
    });
})

app.get('/confirmPrototype/:which', function (req, res) {
    let writeTo;
    if(req.params.which == "A"){
        writeTo = '/A.txt';
    }else if(req.params.which == "B"){
        writeTo = '/B.txt';
    }else{
        return res.status(500).send('Please state which prototype is confirmed. (/A or /B)');
    }

    loadFile(writeTo).then((r)=>{
        fs.writeFile(__dirname + writeTo, r + 'X', function(err) {
            if(err) {
                return res.status(500).send(err);
            }
            console.log("The file was saved!");
            return res.send('wrote to ' + writeTo + ". " + (r.length + 1) + " tried this ");
        }); 
    })
});

app.get('/info', function(req,res){
    let aAmount = 0;
    let bAmount = 0; 
    loadFile('/A.txt').then(text =>{
        aAmount = text.length
        loadFile('/B.txt').then(text => {
            bAmount = text.length;
            res.send(`
            <b>Who finished</b> <br>
            ${aAmount} finished prototype A 
            <br>
            ${bAmount} finished prototype B
            <br><br>
            <b>Routes: </b> 
            <br>
            GET /getPrototype <br>
            GET /confirmPrototype/:which <br>
            GET /reset?confirmCode <br>
            <br>
            This script is written by schüter <br>
            <a href="http://slytter.tk">slytter.tk</a><br>
            <a href="https://github.com/neheren">github</a>
            `);
        });
    });
});

app.get('/reset', function(req,res){
    if(req.query.confirmCode == 'lars_reng'){
        ['/A.txt', '/B.txt'].forEach(element => {
            fs.writeFile(__dirname + element, '', function(err) {
                if(err) {
                    return res.status(500).send(err);
                }
            }); 
        });
        console.log("The file was saved!");
        return res.send('Deleted both files');
    }else{
        return res.status(500).send('Error. Could not delete. please enter correct confirmCode in params');
    }
})

app.listen(4000)
console.log("listening on port 4000")

function loadFile(file){
    return new Promise((resolve, reject)=>{
        fs.readFile( __dirname + file, function (err, data) {
          if (err) {
            reject(err);
          }
          resolve(data.toString());
        });
    }) 
}