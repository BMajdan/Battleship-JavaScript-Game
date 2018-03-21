function Ship(model_url, callback) {
    var model

    this.loadModel = function (url, callback) {
        var loader = new THREE.ColladaLoader();
        loader.load(url, function (collada) {

            model = collada.scene;

            /*var material = new THREE.MeshBasicMaterial({
                color: 0xffffff, side: THREE.DoubleSide
            });*/

            model.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    //child.material = material
                }
            });

            callback(model)
            
        })
    }
    this.loadModel(model_url, callback)

    this.getModel = function () {
        return model
    }
}