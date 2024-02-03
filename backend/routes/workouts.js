const express = require('express')

const router = express.Router()

router.get('/',(req,resp)=>{
    resp.json({msgs:'GET all workouts'})
})

router.get('/:id',(req,resp)=>{
    resp.json({msgs:'GET a SINGLE workout'})
} )

router.post('/',(req,resp)=>{
    resp.json({msgs:'POST a workout'})
})

router.delete('/:id',(req,resp)=>{
    resp.json({msgs:'DELETE a workout'})
})

router.patch('/:id',(req,resp)=>{
    resp.json({msgs:'UPDATE a workout'})
})

module.exports = router