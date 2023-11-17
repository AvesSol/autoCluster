const express  = require("express");
const router = express.Router();

const {getAllInfoEmp,getAllInfoVisi,updateVisi} = require("../controller/admin");


router.get("/getAllInfoEmp",getAllInfoEmp);

// Visitors Routes only 
router.get("/getAllInfoVisi",getAllInfoVisi);
router.put("/updateVisi/:id",updateVisi);



module.exports = router;



