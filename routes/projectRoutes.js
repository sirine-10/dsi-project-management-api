const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  listProjects

} = require("../controllers/projectController");

router.use(authMiddleware);

router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
router.get("/", listProjects);


module.exports = router;