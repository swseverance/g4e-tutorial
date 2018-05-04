process.title = "rest-server"

var express = require('express');
var fs = require('fs')
var app = express();
var port = parseInt(process.argv[2]) || 22090
var server = app.listen(port, "localhost", function() {

    console.log("Serving on " + port)
});

app.get("/clients", function(req, res) {
    console.log("Serving client list")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var filename = __dirname + "\\clients.json";
    fs.createReadStream(filename).pipe(res)
})

app.get("/GetDemoPortfolio", function(req, res) {
    console.log(req.url)
    var id = req.query.xpath.match(/\[id=(.*?)\]/)[1]
    console.log("Serving portfolio for client " + id);

    var filename = __dirname + "\\clients.json";

    fs.readFile(filename, function(err, dataRaw) {
        //console.log(dataRaw)
        var clients = JSON.parse(dataRaw).Clients.Client
        var client = clients.filter(function(c) {
            return c.id == id || c.pId == id
        })[0];
        var clientId;
        if (client) {
            clientId = client.id;
        }

        var porfoliosFile = __dirname + "\\portfolio.json";

        fs.readFile(porfoliosFile, function(err, dataRaw) {

            var data = JSON.parse(dataRaw);

            var response_filtered = modify_path(data, ["Portfolios", "Portfolio"], function(a) {
                return a.filter(function(obj) { return obj.id == clientId })[0]
            });

            if (id == 'undefined') {
                if (response_filtered.Portfolios.Portfolio === undefined) {
                    var data = JSON.parse(dataRaw);
                    response_filtered = modify_path(data, ["Portfolios", "Portfolio"], function(a) {
                        return a[randomInt(0, data.Portfolios.Portfolio.length - 1)]
                    })
                }
            }

            console.log('response', response_filtered)
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

            res.write(JSON.stringify(response_filtered))

            res.end()
        })

    })

})

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

//Modifies node, specified by 'path' on object 'obj', by applying 'fn' to it.
function modify_path(obj, path, fn) {
    //Take the prop that we are replacing
    var prop = path.pop()

    //Get to the node
    var target_node = path.reduce(function(current_node, key) {
        if (key && obj[key] !== undefined) {
            current_node = obj[key]
        } else {
            throw "No property named " + key + "from path " + path
        }
        return current_node
    }, obj)

    //Apply the change
    target_node[prop] = fn(target_node[prop])
    return obj
}

//modify_path({a:{b:{}}}, ["a", "b"], function(obj){obj.c = "success";return obj})
