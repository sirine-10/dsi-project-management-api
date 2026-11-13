const mongoose = require("mongoose");
const Project = require("../models/Project");
const Task = require("../models/Task");

// Naamlou projet jdid lel utilisateur connecté

const createProject = async (req, res) => {
  try {
    const { nom, description, status } = req.body;

    if (typeof nom !== "string" || !nom.trim()) {
      return res.status(400).json({
        message: "Nom du projet obligatoire"
      });
    }

    const allowedStatuses = ["en cours", "termine", "en pause"];

    if (status !== undefined && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Status invalide"
      });
    }

    if (description !== undefined && typeof description !== "string") {
      return res.status(400).json({
        message: "Description invalide"
      });
    }

    const project = await Project.create({
      nom: nom.trim(),
      description: description || "",
      status: status || "en cours",
      owner: req.user.id
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Nraj3ou les projets mtaa utilisateur
const getProjects = async (req, res) => {
  try {
    if (req.user.role === "manager") {
      // Manager ynajem ychouf les projets lkol
      projects = await Project.find().sort({ createdAt: -1 });
    } else {
      // User ychouf ken les projets mte3ou
      projects = await Project.find({
        owner: req.user.id
      }).sort({ createdAt: -1 });
    }
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
//nlawjo b d id mtaa projet mtaa utilisateur
const getProjectById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user.id
    });

    if (!project) {
      return res.status(404).json({ message: "Projet introuvable" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
//nbdlo hajat fi project info 
const updateProject = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const { nom, description, status } = req.body;
    const updates = {};

    if (nom !== undefined) {
      if (typeof nom !== "string" || !nom.trim()) {
        return res.status(400).json({ message: "Nom invalide" });
      }
      updates.nom = nom.trim();
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        return res.status(400).json({ message: "Description invalide" });
      }
      updates.description = description;
    }

    if (status !== undefined) {
      if (!["en cours", "termine", "en pause"].includes(status)) {
        return res.status(400).json({ message: "Status invalide" });
      }
      updates.status = status;
    }

    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Projet introuvable" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
}

//faza lena info nfskho project w jaw te3o kol ay ref w link ando l user 
const deleteProject = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user.id
    });

    if (!project) {
      return res.status(404).json({ message: "Projet introuvable" });
    }
     await Task.deleteMany({ project: project._id });
    await Project.deleteOne({ _id: project._id, owner: req.user.id });

    res.json({ message: "Projet supprime avec succes" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
};