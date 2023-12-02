const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const validateMongoDBId = require("../utils/validateMongodbid");
const { cloudinaryUploadImg } = require("../utils/cloudinary");

//function to create a blog
const createBlog = asyncHandler(async (req, res) => {
	try {
		const newBlog = await Blog.create(req.body);
		res.json({
			status: "success",
			newBlog,
		});
	} catch (err) {
		throw new Error(err);
	}
});

//function to update a blog
const updateBlog = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDBId(id);
	try {
		const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.json(updatedBlog);
	} catch (err) {
		throw new Error(err);
	}
});

//function to get a blog and update views
const getBlog = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDBId(id);
	try {
		const reqBlog = await Blog.findById(id)
			.populate("likes")
			.populate("dislikes");
		const updatedateViews = await Blog.findByIdAndUpdate(
			id,
			{
				$inc: { numViews: 1 },
			},
			{ new: true }
		);
		res.json(reqBlog);
	} catch (err) {
		throw new Error(err);
	}
});

//function to get all blog
const getAllBlogs = asyncHandler(async (req, res) => {
	try {
		const blogs = await Blog.find();
		res.json(blogs);
	} catch (err) {
		throw new Error(err);
	}
});

//function to delete a blog
const deleteBlog = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDBId(id);
	try {
		const deletedBlog = await Blog.findByIdAndDelete(id);
		res.json(deletedBlog);
	} catch (err) {
		throw new Error(err);
	}
});

//function to like the blog
const likeTheBlog = asyncHandler(async (req, res) => {
	const { blogId } = req.body;
	console.log(blogId);
	validateMongoDBId(blogId);
	// Find the blog which you want to be liked
	const blog = await Blog.findById(blogId);
	// find the login user
	const loginUserId = req?.user?._id;
	// find if the user has liked the blog
	const isLiked = blog?.isLiked;
	// find if the user has disliked the blog
	const alreadyDisliked = blog?.dislikes?.find(
		(userId) => userId?.toString() === loginUserId?.toString()
	);
	if (alreadyDisliked) {
		const blog = await Blog.findByIdAndUpdate(
			blogId,
			{
				$pull: { dislikes: loginUserId },
				isDisliked: false,
			},
			{ new: true }
		);
		res.json(blog);
	}
	if (isLiked) {
		const blog = await Blog.findByIdAndUpdate(
			blogId,
			{
				$pull: { likes: loginUserId },
				isLiked: false,
			},
			{ new: true }
		);
		res.json(blog);
	} else {
		const blog = await Blog.findByIdAndUpdate(
			blogId,
			{
				$push: { likes: loginUserId },
				isLiked: true,
			},
			{ new: true }
		);
		res.json(blog);
	}
});

//function to dislike the blog
const dislikeTheBlog = asyncHandler(async (req, res) => {
	const { blogId } = req.body;
	validateMongoDBId(blogId);
	// Find the blog which you want to be liked
	const blog = await Blog.findById(blogId);
	// find the login user
	const loginUserId = req?.user?._id;
	// find if the user has liked the blog
	const isDisliked = blog?.isDisliked;
	// find if the user has disliked the blog
	const alreadyLiked = blog?.likes?.find(
		(userId) => userId?.toString() === loginUserId?.toString()
	);
	if (alreadyLiked) {
		const blog = await Blog.findByIdAndUpdate(
			blogId,
			{
				$pull: { likes: loginUserId },
				isLiked: false,
			},
			{ new: true }
		);
		res.json(blog);
	}
	if (isDisliked) {
		const blog = await Blog.findByIdAndUpdate(
			blogId,
			{
				$pull: { likes: loginUserId },
				isDisliked: false,
			},
			{ new: true }
		);
		res.json(blog);
	} else {
		const blog = await Blog.findByIdAndUpdate(
			blogId,
			{
				$push: { dislikes: loginUserId },
				isDisliked: true,
			},
			{ new: true }
		);
		res.json(blog);
	}
});

//function to upload images
const uploadImages = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDBId(id);
	try {
		const uploader = (path) => cloudinaryUploadImg(path, "images");
		const urls = [];
		const files = req.files;
		for (const file of files) {
			const { path } = file;
			const newPath = await uploader(path);
			urls.push(newPath);
			fs.unlinkSync(path);
		}
		const findBlog = await Blog.findByIdAndUpdate(
			id,
			{
				images: urls.map((file) => {
					return file;
				}),
			},
			{
				new: true,
			}
		);
		res.json(findBlog);
	} catch (err) {
		throw new Error(err);
	}
});

module.exports = {
	createBlog,
	updateBlog,
	getBlog,
	getAllBlogs,
	deleteBlog,
	likeTheBlog,
	dislikeTheBlog,
	uploadImages,
};
