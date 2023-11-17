const express  = require("express");
const router = express.Router();

const {sendOtp,create} = require("../controller/auth");

router.post("/create",sendOtp);
router.post("/createUser",create);



module.exports = router;



