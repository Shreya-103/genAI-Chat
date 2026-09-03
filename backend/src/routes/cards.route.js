const express = require("express");
const {createCard,getCards} = require("../controllers/cards.controllers");

const router = express.Router();

router.post("/", createCard);
router.get("/", getCards);

module.exports = router;