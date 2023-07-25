const express = require('express');
const { connect } = require('./db/connection');

require('dotenv').config();

const app = express();
connect();

app.use(require('cors')());
app.use(express.json());

app.use("/users", require('./routes/users.route'));
app.use("/posts", require('./routes/posts.route'));
app.use("/login", require('./routes/login.route'));

app.listen(process.env.PORT, () => console.log("Server Done!"))