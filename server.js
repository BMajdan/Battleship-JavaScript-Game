var fs = require("fs");
var http = require("http");
var qs = require("querystring");
var socketio = require("socket.io");
var mongoose = require("mongoose");

var Models = require("./database/Models.js")(mongoose);
console.log("Załadowanie plików Models");
mongoose.connect('mongodb://localhost/battleShipGame');
console.log("Załadowanie plików Mongoose");
var Operations = require("./database/Operations.js")
console.log("Załadowanie plików Operations");
var db;
var opers = new Operations();

var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                fs.readFile("static/index.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/style.css") {
                fs.readFile("static/style.css", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/js/Game.js") {
                fs.readFile("static/js/Game.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/js/UserInterface.js") {
                fs.readFile("static/js/UserInterface.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/js/Ship.js") {
                fs.readFile("static/js/Ship.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/js/Settings.js") {
                fs.readFile("static/js/Settings.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/libs/orbitcontrols.js") {
                fs.readFile("static/libs/orbitcontrols.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/libs/jquery.js") {
                fs.readFile("static/libs/jquery.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/js/Main.js") {
                fs.readFile("static/js/Main.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            } else if (req.url === "/js/Net.js") {
                fs.readFile("static/js/Net.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            } else if (req.url === "/js/Materials.js") {
                fs.readFile("static/js/Materials.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/js/WaterShader.js") {
                fs.readFile("static/js/WaterShader.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/js/Models.js") {
                fs.readFile("static/js/Models.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/js/Water.js") {
                fs.readFile("static/js/Water.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/js/SkyBox.js") {
                fs.readFile("static/js/SkyBox.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/js/PlayArena.js") {
                fs.readFile("static/js/PlayArena.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/libs/colladaLoader.js") {
                fs.readFile("static/libs/colladaLoader.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/libs/three.js") {
                fs.readFile("static/libs/three.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/libs/socket.js") {
                fs.readFile("static/libs/socket.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/textures/skyboxsun25degtest.png") {
                fs.readFile("static/textures/skyboxsun25degtest.png", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/png;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/textures/waternormals.jpg") {
                fs.readFile("static/textures/waternormals.jpg", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/jpg;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/textures/plain.png") {
                fs.readFile("static/textures/plain.png", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/png;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            } else if (req.url === "/textures/plain_green.png") {
                fs.readFile("static/textures/plain_green.png", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/png;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            } else if (req.url === "/textures/plain_red.png") {
                fs.readFile("static/textures/plain_red.png", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/png;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            } else if (req.url === "/textures/plain_blue.png") {
                fs.readFile("static/textures/plain_blue.png", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/png;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            } else if (req.url === "/textures/plain_lightblue.png") {
                fs.readFile("static/textures/plain_lightblue.png", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'image/png;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/models/boat/boat.xml") {
                fs.readFile("static/models/boat/boat.xml", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/models/cargo/cargo.xml") {
                fs.readFile("static/models/cargo/cargo.xml", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/models/discovery/discovery.xml") {
                fs.readFile("static/models/discovery/discovery.xml", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/models/godspeed/godspeed.xml") {
                fs.readFile("static/models/godspeed/godspeed.xml", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }else if (req.url === "/models/susan/susan.xml") {
                fs.readFile("static/models/susan/susan.xml", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.write(data);
                    res.end();
                })
            }
            break;
        case "POST":
            break;
    }
})
server.listen(3000);
console.log("Załadowanie plików serwera");
var io = socketio.listen(server)
console.log("Załadowanie plików socket");
console.log("Serwer uruchomiony - PORT: 3000");

function connectToMongo() {

    db = mongoose.connection;

    db.on("error", function () {
        console.log("Problem z połączeniem do MongoDB")
    });

    db.once("close", function () {
        console.log("Połączenie z MongoDB zostało zerwane");
    });
}

connectToMongo();

// ===================================================


var all_ships_to_shot_nr = 20

var Game = function(){
    this.user1 = null
    this.user2 = null

    this.user1_board = null
    this.user2_board = null

    this.user1_count_shot_ships = 0
    this.user2_count_shot_ships = 0

    this.users_started = 0
    this.whose_turn = false
}
var games = []


io.sockets.on("connection", function (client) {

    client.emit("onconnect", { clientName: client.id })


    client.on("startGame", function (data) {

        if (games.length == 0 || games[games.length - 1].user2 != null) {
            games.push(new Game)
            games[games.length - 1].user1 = client.id
            games[games.length - 1].user1_board = data.board_ships
        }
        else {
            games[games.length - 1].user2 = client.id
            games[games.length - 1].user2_board = data.board_ships
        }

        var last_game = games[games.length - 1]
        ++last_game.users_started

        //console.log(JSON.stringify(games, null, 4))

        if (last_game.users_started == 2)
        {
            io.sockets.to(client.id).emit("startGame", {
                status: true,
                clientGame: games.length - 1,
                whoseTurn: false
            });

            var client_to_send
            if (last_game.user1 == client.id)
                client_to_send = last_game.user2
            else
                client_to_send = last_game.user1
            io.sockets.to(client_to_send).emit("startGame2", {
                status: true
            });
        }
        else
        {
            if (last_game.user1 == client.id)
                last_game.whose_turn = 1
            else if (last_game.user2 == client.id)
                last_game.whose_turn = 2
            io.sockets.to(client.id).emit("startGame", {
                status: false,
                clientGame: games.length - 1,
                whoseTurn: true
            });
        }


    })

    client.on("shoot", function (data) {
        var actual_game = games[data.clientGame]

        if (actual_game.whose_turn == 1 && client.id == actual_game.user1)
        {
            var shot = (actual_game.user2_board[data.index] == 1)

            actual_game.whose_turn = 2
            
            io.sockets.to(actual_game.user1).emit("shoot", {
                whoseTurn: false,
                index: data.index,
                shot: shot
            });
            io.sockets.to(actual_game.user2).emit("shoot", {
                whoseTurn: true,
                index: data.index,
                shot: shot
            });


            if (shot)
                ++actual_game.user1_count_shot_ships
            if (actual_game.user1_count_shot_ships == all_ships_to_shot_nr) {
                io.sockets.to(actual_game.user1).emit("end", {
                    end: true,
                    win: true
                });
                io.sockets.to(actual_game.user2).emit("end", {
                    end: true,
                    win: false
                });
            }
        }
        else if (actual_game.whose_turn == 2 && client.id == actual_game.user2)
        {
            var shot = (actual_game.user1_board[data.index] == 1)

            

            actual_game.whose_turn = 1

            io.sockets.to(actual_game.user2).emit("shoot", {
                whoseTurn: false,
                index: data.index,
                shot: shot
            });
            io.sockets.to(actual_game.user1).emit("shoot", {
                whoseTurn: true,
                index: data.index,
                shot: shot
            });

            if (shot)
                ++actual_game.user2_count_shot_ships
            if(actual_game.user2_count_shot_ships == all_ships_to_shot_nr)
            {
                io.sockets.to(actual_game.user2).emit("end", {
                    end: true,
                    win: true
                });
                io.sockets.to(actual_game.user1).emit("end", {
                    end: true,
                    win: false
                });
            }
        }
    
    
    })




    // ================================================

    client.on("registerUser", function (data) {
        if (!(data.login == undefined || data.password.length <= 2)) {
            if (!(data.password == undefined || data.password.length <= 2)) {
                var user = new Models.userDatabase({
                    login: data.login,
                    password: data.password,
                    loginStatus: false,
                });
                var clientid = data.id
                user.validate(function (err) {
                    console.log(err);
                });

                opers.selectOne(Models.userDatabase, user.login, function(data){
                    if(data.length == 0){
                        opers.insertUser(user)
                        io.sockets.to(clientid).emit("userStatus", {
                            status: true,
                            info: "Zarejestrowano użytkownika"
                        });
                    } else {
                        io.sockets.to(clientid).emit("userStatus", {
                            status: false,
                            info: "Użytkownik już istnieje"
                        });
                    }
                })
            }
        }
    })

    client.on("loginUser", function (data) {
        if (!(data.login == undefined || data.password.length <= 2)) {
            if (!(data.password == undefined || data.password.length <= 2)) {

                var clientid = data.id

                opers.selectOne(Models.userDatabase, data.login, function (loadDatabase) {
                    console.log(data.password + " " + loadDatabase[0].password)
                    if (loadDatabase.length != 0) {
                        if (data.password == loadDatabase[0].password && loadDatabase[0].loginStatus == false) {
                            opers.updateLogin(Models.userDatabase, data.login, true)
                            io.sockets.to(clientid).emit("userStatus", {
                                status: true,
                                login: data.login,
                                info: "Zalogowano"
                            });
                        } else {
                            io.sockets.to(clientid).emit("userStatus", {
                                status: false,
                                info: "Użytkownik już jest zalogowany"
                            });
                        }
                    } else {
                        io.sockets.to(clientid).emit("userStatus", {
                            status: false,
                            info: "Użytkownik nie istnieje"
                        });
                    }
                })
            }
        }
    })

    client.on("getStats", function () {
        console.log("AA")
        opers.selectAll(Models.statisticDatabase, function(data){
            io.sockets.emit("returnStats", { object: data});
        })
    })

    client.on("winSave", function (data) {
        console.log(data)
        var user = new Models.statisticDatabase({
            user: data.user,
            time: data.time,
            result: data.result
        });
        opers.insertUser(user)
    })

    client.on("loseSave", function (data) {
        console.log(data)
        var user = new Models.statisticDatabase({
            user: data.user,
            time: data.time,
            result: data.result
        });
        opers.insertUser(user)
    })

    client.on("logOut", function (data) {
        opers.updateLogin(Models.userDatabase, data.login, false)
    })
    client.on("logOut2", function (data) {
        opers.updateLogin(Models.userDatabase, data.login, false)
        //--users_started
    })

})

