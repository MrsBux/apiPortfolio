const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();
const actuCtrl = require("../controllers/actus");

router.post("/", auth, actuCtrl.createActu);

router.put("/:id", auth, actuCtrl.modifyActu);

router.delete("/:id", auth, actuCtrl.deleteActu);

router.get("/:id", actuCtrl.getOneActu);

router.get("/", actuCtrl.getAllActu);

module.exports = router;
