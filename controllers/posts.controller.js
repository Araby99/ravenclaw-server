const { posts } = require("../schemas/posts.schema");
const { categories } = require("../schemas/categories.schema");

exports.getAllPosts = (req, res) => {
    posts.find({}).then(result => {
        res.status(200).send(result.reverse())
    })
}

exports.getPost = (req, res) => {
    const { id } = req.params;
    posts.findOne({ _id: id }).then(result => {
        res.status(200).send(result);
    }).catch(() => {
        res.sendStatus(400);
    })
}

exports.getPostsByUser = (req, res) => {
    const { username } = req.params;
    posts.find({
        author: username
    }).then(result => {
        res.status(200).send(result.reverse());
    }).catch(() => {
        res.sendStatus(400)
    })
}

exports.getPostsByTag = (req, res) => {
    const { tag } = req.params;
    posts.find({ categories: tag }).then(result => {
        res.send(result.reverse())
    })
}

exports.createPost = (req, res) => {
    const { title, description, author } = req.body;
    if (!title || !description || !author) {
        res.sendStatus(400);
    } else {
        if (req.body.categories) {
            categories.find({}).then(result => {
                let all = [];
                for (let i = 0; i < result.length; i++) all.push(result[i].title);
                req.body.categories.forEach(category => {
                    if (!all.includes(category)) {
                        categories.create({ title: category });
                    }
                })
            })
            posts.create(req.body).then(result => {
                res.status(201).send(result);
            })
        } else {
            posts.create(req.body).then(result => {
                res.status(201).send(result);
            })
        }
    }
}

exports.updatePost = (req, res) => {
    const { id } = req.params;
    posts.findOne({ _id: id }).then(result => {
        if (result.author == req.body.author) {
            if (req.body.categories) {
                categories.find({}).then(result => {
                    let all = [];
                    for (let i = 0; i < result.length; i++) all.push(result[i].title);
                    req.body.categories.forEach(category => {
                        if (!all.includes(category)) {
                            categories.create({ title: category });
                        }
                    })
                })
                posts.findByIdAndUpdate(id, req.body, { new: true }).then(data => {
                    res.status(200).send(data);
                })
            } else {
                posts.findByIdAndUpdate(id, req.body, { new: true }).then(data => {
                    res.status(200).send(data);
                })
            }
        } else {
            res.sendStatus(401)
        }
    })
}

exports.deletePost = (req, res) => {
    const { data } = req.params;
    const id = data.split(":")[0];
    const author = data.split(":")[1];
    posts.findOne({ _id: id }).then(result => {
        if (result.author == author) {
            result.categories.forEach(category => {
                posts.find({ categories: category }).then(cat => {
                    if (!cat[0]) {
                        categories.deleteOne({ title: category }).then(() => console.log("deleted"));
                    }
                })
            });
            posts.findByIdAndDelete(id).then(() => {
                res.sendStatus(202)
            })
        } else {
            res.sendStatus(401)
        }
    })
}