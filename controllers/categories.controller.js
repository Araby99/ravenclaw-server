const { categories } = require("../schemas/categories.schema");

exports.getAllCategories = (req, res) => categories.find({}).then(result => res.send(result));