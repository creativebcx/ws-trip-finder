exports.DATABASE_URL = process.env.DATABASE_URL ||
                      global.DATABASE_URL ||
                      "mongodb://localhost/downloads/seed-data.json"
exports.PORT = process.env.PORT || 8080;

//mongoimport --db wstestdb --collection trippackages --drop --file ~/Downloads/seed-data.json --host ds145952.mlab.com --port 45952  -u test -p test

// secure-bastion-80953
// https://secure-bastion-80953.herokuapp.com/ | https://git.heroku.com/secure-bastion-80953.git
