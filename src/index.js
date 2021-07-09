const express = require("express");
require('dotenv').config()
const exphbs = require("express-handlebars");
const path = require("path");
const app = express();
const stripe = require("stripe")(
  process.env.SK
);

const port = 4242;

app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(require("./routes"));
app.get("/", (req, res) => res.send("Hello World!"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
