exports.DATABASE_URL = process.env.DATABASE_URL ||
                      global.DATABASE_URL ||
                      //"mongodb://localhost/downloads/seed-data.json"//
                      "mongodb://test:test@ds145302.mlab.com:45302/wstestdb";
exports.PORT = process.env.PORT || 8080;

//mongoimport --db wstestdb --collection TripPackage --drop --file ~/Downloads/seed-data.json --host ds145302.mlab.com --port 45302  -u test -p test