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

router.post("/create", createHealthCondition);
router.delete("/delete/:id", deleteHealthCondition);
router.post("/update/:id", updateHealthCondition);
router.get("/get/:id", getHealthCondition);
router.get("/getAll", getAllHealthConditions);

export default router;
