const blogCategory = require("../models/blogCatModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongodbid.js");

//function to create a category
const createBlogCategory = asyncHandler(async (req, res) => {
	try {
		const newCategory = await blogCategory.create(req.body);
		res.json(newCategory);
	} catch (err) {
		throw new Error(err);
	}
});

//function to update the category
const updateBlogCategory = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDBId(id);
	try {
		const updatedCategory = await blogCategory.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.json(updatedCategory);
	} catch (err) {
		throw new Error(err);
	}
});

//function to delete the category
const deleteBlogCategory = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDBId(id);
	try {
		const deletedCategory = await blogCategory.findByIdAndDelete(id);
		res.json(deletedCategory);
	} catch (err) {
		throw new Error(err);
	}
});

//function to get a category
const getBlogCategory = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDBId(id);
	try {
		const getBlogCategory = await blogCategory.findById(id);
		res.json(getBlogCategory);
	} catch (err) {
		throw new Error(err);
	}
});

//function to get all category
const getAllBlogCategory = asyncHandler(async (req, res) => {
	try {
		const blogCategories = await blogCategory.find();
		res.json(blogCategories);
	} catch (err) {
		throw new Error(err);
	}
});

module.exports = {
	createBlogCategory,
	updateBlogCategory,
	deleteBlogCategory,
	getBlogCategory,
	getAllBlogCategory,
};
