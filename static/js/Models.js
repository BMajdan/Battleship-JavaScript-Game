function LoadModel() {

    this.loadModel = function (url, callback) {
        var loader = new THREE.ColladaLoader();
        loader.load(url, function (collada) {

            daeModel = collada.scene;

            daeModel.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    
                }
            });
            callback(daeModel)
        })
    }

    this.getModel = function () {
        return daeModel
    }

}