const { response } = require('../helpers/response')
const { editProduct, deleteProduct, insertProduct, getProductModel } = require('../models/product')

module.exports = {
    getProduct: async (req, res) => {
        let {sort, search, color, size, category, limit, page} = req.query
        let order = sort == 'oldest' ? 'created_at ASC'
        : sort == 'newest' ? 'created_at DESC'
        : sort == 'popular' ? 'rating DESC'
        : sort == 'price-low' ? 'price ASC'
        : sort == 'price-high' ? 'price DESC'
        : 'created_at DESC'
        search = search || ''
        color = color || ''
        size = size || ''
        category = category || ''
        limit = limit || 10
        page = page || 1
        try {
            const result = await getProductModel(search, color, size, category, order, limit, page)
            if(result[0]){
                return response(res, 'success', result, 200)
            }
            return response(res, 'fail', 'Product Null', 404)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    },
    addProduct: async (req, res) => {
        const setData = {
            ...req.body
        }
        if (req.file) {
            setData.image = req.file.filename
        }
        try {
            const result = await insertProduct(setData)
            return response(res, 'success', result, 201)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    },
    editProduct: async (req, res) => {
        const setData = {
            ...req.body
        }
        if (req.file) {
            setData.image = req.file.filename
        }
        const id = req.params.id
        setData.updated_at = new Date()
        try {
            const result = await editProduct(setData, id)
            return response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    },
    deleteProduct: async (req, res) => {
        const id = req.params.id
        try {
            const result = await deleteProduct(id)
            return response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return response(res, 'fail', 'Something Wrong I can Feel it', 500)
        }
    },
}