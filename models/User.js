const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
  firstname : {
    type: String,
    required: true,
  },

  lastname : {
    type: String,
    required: true,
  },

  birthdate : {
    type: Number,
    required: true,
  },

  email : {
    type: String,
    required: true,
  },

  password : {
    type: String,
    required: true,
  },

  isCompany : {
    type: Boolean,
    default: false,
  }

  idGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'group_schema',
  }
});

const User = module.exports = mongoose.model('User', user_schema);

var apiRoutes = express.Router();

// Get Books
module.exports.getUsers = (callback, limit) => {
	User.find(callback).limit(limit);
}

// Get Book
module.exports.getUserById = (id, callback) => {
	User.findById(id, callback);
}

// Add Book
module.exports.addUser = (user, callback) => {
	User.create(user, callback);
  Address.create(address, callback);
}

// Update Book
module.exports.updateUser = (id, user, options, callback) => {
	var query = {_id: id};
	var update = {
		firstname: User.firstname,
		lastname: User.lastname,
		birthdate: User.birthdate,
		login: User.login,
		password: User.password,
		buy_url: User.buy_url
	}
	User.findOneAndUpdate(query, update, options, callback);
}

// Delete Book
module.exports.removeUser = (id, callback) => {
	var query = {_id: id};
	User.remove(query, callback);
}

apiRoutes.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token with only our given payload
    // we don't want to pass in the entire user since that has the password
    const payload = {
      admin: user.admin
    };
        var token = jwt.sign(payload, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});
