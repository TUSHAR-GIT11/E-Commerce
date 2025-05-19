const express = require("express");
const app = express();
app.use(express.json());
const db = require("./db");

const jwt = require("jsonwebtoken");
const { jwtAuthMiddleware, generateToken } = require("./jwt");
require("dotenv").config();
const Product = require("./product");
const User = require("./user");
const cors = require("cors");
app.use(cors());
app.post("/register", async (req, res) => {
  try {
    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    console.log("data saved");
    const payload = {
      id: response.id,
      email: response.email,
    };

    const token = generateToken(payload);

    res.status(200).json({ user: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Incorrect email" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" }); // ✅ Corrected
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = generateToken(payload);
    res.json({ token, user });
  } catch (err) {
    console.log("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/add-product", async (req, res) => {
  try {
    const data = req.body;
    const newProduct = new Product(data);
    const response = await newProduct.save();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const data = await Product.find();
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ message: "No product found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/product/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const data = await Product.findByIdAndDelete(personId);
    res.status(200).json(data, { message: "data deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const data = req.params.id;
    const result = await Product.findById(data);
    if (!result) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    console.log(">>> PUT /product/:id hit");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    const response = await Product.findByIdAndUpdate(productId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ message: "No Product found" });
    }

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/search/:key", async (req, res) => {
  try {
    const result = await Product.find({
      $or: [
        { name: { $regex: req.params.key } },
        { price: { $regex: req.params.key } },
        { category: { $regex: req.params.key } },
        { company: { $regex: req.params.key } },
      ],
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/user/profile/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/user/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(4000, () => {
  console.log("running on port 4000");
});
