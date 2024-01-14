const { model, Schema } = require("mongoose");

let accountSchema = new Schema({
    Guild: String,
    MessageID: String,
    Bank: Number,
    Wallet: Number
});

module.exports = model("Account", accountSchema); 