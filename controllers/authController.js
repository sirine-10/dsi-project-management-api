const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const register = async (req, res) => {
  try {
    const { nom, login, password } = req.body;

    if (!nom || !login || !password) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires"
      });
    }

    if (typeof nom !== "string" ||
        typeof login !== "string" ||
        typeof password !== "string") {
      return res.status(400).json({
        message: "Champs invalides"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Mot de passe trop court (8 caracteres minimum)"
      });
    }
     const existingUser = await User.findOne({ login });

    if (existingUser) {
      return res.status(409).json({
        message: "Login deja utilise"
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      nom,
      login,
      password: hashedPassword,
      role: "user"
    });
     res.status(201).json({
      message: "Utilisateur cree avec succes",
      user: {
        id: user._id,
        nom: user.nom,
        login: user.login,
        role: user.role
      }
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Login deja utilise"
      });
    }

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
};


const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (typeof login !== "string" ||
        typeof password !== "string") {
      return res.status(400).json({
        message: "Login et mot de passe requis"
      });
    }
    const user = await User.findOne({ login }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Identifiants invalides"
      });
    }
     const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Identifiants invalides"
      });
    }

    // Generation du token JWT
    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Connexion reussie",
      token
    });

  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur"
    });
  }
};

module.exports = { register, login };
