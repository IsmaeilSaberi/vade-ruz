const express = require("express");
const router = express();

const HealthDetailCtrl = require("../controllers/healthDetail.js");

const authentication = require("../middleware/authentication.js");

router.get("/", HealthDetailCtrl.getHealthDetails);
router.post("/", HealthDetailCtrl.createHealthDetail);
router.patch("/:id", HealthDetailCtrl.updateHealthDetail);
router.delete("/:id", HealthDetailCtrl.deleteHealthDetail);

module.exports = router;
