const { users } = require("../schemas/users.schema");
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.sendStatus(400)
    } else {
        users.findOne({ username: username }).then(result => {
            if (result) {
                bcrypt.compare(password, result.password).then(check => {
                    if (check) {
                        res.send(result);
                    } else {
                        res.sendStatus(401)
                    }
                })
            } else {
                res.sendStatus(404)
            }
        })
    }
}