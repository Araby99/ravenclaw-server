const { users } = require('../schemas/users.schema');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary');

cloudinary.v2.config({
    cloud_name: 'dtoyodnfi',
    api_key: '323235823215952',
    api_secret: 'hv8_SeSbQDqmjEZXTUcCNuioujU',
    secure: true,
});


exports.getAllUsers = (req, res) => {
    users.find({}).then(result => {
        res.status(200).send(result)
    })
}

exports.getUser = (req, res) => {
    const { username } = req.params;
    users.findOne({ username: username }).then(result => {
        res.status(200).send(result);
    })
}

exports.createUser = (req, res) => {
    const { username, name, password } = req.body;
    if (!username || !name || !password) {
        res.sendStatus(400);
    } else {
        users.find({ username }).then(result => {
            if (result.length) {
                res.sendStatus(409)
            } else {
                bcrypt.hash(password, 10).then(hash => {
                    users.create({
                        username: username.toLowerCase(),
                        name,
                        password: hash
                    }).then(() => {
                        res.sendStatus(201);
                    })
                })
            }
        })
    }
}

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { password } = req.body
    if (!password) {
        users.findByIdAndUpdate({ _id: id }, req.body, { new: true }).then(result => {
            res.status(201).send(result)
        })
    } else {
        const { old_password } = req.body;
        users.findOne({ _id: id }).then(result => {
            bcrypt.compare(old_password, result.password).then(check => {
                if (check) {
                    bcrypt.hash(password, 10).then(hash => {
                        users.findByIdAndUpdate({ _id: id }, { password: hash }).then(result => {
                            res.status(201).send(result)
                        })
                    })
                } else {
                    res.sendStatus(401);
                }
            })
        })
    }
}