const discountModel= require('../entity-models/discount')
const router = require("express").Router();

router.post('/addcoupen',async(req,res)=>{
    let {coupen,discountpercent} = req.body
    let newCoupen = new discountModel({coupen,discountpercent})
    const coupenCheck = await discountModel.findOne({coupen:req.body.coupen})
    if(coupenCheck){
        res.status(500).json({ success: false });
    }
    else {
        coupen = await newCoupen.save()
        if (!coupen) return res.status(400).send("the coupen cannot be created!");

        res.send(coupen)
    }
})

router.get('/',async (req,res)=>{
    const coupenList = await discountModel.find()
    if(!coupenList){
        res.status(500).json({ success: false });
    }
    res.send(coupenList)
})

router.post('/usecoupen',async(req,res)=>{
    let coupen = req.body.coupen
    const coupenfind=await discountModel.find({coupen:req.body.coupen})
    if(!coupenfind){
        return res.status(400).send("The coupon not found");
    }
    else{
        res.send(coupenfind)
    }
    })

module.exports= router