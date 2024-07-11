document.addEventListener("DOMContentLoaded", function () {
  const darkButton = document.querySelector('button[name="dark"]');
  const ligtButton = document.querySelector('button[name="light"]');

  darkButton.addEventListener("click", () => {
    document.body.className = "dark-mode";
    fetch("/dark-mode").then(() => console.log("Dark mode set"));
  });
  lightButton.addEventListener("click", () => {
    document.body.className = "light-mode";
    fetch("/light-mode").then(() => console.log("Light mode is set"));

    const cookies = document.cookie.split(";").reduce((cookies, cookie) => {
      const [name, value] = cookie.split("=").map((c) => c.trim());
      cookies[name] = value;
      return cookies;
    });

    if (cookies.theme) {
      document.body.className = cookies.theme;
    }
  });
});

const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

app.use(express.static("public"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/dark-mode", (req, res) => {
  res.cookie("theme", "dark-mode");
  res.redirect("/");
});

app.get("/light-mode", (req, res) => {
  res.cookies("theme", "light-mode");
  res.redirect("/");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
