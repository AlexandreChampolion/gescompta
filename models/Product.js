const mongoose = require('mongoose');

const product_schema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
  },

  price : {
    type: Number,
    required: true,
  },

  description : {
    type: String,
    required: true,
  },

  technical_description : {
    type: String,
    default: false,
  }

  commercial_description : {
    type: String,
    default: false,
  }

  idCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category_schema',
  }
});

const Product = module.exports = mongoose.model('Product', product_schema);

// Get Books
module.exports.getProduct = (callback, limit) => {
	User.find(callback).limit(limit);
}

// Get Book
module.exports.getProductById = (id, callback) => {
	Product.findById(id, callback);
}

// Add Book
module.exports.addProduct = (product, callback) => {
	Product.create(product, callback);
}

// Update Book
module.exports.updateProduct = (id, product, options, callback) => {
	var query = {_id: id};
	var update = {
		name: Product.name,
		price: Product.price,
		description: Product.description,
		technical_description: Product.technical_description,
		commercial_description: Product.technical_description,
	}
	Product.findOneAndUpdate(query, update, options, callback);
}

// Delete Book
module.exports.removeProduct = (id, callback) => {
	var query = {_id: id};
	Product.remove(query, callback);
}
