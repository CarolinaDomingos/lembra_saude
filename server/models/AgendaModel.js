const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

//This schema will tell the DB what is going to be like.
const agendaDataSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    agenda: [
      {
        id: Number,
        text: String,
        start: String,
        end: String,
        resource: String,
        barColor: String,
        barBackColor: String,
        professionalId: String,
      },
    ],
  },
  {
    collection: "agenda",
    timestamps: true,
  }
);

//Add pre-save validation for unique fields.
agendaDataSchema.plugin(uniqueValidator);
//identify the model
const AgendaModel = mongoose.model("Agenda", agendaDataSchema);
//export it
module.exports = AgendaModel;

/* 
 [
          {
            id: {type: Number, required: true},
            text: {type: String, required: true},
            start: {type: String, required: true},
            end: {type: String, required: true},
            resource: {type: String, required: true},
            barColor: {type: String, required: true},
            barBackColor: {type: String, required: true},
          }
      ]
*/
