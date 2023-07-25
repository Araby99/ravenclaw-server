const { default: mongoose } = require("mongoose");
exports.connect = () => mongoose.connect(process.env.MONGO).then(() => console.log("Connected"));