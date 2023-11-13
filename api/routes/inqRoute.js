const express = require("express");
const {
	createInquiry,
	updateInquiry,
	deleteInquiry,
	getInquiry,
	getAllInquiries,
} = require("../controller/inqCtrl");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", createInquiry);
router.put("/:id", authMiddleware, isAdmin, updateInquiry);
router.delete("/:id", authMiddleware, isAdmin, deleteInquiry);
router.get("/getAllInquiries", getAllInquiries);
router.get("/:id", getInquiry);

module.exports = router;
