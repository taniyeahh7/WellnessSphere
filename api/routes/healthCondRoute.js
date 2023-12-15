import express from "express";
import {
	createHealthCondition,
	deleteHealthCondition,
	updateHealthCondition,
	getHealthCondition,
	getAllHealthConditions,
} from "../controllers/healthCondCtrl.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createHealthCondition);
router.delete("/delete/:id", verifyToken, deleteHealthCondition);
router.post("/update/:id", verifyToken, updateHealthCondition);
router.get("/get/:id", getHealthCondition);
router.get("/get", getAllHealthConditions);

export default router;
