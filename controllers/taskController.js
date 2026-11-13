
const Task = require("../models/Task");
const Project = require("../models/Project");
const User = require("../models/User");

// Ajouter une tâche
const createTask = async (req, res) => {
  try {
    const { titre, description, project, deadline } = req.body;

    if (!titre || !project) {
      return res.status(400).json({
        message: "Titre et projet obligatoires"
      });
    }

    // Verifier que le projet appartient a l'utilisateur
    const existingProject = await Project.findOne({
      _id: project,
      owner: req.user.id
    });

    if (!existingProject) {
      return res.status(404).json({
        message: "Projet introuvable"
      });
    }

    const task = await Task.create({
      titre,
      description,
      project,
      deadline
    });

    res.status(201).json(task);
  } catch (error) {
  console.log("Erreur creation tâche:", error.message);

  res.status(400).json({
    message: "Donnees invalides"
  });
}
};

// Afficher les tâches de mes projets

const listTasks = async (req, res) => {
  try {
    const filter = {};

    // Ken user aadi ychouf ken les taches mtaa projets mte3ou
    // Ken manager ychouf les taches lkol
    if (req.user.role !== "manager") {
      const projects = await Project.find({
        owner: req.user.id
      });

      // Njibou les ID mtaa les projets mte3ou
      filter.project = {
        $in: projects.map(p => p._id)
      };
    }

    // Nfiltriw les taches 7asb el status
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Nlawjou 3al tache bel titre
    if (req.query.search) {
      filter.titre = {
        $regex: req.query.search,
        $options: "i"
      };
    }

    // Nratbou mel 9dim lel jdid walla bel 3aks
    const sort = req.query.sort === "asc" ? 1 : -1;

    // Njibou les taches mel database
    const tasks = await Task.find(filter)
      .sort({ createdAt: sort });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};


// Afficher une tâche par ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Tache introuvable"
      });
    }

    const project = await Project.findOne({
      _id: task.project,
      owner: req.user.id
    });

    if (!project) {
      return res.status(404).json({
        message: "Tache introuvable"
      });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: "ID invalide" });
  }
};

// Modifier une tâche
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Tache introuvable"
      });
    }

    const project = await Project.findOne({
      _id: task.project,
      owner: req.user.id
    });

    if (!project) {
      return res.status(404).json({
        message: "Tache introuvable"
      });
    }

    // Modifier uniquement les champs autorises
    const { titre, description, status, deadline } = req.body;

    if (titre !== undefined) task.titre = titre;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (deadline !== undefined) task.deadline = deadline;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: "Donnees invalides" });
  }
};

// Supprimer une tâche
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Tache introuvable"
      });
    }

    const project = await Project.findOne({
      _id: task.project,
      owner: req.user.id
    });

    if (!project) {
      return res.status(404).json({
        message: "Tache introuvable"
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Tache supprimee" });
  } catch (error) {
    res.status(400).json({ message: "ID invalide" });
  }
};

// Manager yaffecti tâche lel utilisateur
const assignTask = async (req, res) => {
  try {
    const { assignedUser } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Tache introuvable"
      });
    }

    const user = await User.findById(assignedUser);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable"
      });
    }

    task.assignedUser = user._id;
    await task.save();

    res.json({
      message: "Tache affectee avec succes",
      task
    });
  } catch (error) {
    res.status(400).json({
      message: "ID invalide"
    });
  }
};
module.exports = {
  createTask,
  listTasks,
  getTaskById,
  updateTask,
  deleteTask,
 
  assignTask
};
