const express = require('express');
const router = express.Router({ mergeParams: true });

// Admins main route
router.get('/', (req, res) => {
	const admins = [];
	const { size } = req.query;
	const limit = size || 5;

	for (let i = 0; i < limit; i++) {
		admins.push({
			name: `Admin ${i}`,
		});
	}

	res.json(admins);
});

// Add admin route
router.post('/', (req, res) => {
	const body = req.body;
	res.json({
		data: body,
		message: 'admin creado',
	});
});

// Individual admin route
router.get('/:adminId', (req, res) => {
	const moreAdmins = [];
	const { size } = req.query;
	const { adminId } = req.params;
	const limit = size || 5;

	for (let i = 0; i < limit; i++) {
		moreAdmins.push({
			adminId,
			name: `Otro admin ${i}`,
		});
	}

	res.json({
		adminId,
		name: 'Admin 1',
		moreAdmins,
	});
});

// Edit admin route
router.patch('/:adminId', (req, res) => {
	const { adminId } = req.params;
	const { body } = req.body;
	res.json({
		adminId,
		data: body,
		message: 'admin actualizado',
	});
});

// Delete admin route
router.delete('/:adminId', (req, res) => {
	const { adminId } = req.params;
	res.json({
		adminId,
		message: 'admin eliminado',
	});
});

module.exports = router;