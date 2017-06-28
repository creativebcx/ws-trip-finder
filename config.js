exports.DATABASE_URL = process.env.DATABASE_URL ||
                      global.DATABASE_URL ||
                      "mongodb://test:test@ds135592.mlab.com:35592/seedtest";
exports.PORT = process.env.PORT || 8080;