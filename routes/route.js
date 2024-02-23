const express = require("express");
const router  = express.Router();
const {registerUser,getUser,askQiestions} = require("../controllers/useControllers")

router.post("/user/register",registerUser);
router.post("/ask",askQiestions)
router.get("/signin/:name",getUser)

module.exports = router
