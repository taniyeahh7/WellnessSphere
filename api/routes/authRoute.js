const express = require("express");
const {
	createUser,
	loginUserCtrl,
	getAllUser,
	get1User,
	deleteUser,
	updateUser,
	blockUser,
	unblockUser,
	handleRefreshToken,
	logout,
	updatePassword,
	forgotPasswordToken,
	resetPassword,
	loginAdminCtrl,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdminCtrl);
router.get("/all-users", getAllUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/:id", authMiddleware, isAdmin, get1User);
router.delete("/:id", deleteUser);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
