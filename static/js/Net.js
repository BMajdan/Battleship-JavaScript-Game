function Net(client) {

    var client = client

    var clientGame = false
    var whoseTurn = false

    this.startGame = function (board_ships) {
        client.emit("startGame", {
            board_ships: board_ships
        })
    }

    this.isMyTurn = function () {
        return (whoseTurn)
    }

    this.shoot = function (index) {
        $("#moveInfo").html("Ruch przeciwnika");
        client.emit("shoot", {
            index: index,
            clientGame: clientGame
        })
    }

    // ===================================


    client.on("startGame", function (data) {
        console.log(data)

        clientGame = data.clientGame
        whoseTurn = data.whoseTurn

        if(data.status)
        {
            main.deleteLoadingPanel()
            main.generateSecondPlain()
            game.startGame()
        }
        else
        {
            main.loadingPanel()
            game.waitingForEnemy()
        }
    })
    client.on("startGame2", function (data) {
        console.log(data)

        main.deleteLoadingPanel()
        main.generateSecondPlain()
        game.startGame()
    })

    client.on("shoot", function (data) {
        console.log(data)
        $("#moveInfo").html("Twój ruch");
        whoseTurn = data.whoseTurn

        if (data.whoseTurn)
        {
            main.colorShotPlain(data.shot, data.index, "board")
        }
        else
        {
            main.colorShotPlain(data.shot, data.index, "enemy_board")
            game.updateShotArray(data.index)
        }
        
    })

    client.on("end", function (data) {
        console.log(data)

        game.endGame()

        if(data.win){
            alert("Wygrałeś");
            var currentDate = new Date();
            $("#moveInfo").html("Koniec gry: Wygrałeś!");
            client.emit("winSave", {
                user: main.getClientLogin(),
                time: currentDate.getDate() + "." + (currentDate.getMonth()+1) + "." + currentDate.getFullYear(),
                result: "WIN"
            })
        }
        else{
            alert("Przegrałeś");
            var currentDate = new Date();
            $("#moveInfo").html("Koniec gry: Przegrałeś!");
            client.emit("loseSave", {
                user: main.getClientLogin(),
                time: currentDate.getDate() + "." + (currentDate.getMonth()+1) + "." + currentDate.getFullYear(),
                result: "LOSE"
            })
        }

    })

}