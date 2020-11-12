const router = require('express').Router()
const { Inventory } = require('../db')

router.get('/', async (req,res,next) => {
    try {
        const allInventory = await Inventory.findAll()
        res.status(200).json(allInventory)
    } catch (err) {
        next(err)
    }
});

module.exports = router;