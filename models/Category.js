const mongoose = require('mongoose');

const category_schema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
  },

  description : {
    type: String,
    required: true,
  },
});

const Category = module.exports = mongoose.model('Category', category_schema);

// Get Books
module.exports.getCategory = (callback, limit) => {
	Category.find(callback).limit(limit);
}

// Get Book
module.exports.getCategoryById = (id, callback) => {
	Category.findById(id, callback);
}

// Add Book
module.exports.addCategory = (product, callback) => {
	Category.create(product, callback);
}

// Update Book
module.exports.updateCategory = (id, product, options, callback) => {
	var query = {_id: id};
	var update = {
		name: Category.name,
		description: Category.description,
	}
	Category.findOneAndUpdate(query, update, options, callback);
}

// Delete Book
module.exports.removeProduct = (id, callback) => {
	var query = {_id: id};
	CAtegory.remove(query, callback);
}
