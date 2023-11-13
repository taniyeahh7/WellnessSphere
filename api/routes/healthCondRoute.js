const express = require("express");
const {
	createHealthCondition,
	updateHealthCondition,
	deleteHealthCondition,
	getHealthCondition,
	getAllHealthConditions,
} = require("../controller/healthCondCtrl");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createHealthCondition);
router.put("/:id", authMiddleware, isAdmin, updateHealthCondition);
router.delete("/:id", authMiddleware, isAdmin, deleteHealthCondition);
router.get("/getAllHealthConditions", getAllHealthConditions);
router.get("/:id", getHealthCondition);

module.exports = router;
