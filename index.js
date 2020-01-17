const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");

const app = express();
// Route

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Init middleware
//app.use(logger);

// Handlebards - Middleware

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Init Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route

app.get("/", (req, res) => {
  res.render("index", { title: "Members App Title", members });
});

app.use(express.static(path.join(__dirname, "public")));

// Member API Routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
