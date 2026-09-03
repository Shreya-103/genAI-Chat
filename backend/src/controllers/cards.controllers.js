const Card = require("../models/cards.models");

async function createCard(req, res) {
    try {
        const { prompt, answer, date } = req.body;

        const card = await Card.create({
            prompt,
            answer,
            date
        });

        res.status(201).json(card);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to save card"
        });
    }
}

async function getCards(req, res) {
    try {
        const cards = await Card.find().sort({ _id: 1 });
        res.status(200).json(cards);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get cards"
        });
    }
}

module.exports = {createCard, getCards};