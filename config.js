exports.DATABASE_URL = process.env.DATABASE_URL ||
                      global.DATABASE_URL ||
                      "mongodb://maindbuser:mongo14816!@ds145952.mlab.com:45952/wstripsdb"
exports.PORT = process.env.PORT || 8080;