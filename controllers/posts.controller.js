const { posts } = require("../schemas/posts.schema")

exports.getAllPosts = (req, res) => {
    posts.find({}).then(result => {
        res.status(200).send(result)
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
        res.status(200).send(result);
    }).catch(() => {
        res.sendStatus(400)
    })
}

exports.createPost = (req, res) => {
    const { title, description, author } = req.body;
    if (!title || !description || !author) {
        res.sendStatus(400);
    } else {
        posts.create(req.body).then(result => {
            res.status(201).send(result);
        })
    }
}

exports.updatePost = (req, res) => {
    const { id } = req.params;
    posts.findOne({ _id: id }).then(result => {
        if (result.author == req.body.author) {
            posts.findByIdAndUpdate(id, req.body, { new: true }).then(data => {
                res.status(200).send(data);
            })
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
            posts.findByIdAndDelete(id).then(() => {
                res.sendStatus(202)
            })
        } else {
            res.sendStatus(401)
        }
    })
}