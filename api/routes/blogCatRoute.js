const express = require("express");
const {
	createBlogCategory,
	updateBlogCategory,
	deleteBlogCategory,
	getBlogCategory,
	getAllBlogCategory,
} = require("../controller/blogCatCtrl");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlogCategory);
router.put("/:id", authMiddleware, isAdmin, updateBlogCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteBlogCategory);
router.get("/getAllBlogCategory", getAllBlogCategory);
router.get("/:id", getBlogCategory);

module.exports = router;
