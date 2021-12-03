const faker = require('faker/locale/es_MX');
const boom = require('@hapi/boom');

/**
 * Service layer with CRUD methods
 */
class TeamsService {
	constructor() {
		this.teams = [];
		this.generate();
	}

	/**
	 * Generates random teams
	 */
	generate() {
		const limit = 5;

		for (let i = 0; i < limit; i++) {
			this.teams.push({
				id: `${i}`,
				name: faker.name.firstName(),
				manager: `${faker.name.firstName()} ${faker.name.lastName()}`,
				logo: faker.image.imageUrl(),
			});
		}
	}

	/**
	 * Finds all teams in the object array
	 * @returns all the teams in the array
	 */
	async find() {
		const teams = this.teams;

		if (!teams) {
			throw boom.notFound('no hay equipos');
		}

		return teams;
	}

	/**
	 * Finds the team with the provided id
	 * @param {*} id team id
	 * @returns team that matches the id
	 */
	async findOne(id) {
		const team = this.teams.find((item) => item.id === id);

		if (!team) {
			throw boom.notFound('equipo no encontrado');
		}

		return team;
	}

	/**
	 * Creates a team with the provided data
	 * @param {*} data team data
	 * @returns team created
	 */
	async create(data) {
		const newTeam = {
			id: `${this.teams.length}`,
			...data,
		};
		this.teams.push(newTeam);
		return newTeam;
	}

	/**
	 * Updates partially the team with the provided id
	 * @param {*} id team id
	 * @param {*} changes team data to update
	 * @returns team updated
	 */
	async update(id, changes) {
		const index = this.teams.findIndex((item) => item.id === id);
		const team = this.teams[index];

		if (index === -1) {
			throw boom.notFound('equipo no encontrado');
		}

		this.teams[index] = {
			...team,
			...changes,
		};
		return this.teams[index];
	}

	/**
	 * Deletes the team with the provided id
	 * @param {*} id team id
	 * @returns team deleted
	 */
	async delete(id) {
		const index = this.teams.findIndex((item) => item.id === id);

		if (index === -1) {
			throw boom.notFound('equipo no encontrado');
		}

		this.teams.splice(index, 1);
		return { id };
	}
}

module.exports = TeamsService;