const Category = require('../models/category');

const categoryController = {

    createtutoList : async(request, response) => {
        try{
            const categories = await Category.categoryList();
            response.status(200).json({categories});
        } catch(err){
            console.error(err);
        }
    },
}

module.exports = categoryController ;