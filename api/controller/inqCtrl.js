const Inquiry = require("../models/inqModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongodbid.js");

//function to create a inquiry
const createInquiry = asyncHandler(async (req, res) => {
	try {
		const newInquiry = await Inquiry.create(req.body);
		res.json(newInquiry);
	} catch (err) {
		throw new Error(err);
	}
});

//function to update the inquiry
const updateInquiry = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDBId(id);
	try {
		const updatedInquiry = await Inquiry.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.json(updatedInquiry);
	} catch (err) {
		throw new Error(err);
	}
});

//function to delete the inquiry
const deleteInquiry = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDBId(id);
	try {
		const deletedInquiry = await Inquiry.findByIdAndDelete(id);
		res.json(deletedInquiry);
	} catch (err) {
		throw new Error(err);
	}
});

//function to get a inquiry
const getInquiry = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDBId(id);
	try {
		const getInquiry = await Inquiry.findById(id);
		res.json(getInquiry);
	} catch (err) {
		throw new Error(err);
	}
});

//function to get all category
const getAllInquiries = asyncHandler(async (req, res) => {
	try {
		const inquiries = await Inquiry.find();
		res.json(inquiries);
	} catch (err) {
		throw new Error(err);
	}
});

module.exports = {
	createInquiry,
	updateInquiry,
	deleteInquiry,
	getInquiry,
	getAllInquiries,
};
