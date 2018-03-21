function Water(renderer, camera, scene, light){
	var waterNormals;

    waterNormals = new THREE.TextureLoader().load( 'textures/waternormals.jpg' );
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
    water = new THREE.Water( renderer, camera, scene, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        alpha:  1.0,
        sunDirection: light.position.clone().normalize(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 50.0,
        fog: scene.fog != undefined
    } );

    mirrorMesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( parameters.width * 500, parameters.height * 500 ),
        water.material
    );

    mirrorMesh.add( water );
    mirrorMesh.rotation.x = - Math.PI * 0.5;

    this.returnMirrorMesh = function(){
    	return mirrorMesh;
    }

    this.returnWater = function(){
    	return water;
    }
}