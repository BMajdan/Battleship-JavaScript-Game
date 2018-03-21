function Main(client) {

    client = client
    
    var clientID = ""
    var clientLogin = "";
    var isLogin = false
    var clientGame = false

    this.getClientLogin = function(){
        return clientLogin;
    }

    client.on("onconnect", function (data) {
        clientID = data.clientName
    })

    document.getElementById("loginButton").addEventListener("click", function () {
        var loginText = document.getElementById("userNameLogin").value
        var passwordText = document.getElementById("userPasswordLogin").value

        if (loginText.length > 2 && passwordText.length > 2) {
            client.emit("loginUser", {
                id: clientID,
                login: loginText,
                password: passwordText
            })
        } else {
            alert("Podaj poprawne dane")
        }
    })

    document.getElementById("registerButton").addEventListener("click", function () {
        var registerLogin = document.getElementById("userNameRegister").value
        var registerPassword = document.getElementById("userPasswordRegister").value

        if (registerLogin.length > 2 && registerPassword.length > 2) {
            client.emit("registerUser", {
                id: clientID,
                login: registerLogin,
                password: registerPassword
            })
        } else {
            alert("Podaj poprawne dane")
        }
    })

    client.on("userStatus", function (data) {
        if(data.info == "Zalogowano"){
            isLogin = true;
            clientLogin = data.login
            document.getElementById("loginPanel").style.display = "none";
            document.getElementById("shipPanel").style.display = "block";
            window.addEventListener("beforeunload", function (event) {
                if (game.isWaitingForEnemy() || game.isGameStarted())
                    client.emit("logOut2", {
                        login: clientLogin
                    })
                else
                    client.emit("logOut", {
                        login: clientLogin
                    })
            });
        }else{
            alert(data.info)
        }
    })

    var renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById( 'main' ).appendChild( renderer.domElement );
    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0xaabbbb, 0.0001 );
    var camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.5, 3000000 );
    camera.position.set( 0, 3900, 0 );

    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enablePan = false;
    controls.minDistance = 1000.0;
    controls.maxDistance = 5000.0;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.target.set( 0, 500, 0 );

    scene.add( new THREE.AmbientLight( 0x444444 ) );
    var light = new THREE.DirectionalLight( 0xffffbb, 100 );
    light.position.set( - 1, 1, - 1 );
    scene.add( light );

    var water = new Water(renderer, camera, scene,light);
    var waterMesh = water.returnMirrorMesh();
    var renderWater = water.returnWater();
    scene.add( waterMesh );

    var skyBox = new SkyBox();
    scene.add( skyBox.returnSkyBoxMesh() );

    var playArena = new PlayArena("board");
    scene.add(playArena.getplayArenaMesh());

    var userInterface = new UserInterface(client);


    


    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    window.addEventListener('resize', onWindowResize, false);


    //

    this.loadingPanel = function () {
        if (!document.getElementById("loading_panel"))
        {
            var loading = document.createElement("div")
            loading.className = "loading-panel"
            loading.id = "loading_panel"
            var text = document.createElement("p")
            text.innerHTML = "Oczekiwanie na drugiego gracza..."
            loading.appendChild(text)
            document.body.appendChild(loading)
        }
    }
    this.deleteLoadingPanel = function () {
        if(loading = document.getElementById("loading_panel"))
            loading.remove()
    }


    this.generateSecondPlain = function(){
        var playArena = new PlayArena("enemy_board");
        playArena.getplayArenaMesh().position.x = 4000
        scene.add(playArena.getplayArenaMesh());

        camera.position.set(2000, 4000, 0);
        controls.target.set(2000, 500, 0);
    }

    // =============================================

    this.colorShotPlain = function (is_shot, index, name_start) {
        game.colorShotPlain(scene, is_shot, index, name_start)
    }

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    var intersect_pos
    var board_id
    var can_put = false
    var can_shoot = false
    var is_mouse_on_my_plain = false
    var is_mouse_on_enemy_plain = false

    function raycasting(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0 && !game.isGameEnded()) {
            if (!game.isGameStarted()) {
                if (intersects[0].object.name.startsWith("board")) {
                    is_mouse_on_my_plain = true
                    if (game.isClicked()) {
                        board_id = intersects[0].object.userData.id
                        intersect_pos = intersects[0].object.position

                        game.clearPlain(scene)

                        var can = game.canPut(game.getClickedSize(), board_id)
                        can_put = can
                        game.colorPlain(scene, can, board_id, game.getClickedSize())
                    }
                }
                else {
                    is_mouse_on_my_plain = false
                    game.clearPlain(scene)
                }

            }
            else if(net.isMyTurn()){
                $("#moveInfo").html("Twój ruch");
                if (intersects[0].object.name.startsWith("enemy_board")) {
                    is_mouse_on_enemy_plain = true
                    board_id = intersects[0].object.userData.id
                    intersect_pos = intersects[0].object.position

                    game.clearEnemyPlain(scene)
                    game.colorShootingPlain(scene, board_id)

                    can_shoot = game.canShoot(board_id)
                }
                else {
                    is_mouse_on_enemy_plain = false
                    game.clearEnemyPlain(scene)
                }

            }else{
                $("#moveInfo").html("Ruch przeciwnika");
            }
        }
    }
    document.addEventListener('mousemove', raycasting)
    document.addEventListener('mousedown', function (event) {
        if (event.which == 1) // left mouse button
        {
            if (!game.isGameStarted()) {
                if (is_mouse_on_my_plain && game.isClicked() && can_put) {
                    scene.add(game.putShip(parseInt(game.getClickedSize()), intersect_pos, board_id))
                    game.clearPlain(scene)
                }
            }
            else {
                if (is_mouse_on_enemy_plain && can_shoot && net.isMyTurn()) {
                    net.shoot(board_id)
                }
            }
        }
        else if (event.which == 3) // right mouse button
        {
            if (!game.isGameStarted()) {
                if (is_mouse_on_my_plain && game.isClicked()) {
                    game.changeDirection()
                    game.clearPlain(scene)

                    var can = game.canPut(game.getClickedSize(), board_id)
                    can_put = can
                    game.colorPlain(scene, can, board_id, game.getClickedSize())
                }
            }
        }

    }, false);

    // =============================================

    animate();

    function animate() {
        requestAnimationFrame(animate);

        raycaster.setFromCamera(mouse, camera);

        render();
    }


    function render() {
        var time = performance.now() * 0.001;
        if(water){
            renderWater.material.uniforms.time.value += 1.0 / 60.0;
            controls.update();
            renderWater.render();
        }
        renderer.render( scene, camera );
    }

    
}