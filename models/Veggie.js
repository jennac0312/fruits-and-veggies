const mongoose = require("mongoose")

const veggieSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        color: { type: String, required: true },
        readyToEat: Boolean
    },
    {
        timestamps : true
    }
)

const Veggie = mongoose.model( 'Veggie', veggieSchema )

module.exports = Veggie