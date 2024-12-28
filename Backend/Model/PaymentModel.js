import mongoose from "mongoose";
import { Schema} from "mongoose";

const PaymentModel = new Schema({
    razorpay_order_id : {
        type : String,
        require : true
    },
    razorpay_payment_id : {
        type : String,
        require : true
    },
    razorpay_signature : {
        type : String,
        require : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    } 
})

export default mongoose.model('Payment', PaymentModel); 