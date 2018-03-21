function PlayArena(name){
	
    var playArenaMaterial = Materials.materialPlain;

    var group = new THREE.Object3D();

    var size = 10
    var posX = -1350;
    var posY = 150;
    var posZ = 1350;


    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            var playArenaMesh = new THREE.Mesh(new THREE.CubeGeometry(300, 190, 300), playArenaMaterial);
            playArenaMesh.name = name + "_" + (i * size + j)
            playArenaMesh.userData.id = (i * size + j)
            playArenaMesh.position.z = posZ - (i * 300)
            playArenaMesh.position.x = posX + (j * 300)
            playArenaMesh.position.y = posY
            group.add(playArenaMesh);
        }
    }

    this.getplayArenaMesh = function () {
        return group;
    }
}