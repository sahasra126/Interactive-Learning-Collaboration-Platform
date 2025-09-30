// server.js
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// === DB Setup ===
mongoose.connect("mongodb://127.0.0.1:27017/assessment", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// === Models ===
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["learner", "mentor"], default: "learner" },
  points: { type: Number, default: 0 },
});
const User = mongoose.model("User", UserSchema);

// Add in ContentSchema
const ContentSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String, // for YouTube or Docs links
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Content = mongoose.model("Content", ContentSchema);

// Add in ForumSchema
const ForumSchema = new mongoose.Schema({
  question: String,
  description: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  comments: [{
    text: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
  }]
});

const Forum = mongoose.model("Forum", ForumSchema);

// === Middleware ===
const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ message: "No token provided" });
    const decoded = jwt.verify(token, "secret123");
    req.user = await User.findById(decoded.id);
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// === Routes ===

// Register
app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
});

// Login
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid password" });
  const token = jwt.sign({ id: user._id }, "secret123");
  res.json({ token, user });
});

// Profile
app.get("/user/profile", auth, (req, res) => {
  res.json(req.user);
});

app.put("/user/profile", auth, async (req, res) => {
  const { name } = req.body;
  req.user.name = name || req.user.name;
  await req.user.save();
  res.json(req.user);
});

// Create content
app.post("/content", auth, async (req, res) => {
  const content = await Content.create({
    title: req.body.title,
    description: req.body.description,
    author: req.user._id,
  });
  // reward points
  req.user.points += 10;
  await req.user.save();
  res.json(content);
});

// Get all content
app.get("/content", auth, async (req, res) => {
  const content = await Content.find().populate("author", "name role");
  res.json(content);
});

// Forum - create question
app.post("/forum", auth, async (req, res) => {
  const post = await Forum.create({
    question: req.body.question,
    description: req.body.description,
    author: req.user._id,
  });
  res.json(post);
});

// Forum - get questions
app.get("/forum", auth, async (req, res) => {
  const posts = await Forum.find().populate("author", "name");
  res.json(posts);
});
// Add comment to forum post
app.post("/forum/:id/comment", auth, async (req, res) => {
  const forum = await Forum.findById(req.params.id);
  if (!forum) return res.status(404).json({ message: "Forum post not found" });
  forum.comments.push({ text: req.body.text, author: req.user._id });
  await forum.save();
  res.json(forum);
});

// Leaderboard
app.get("/leaderboard", auth, async (req, res) => {
  const users = await User.find().sort({ points: -1 }).limit(10);
  res.json(users);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
