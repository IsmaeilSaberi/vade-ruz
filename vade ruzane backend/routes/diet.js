const express = require("express");
const router = express();

const DietCtrl = require("../controllers/diet.js");

const authentication = require("../middleware/authentication.js");

router.get("/", DietCtrl.getDietPost);
router.post("/", authentication, DietCtrl.createDietPost);
router.patch("/:id", authentication, DietCtrl.updateDietPost);
router.patch("/:id/likeDietPost", authentication, DietCtrl.likeDietPost);
router.delete("/:id", authentication, DietCtrl.deleteDietPost);

module.exports = router;
