const express = require("express");
const router = express();

const HealthDetailCtrl = require("../controllers/healthDetail.js");

const authentication = require("../middleware/authentication.js");

router.get("/", HealthDetailCtrl.getHealthDetails);
router.post("/", authentication, HealthDetailCtrl.createHealthDetail);
router.patch("/:id", authentication, HealthDetailCtrl.updateHealthDetail);
router.delete("/:id", authentication, HealthDetailCtrl.deleteHealthDetail);

module.exports = router;
