import express from 'express'
import { razorpayInstance } from '../Razorpay/RazorpayInstance.js'
import crypto from 'crypto'
import PaymentModel from '../Model/PaymentModel.js'

const Router = express.Router()

Router.post('/create', (req, res) => {
    const {name, amount} = req.body
    try{
        const option = {
            amount : Number(amount),
            currency : "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        }
        console.log({"razorpayInstance" : razorpayInstance.key_secret})
        razorpayInstance.orders.create(option, (error, order) => {
            if(error){
                console.log({error})
                return res.status(400).json({
                    message : "Bed Request"
                })
            }
            console.log({order})
            return res.status(200).json({
                message : "Order is created",
                order
            })
        })
    }
    catch (error) {
        console.log({error})
        res.status(500).json({
            message: 'Something went wrong !',
        })
    }
})


Router.post('/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

    try{
        const sign = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSign = crypto.createHmac("sha256", razorpayInstance.key_secret)
                             .update(sign.toString())
                             .digest("hex")
        
        const isAuthanticated = expectedSign === razorpay_signature
        console.log({expectedSign, razorpay_signature})
        if(isAuthanticated){
            const Payment = new PaymentModel({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            })

            await Payment.save()

            return res.status(200).json({
                message : "Payment Successfully"
            })
        }
        return res.status(400).json({
            message : "Order Failed"
        })
    }
    catch (error) {
        return res.status(500).json({
            message: 'Something went wrong !',
        })
    }

})


export default Router