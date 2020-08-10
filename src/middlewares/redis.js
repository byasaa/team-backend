const helper = require('../helpers/response')
const redis = require('redis');
const REDIS_PORT = 6379;
const client = redis.createClient(REDIS_PORT);

const cacheProductDetail = (req, res, next) => {
  const { id } = req.params
  client.hgetall('product' + id, (err, data) => {
    if (err) throw err;
    if (data != null) {
      console.log('Hello from Redis')
      return helper.response(res, 'success', data, 200);
    } else {
      next();
      // Jika tidak ada di cache local, maka ambil data dari controller
    }
  })
}

module.exports = { cacheProductDetail }