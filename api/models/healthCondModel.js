import mongoose from "mongoose";

const healthConditionSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		ingredientsAvoid: {
			type: Array,
			required: true,
		},
		ingredientsBeneficial: {
			type: Array,
			required: true,
		},
	},
	{ timestamps: true }
);

const healthCondition = mongoose.model(
	"healthCondition",
	healthConditionSchema
);

export default healthCondition;
