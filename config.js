exports.DATABASE_URL = process.env.DATABASE_URL ||
                      global.DATABASE_URL ||
                      "mongodb://localhost/Users/Eric_Donley/Desktop/Projects/ws-trip-finder-private/wstestdb.json"
exports.PORT = process.env.PORT || 8080;