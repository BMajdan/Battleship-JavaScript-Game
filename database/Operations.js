module.exports = function () {

    var opers = {
        insertUser: function (data) {
            data.save(function (error, userAdd, dodanych) {})
        },
        selectOne: function (Model, login, callback) {
            Model.find({ login: login }, function (err, data) {
                if (err) return console.error(err);
                callback(data);
            })
        },
        selectAll: function (Model, callback) {
            Model.find({},function (err, data) {
                if (err) return console.error(err);
                callback(data);
            })
        },
        updateLogin: function (Model, loginName, status) {
            Model.update({ login: loginName, loginStatus: !status }, { login: loginName, loginStatus: status }, function (err, data) {
                if (err) return console.error(err);
                console.log(data);
            })
        },
        deleteOne: function (Model, playerID, callback) {
            Model.remove({_id: playerID},function (err, data) {
                callback(data);
            })
        },
    }

    return opers;

}
