function Game(){

    var clicked = -1
    var direction = 0 // 0 - horizontally, 1 - vertically
    var count_ships_set = 0

    var start_game = false
    var end_game = false
    var waiting_for_enemy = false

    var ship_types = 4
    var all_ships_nr = 10

    var board_size = 10
    var board_size_big = board_size + 2
    var board_ships = new Array(board_size_big * board_size_big)
    for (var i = 0; i < board_size_big * board_size_big; i++)
        board_ships[i] = 0

    var board_shoot = new Array(board_size * board_size)
    for (var i = 0; i < board_size * board_size; i++)
        board_shoot[i] = 0

    var count_shot_ships = 0
    var all_ships_to_shot_nr = 20


    var ships
    var is_models_loaded = false
    var loaded_models = 0

    var that = this

    // ======================================


    this.loadModels = function () {
        ships = {
            one: new Ship("/models/discovery/discovery.xml", function (model) {
                model.position.y = 100
                model.scale.set(2400, 2400, 2400)
                model.rotation.y = Math.PI
                ++loaded_models
            }),
            two: new Ship("/models/boat/boat.xml", function (model) {
                model.position.y = 70
                model.scale.set(35, 35, 35)
                model.rotation.z = Math.PI / 2
                model.rotation.y = -Math.PI / 2
                model.rotation.x = Math.PI / 2
                ++loaded_models
            }),
            three: new Ship("/models/susan/susan.xml", function (model) {
                model.position.y = 320
                model.scale.set(3000, 3000, 3000)
                model.rotation.y = Math.PI
                ++loaded_models
            }),
            four: new Ship("/models/cargo/cargo.xml", function (model) {
                model.position.y = 100
                model.scale.set(5, 5, 5)
                model.rotation.y = 3*Math.PI/2
                ++loaded_models
            })
        }

        ships.one.translateWidth = 20
        ships.two.translateWidth = 150
        ships.three.translateWidth = 280
        ships.four.translateWidth = 450
    }



    this.isModelsLoaded = function () {
        if (loaded_models == 4)
            is_models_loaded = true
        return is_models_loaded
    }

    
    this.loadModels()
    var loadModelsWait = setInterval(function () {
        if (that.isModelsLoaded()) {
            console.log("loaded")

            clearInterval(loadModelsWait)
            that.generateMenuShips()
        }
        else
            console.log("loading")
    }, 100)



    


    // ===================================

    this.canPut = function (ship_size, board_id) {
        var index1 = Math.floor(board_id / board_size) + 1
        var index2 = board_id % board_size + 1

        if (direction == 0) // horizontally
        {
            if (index2 > board_size - ship_size + 1)
                index2 = board_size - ship_size + 1

            var ident = index1 * board_size_big + index2

            for (var i = -1; i <= 1; i++)
                for (var j = -1; j <= ship_size; j++)
                    if (board_ships[ident + i * board_size_big + j] != 0)
                        return false
        }
        else // vertically
        {
            if (index1 - ship_size - 1 < 0)
                index1 += (ship_size - index1)

            var ident = index1 * board_size_big + index2

            for (var i = -1; i <= 1; i++)
                for (var j = -ship_size; j <= 1; j++)
                    if (board_ships[ident + j * board_size_big + i] != 0)
                        return false
        }
        return true
    }



    this.createShip = function (size, position) {
        var which_ship
        if(size == 1)
            which_ship = ships.one
        else if(size == 2)
            which_ship = ships.two
        else if(size == 3)
            which_ship = ships.three
        else if(size == 4)
            which_ship = ships.four

        var ship = which_ship.getModel().clone()
        
        if (direction == 0)
        {
            ship.position.x += position.x + which_ship.translateWidth
            ship.position.z += position.z
        }
        else
        {
            ship.position.x += position.x
            ship.position.z += position.z + which_ship.translateWidth
            ship.rotateY(-Math.PI/2)
        }
        ship.position.y += 190
        
        return ship
    }



    this.putShip = function (size, position, board_id) {
        var pos = {x: position.x, y: position.y, z: position.z}

        var index1 = Math.floor(board_id / board_size) + 1
        var index2 = board_id % board_size + 1

        if (direction == 0 && index2 > board_size - size + 1) {
            pos.x -= 300 * (index2 - (board_size - size + 1))
            index2 = board_size - size + 1
        }
        if (direction == 1 && index1 - size - 1 < 0) {
            pos.z -= 300 * (size - index1)
            index1 += (size - index1)
        }

        var ident = index1 * board_size_big + index2

        if (direction == 0) // horizontally
            for (var i = 0; i < size; i++)
                board_ships[ident + i] = 1
        else // vertically
            for (var i = 0; i < size; i++)
                board_ships[ident - i * board_size_big] = 1

        document.querySelectorAll('[data-id="' + clicked + '"]')[0].previousSibling.remove()
        document.querySelectorAll('[data-id="' + clicked + '"]')[0].remove()
        clicked = -1

        ++count_ships_set
        if (count_ships_set == all_ships_nr) {
            that.addStartButton()
        }

        return this.createShip(size, pos)
    }


    this.getReducedBoardArray = function(){
        var reduced_array = []
        for (var i = 1; i < board_size_big - 1; ++i)
            reduced_array = reduced_array.concat(board_ships.slice(i * board_size_big + 1, i * board_size_big + board_size_big - 1))

        return reduced_array
    }

    this.canShoot = function (board_id) {
        return (board_shoot[board_id] == 0)
    }

    this.updateShotArray = function (index) {
        board_shoot[index] = 1
    }

    this.shot = function (is_shot, board_id) {
        board_shoot[board_id] = 1

        if (is_shot) {
            ++count_shot_ships
            if (count_shot_ships == all_ships_to_shot_nr) {
                alert("Wygra³eœ")
                // net.win()
            }
        }
    }

    // =====================================================

    this.colorPlain = function (scene, can_put, board_id, size) {
        var material
        if (can_put)
            material = Materials.materialPlainGreen
        else
            material = Materials.materialPlainRed

        var index1 = Math.floor(board_id / board_size) + 1
        var index2 = board_id % board_size + 1

        if (direction == 0) // horizontally
        {
            if (index2 > board_size - size + 1)
                board_id -= index2 - (board_size - size + 1)

            for (var i = 0; i < size; ++i)
                scene.getObjectByName("board_" + (board_id + i), true).material = material
        }
        else // vertically
        {
            if (index1 - size - 1 < 0)
                board_id += (size - index1) * board_size

            for (var i = 0; i < size; ++i)
                scene.getObjectByName("board_" + (board_id - (i * board_size)), true).material = material
        }
    }


    this.colorShootingPlain = function (scene, board_id) {
        if (board_shoot[board_id] == 0)
            scene.getObjectByName("enemy_board_" + board_id, true).material = Materials.materialPlainLightBlue
    }
    this.colorShotPlain = function (scene, is_shot, board_id, name_start) {
        var material
        if (is_shot)
            material = Materials.materialPlainRed
        else
            material = Materials.materialPlainBlue

        scene.getObjectByName(name_start + "_" + board_id, true).material = material
    }

    this.clearPlain = function (scene) {
        for (var i = 0; i < board_size * board_size; ++i)
            scene.getObjectByName("board_" + i, true).material = Materials.materialPlain;
    }
    this.clearEnemyPlain = function (scene) {
        for (var i = 0; i < board_size * board_size; ++i)
            if (board_shoot[i] == 0)
                scene.getObjectByName("enemy_board_" + i, true).material = Materials.materialPlain;
    }


    // ==================================================

    this.addStartButton = function () {
        var button = document.createElement("button")
        button.id = "btn_start_game"
        button.className = "button button-block"
        button.innerHTML = "START"

        button.addEventListener("click", function () {
            button.remove()
            net.startGame(game.getReducedBoardArray())
            $("#shipPanel").css("display", "none")
            $("#moveInfo").html("")
            //main.generateSecondPlain()
        })

        document.getElementById("shipPanel").appendChild(button)
        document.getElementById("shipPanelText").innerHTML = "Rozpocznij grę"
    }

    

    // =====================================================
    
    this.generateMenuShips = function() {
        var shipPanel = document.getElementById("shipPanel")

        for (var i = 1; i <= ship_types; i++)
        {
            for (var j = 1; j <= i; j++) {
                var table_m = document.createElement("table")
                table_m.className = "menu_statki"
                table_m.setAttribute("data-id", (ship_types + 1 - i).toString() + j.toString())
                //
                table_m.addEventListener("mouseover", function () {
                    if (clicked != this.getAttribute("data-id"))
                        this.style.backgroundColor = "lightblue"
                })
                table_m.addEventListener("mouseout", function () {
                    if (clicked != this.getAttribute("data-id"))
                        this.style.backgroundColor = "white"
                })
                table_m.addEventListener("click", function () {
                    if (clicked != -1)
                        document.querySelectorAll('[data-id="' + clicked + '"]')[0].style.backgroundColor = "white"
                    this.style.backgroundColor = "CornflowerBlue"
                    clicked = this.getAttribute("data-id")
                })
                //
                var row = table_m.insertRow()
                for (var n = 0; n < ship_types + 1 - i; n++)
                    row.insertCell()

                shipPanel.appendChild(document.createElement("br"))
                shipPanel.appendChild(table_m)
            }
        }
    }



    this.changeDirection = function () {
        if (clicked != -1)
            direction = !direction
    }

    this.isClicked = function () {
        return (clicked != -1)
    }
    this.getClickedSize = function () {
        if (clicked != -1)
            return clicked.substr(0, 1)
        else
            return false
    }
    this.getClickedIndex = function () {
        if (clicked != -1)
            return clicked.substr(1, 1)
        else
            return false
    }

    this.startGame = function () {
        waiting_for_enemy = false
        start_game = true
    }
    this.isGameStarted = function () {
        return start_game
    }
    this.waitingForEnemy = function () {
        waiting_for_enemy = true
    }
    this.isWaitingForEnemy = function () {
        return waiting_for_enemy
    }
    this.endGame = function () {
        end_game = true
    }
    this.isGameEnded = function () {
        return end_game
    }
}