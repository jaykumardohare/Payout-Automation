const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");

router.post("/", sessionController.createSession);
router.get("/", sessionController.getSessions);
router.put("/:id", sessionController.updateSession);
router.delete("/:id", sessionController.deleteSession);
router.get("/:id/receipt", sessionController.generateReceipt);
router.patch("/:id/status", sessionController.updateSessionStatus);



module.exports = router;
