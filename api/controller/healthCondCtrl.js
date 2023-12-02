const HealthCondition = require("../models/healthCondModel.js");

const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongodbid.js");

//function to create a HealthCondition
const createHealthCondition = asyncHandler(async (req, res) => {
	try {
		const newHealthCondition = await HealthCondition.create(req.body);
		res.json(newHealthCondition);
	} catch (err) {
		throw new Error(err);
	}
});

//function to update the HealthCondition
const updateHealthCondition = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDBId(id);
	try {
		const updatedHealthCondition = await HealthCondition.findByIdAndUpdate(
			id,
			req.body,
			{
				new: true,
			}
		);
		res.json(updatedHealthCondition);
	} catch (err) {
		throw new Error(err);
	}
});

//function to delete the HealthCondition
const deleteHealthCondition = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDBId(id);
	try {
		const deletedHealthCondition = await HealthCondition.findByIdAndDelete(id);
		res.json(deletedHealthCondition);
	} catch (err) {
		throw new Error(err);
	}
});

//function to get a HealthCondition
const getHealthCondition = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDBId(id);
	try {
		const getHealthCondition = await HealthCondition.findById(id);
		res.json(getHealthCondition);
	} catch (err) {
		throw new Error(err);
	}
});

//function to get all HealthConditions
const getAllHealthConditions = asyncHandler(async (req, res) => {
	try {
		const HealthConditions = await HealthCondition.find();
		res.json(HealthConditions);
	} catch (err) {
		throw new Error(err);
	}
});

module.exports = {
	createHealthCondition,
	updateHealthCondition,
	deleteHealthCondition,
	getHealthCondition,
	getAllHealthConditions,
};
