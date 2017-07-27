exports.DATABASE_URL = process.env.DATABASE_URL ||
                      global.DATABASE_URL ||
                      //"mongodb://localhost/Users/Eric_Donley/Desktop/Projects/ws-trip-finder-private/wstestdb.json"
                      //mongodb://test2:mongodb1234!@ds145952.mlab.com:45952/wstestdb"
                      "mongodb://maindbuser:mongo14816!@ds145952.mlab.com:45952/wstripsdb"
exports.PORT = process.env.PORT || 8080;