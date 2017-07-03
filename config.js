exports.DATABASE_URL = process.env.DATABASE_URL ||
                      global.DATABASE_URL ||
                      "mongodb://localhost/downloads/seed-data.json"
exports.PORT = process.env.PORT || 8080;

//mongoimport --db wstestdb --collection trippackages --drop --file ~/Downloads/seed-data.json --host ds145952.mlab.com --port 45952  -u test -p test

// secure-bastion-80953
// https://secure-bastion-80953.herokuapp.com/ | https://git.heroku.com/secure-bastion-80953.git


// don't do login yourself - login with another service - twitch login - google login - fb login - gitHub login
// forgot other password not of their own
// basic password reset (levels of security)
// proper hasing of passwords
// where are your password tokens generated
// security not just obscurity