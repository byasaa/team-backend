// Min logic for Author route
const helper = require('../helpers/response');
const productModel = require('../models/product');
const query = require('../helpers/query');

module.exports = {
  getLatestProduct: async (req, res) => {
    try {
      let { sort, page, search } = req.query

      const limit = "2"
      const offset = `${page * limit - limit}`
      const pagination = `LIMIT ${limit} OFFSET ${offset}`
      const baseQuery = `SELECT products.id, products.name, brands.name as brand, categories.name as category, products.description, products.image, products.price, products.color, products.size, products.rating, products.created_at, products.updated_at FROM products INNER JOIN brands ON products.brand_id = brands.id INNER JOIN categories ON products.category_id = categories.id`

      // Ternary operator for query params
      // -----------------------------------
      // Display oldest product
      // Display popular product
      // Display featured product
      // Display latest product

      sort == 'oldest' ? query.product.get = `${baseQuery} ` + `ORDER BY id ASC ` + pagination
        : sort == 'popular' ? query.product.get = `${baseQuery} ` + `ORDER BY products.rating DESC ` + pagination
          : sort == 'featured' ? query.product.get = `${baseQuery} ` + `ORDER BY RAND() ` + pagination
            : search ? query.product.get = `${baseQuery} ` + `WHERE products.name LIKE '%${search}%' ORDER BY id DESC ` + pagination
              : query.product.get = `${baseQuery} ` + `ORDER BY id DESC ` + pagination


      const result = await productModel.getLatestProductModel();
      return helper.response(res, 'success', result, 200);
    } catch (err) {
      console.log(err);
      return helper.response(res, 'failed', 'Something Error', 500);
    }
  },
  getSingleProduct: async (req, res) => {
    try {
      const id = req.params.id
      const result = await productModel.getSingleProduct(id);
      return helper.response(res, 'success', result, 200);
    } catch (err) {
      console.log(err);
      return helper.response(res, 'failed', 'Something Error', 500)
    }
  }
}