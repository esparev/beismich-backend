const express = require('express');
const PlayersService = require('../services/players.service');

const router = express.Router();
const service = new PlayersService();

/**
 * Players main route
 * Shows all Players
 */
router.get('/', async (req, res, next) => {
	try {
		const players = await service.find();

		res.status(200).json(players);
	} catch (error) {
		next(error);
	}
});

/**
 * Individual Player route
 * Shows the Player with the provided id
 */
router.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const player = await service.findOne(id);

		res.status(200).json(player);
	} catch (error) {
		next(error);
	}
});

/**
 * Add Player route
 * Creates a Player with the provided data in body
 */
router.post('/', async (req, res) => {
	const body = req.body;
	const newPlayer = await service.create(body);

	res.status(201).json({
		newPlayer,
		message: 'player created',
	});
});

/**
 * Edit Player route
 * Updates partial or entire data of the Player with the provided id
 */
router.patch('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const player = await service.update(id, body);

		res.status(200).json({
			player,
			message: 'jugador actualizado',
		});
	} catch (error) {
		next(error);
	}
});

/**
 * Delete Player route
 * Deletes the Player with the provided id
 */
router.delete('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const player = await service.delete(id);

		res.status(200).json({
			player,
			message: 'jugador eliminado',
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
