const express = require("express");
const router = express.Router();
const mentorController = require("../controllers/mentorController");

router.post("/", mentorController.createMentor);
router.get("/", mentorController.getMentors);
router.put("/:id", mentorController.updateMentor);
router.delete("/:id", mentorController.deleteMentor);

module.exports = router;
