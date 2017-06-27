const uuid = require('uuid');

function StorageException(message) {
	this.message = message;
	this.name = "StorageException";
}

const searchResults = {
	create: function(date, ability) {
		console.log('Creating new WS Trip');
		const item = {
			date: date,
			id: uuid.v4(),
			ability: ability
		};
		this.items[item.id] = item;
		return item;
	},
	get: function() {
		console.log('Retrieving WS Trip Record');
		return Object.keys(this.items).map(key => this.items[key])
	},
	delete: function(id) {
		console.log('Deleting WS Trip Record \'${id}\'');
	},
	update: function(updatedItem) {
		console.log('Updating WS Trip Record \'${updatedItem.id}\'');
		const {id} = updatedItem;
		if (!(id in this.items)) {
			throw StorageException(
				'Cannot update item \'${id}\' because it does not exist.')
		}
		this.items[updatedItem.id] = updatedItem;
		return updatedItem;
	}
};

function createNewTrip() {
	const storage = Object.create(searchResults);
	storage.items = {};
	return storage;
}

module.exports = {
	searchResults: createNewTrip()
}












