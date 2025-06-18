import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    storeName: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;