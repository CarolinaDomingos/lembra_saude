const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//This schema will tell the DB what is going to be like.
const foodPlanSchema = new Schema(
  {
    plan: [
      {
        title: String,
        hora: String,
        alimentos: String,
      },
    ],
    userId: {
      type: String,
      required: true,
    },
  },
  {
    collection: "foodplan",
    timestamps: true,
  }
);

//export it
//identify the model
const foodPlanModel = mongoose.model("FoodPlan", foodPlanSchema);
//export it
module.exports = foodPlanModel;
