module.exports = function (mongoose) {

    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        login: { type: String, required: true },
        password: { type: String, required: true },
        loginStatus: { type: Boolean, required: true }
    });

    var statisticSchema = new Schema({
        user: { type: String, required: true },
        time: { type: String, required: true },
        result: { type: String, required: true }
    });

    var models = {
        userDatabase: mongoose.model("userDatabase", userSchema),
        statisticDatabase: mongoose.model("statisticDatabase", statisticSchema)
    }

    return models;

}