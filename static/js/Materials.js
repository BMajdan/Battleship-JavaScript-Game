var Materials = {
    materialPlain: new THREE.MeshFaceMaterial([
        new THREE.MeshBasicMaterial({color: 0x000000}),
        new THREE.MeshBasicMaterial({color: 0x000000}),
        new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture("textures/plain.png") }),
        new THREE.MeshBasicMaterial({color: 0x000000}),
        new THREE.MeshBasicMaterial({color: 0x000000}),
        new THREE.MeshBasicMaterial({color: 0x000000})
    ]),

    materialPlainGreen: new THREE.MeshFaceMaterial([
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture("textures/plain_green.png") }),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
    ]),

    materialPlainRed: new THREE.MeshFaceMaterial([
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture("textures/plain_red.png") }),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
    ]),

    materialPlainBlue: new THREE.MeshFaceMaterial([
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture("textures/plain_blue.png") }),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
    ]),

    materialPlainLightBlue: new THREE.MeshFaceMaterial([
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture("textures/plain_lightblue.png") }),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
    ])
}