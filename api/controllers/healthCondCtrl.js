import HealthCondition from "../models/healthCondModel.js";
import { errorHandler } from "../utils/error.js";

export const createHealthCondition = async (req, res, next) => {
	try {
		const healthCondition = await HealthCondition.create(req.body);
		return res.status(201).json(healthCondition);
	} catch (error) {
		next(error);
	}
};

export const deleteHealthCondition = async (req, res, next) => {
	const healthCondition = await HealthCondition.findById(req.params.id);
	if (!healthCondition) {
		return next(errorHandler(404, "Health Condition not found!"));
	}
	if (req.user.id !== healthCondition.userRef) {
		return next(
			errorHandler(401, "You can only delete your own health condition!")
		);
	}
	try {
		await HealthCondition.findByIdAndDelete(req.params.id);
		res.status(200).json("Health Condition has been deleted!");
	} catch (error) {
		next(error);
	}
};

export const updateHealthCondition = async (req, res, next) => {
	const healthCondition = await HealthCondition.findById(req.params.id);
	if (!healthCondition) {
		return next(errorHandler(404, "Health Condition not found!"));
	}
	try {
		const updatedhealthCondition = await HealthCondition.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.status(200).json(updatedhealthCondition);
	} catch (error) {
		next(error);
	}
};

export const getHealthCondition = async (req, res, next) => {
	try {
		const healthCondition = await HealthCondition.findById(req.params.id);
		if (!healthCondition) {
			return next(errorHandler(404, "Health Condition not found!"));
		}
		res.status(200).json(healthCondition);
	} catch (error) {
		next(error);
	}
};

// Function to fetch all listings
export const getAllHealthConditions = async (req, res, next) => {
	try {
		const sort = req.query.sort || "createdAt";
		const order = req.query.order || "desc";

		const healthConditions = await HealthCondition.find({}).sort({
			[sort]: order,
		});

		return res.status(200).json(healthConditions);
	} catch (error) {
		next(error);
	}
};
