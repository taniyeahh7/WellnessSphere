const express = require("express");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
const {
	createBlog,
	updateBlog,
	getBlog,
	getAllBlogs,
	deleteBlog,
	likeTheBlog,
	dislikeTheBlog,
	uploadImages,
} = require("../controller/blogCtrl");
const { blogImgResize, uploadPhoto } = require("../middleware/uploadImages");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlog);
router.put(
	"/upload/:id",
	authMiddleware,
	isAdmin,
	uploadPhoto.array("images", 10),
	blogImgResize,
	uploadImages
);
router.put("/likes", authMiddleware, likeTheBlog);
router.put("/dislikes", authMiddleware, dislikeTheBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlogs);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;
