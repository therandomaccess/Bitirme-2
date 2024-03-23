const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
  })
);

app.use(bodyParser.json());

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Token bulunamadı" });
  }
  try {
    const decodedToken = jwt.verify(token, "secret_key");
    req.user = decodedToken.user;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Geçersiz token" });
  }
}

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: "Kullanıcı oluşturuldu", newUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Kullanıcı oluşturulamadı", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "Kullanıcı bulunamadı" });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Geçersiz parola" });
  }
  const token = jwt.sign({ user }, "secret_key", { expiresIn: "1h" });
  res.status(200).json({ message: "Oturum açıldı", token });
});

app.get("/home", verifyToken, (req, res) => {
  res
    .status(200)
    .json({ message: "Ana sayfaya hoş geldiniz!", user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
