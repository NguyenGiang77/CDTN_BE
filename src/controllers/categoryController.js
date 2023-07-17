import CategoryServices from "../services/CategoryServices"
let getAllCategory = async (req, res) => { 
    try {
        let infor = await CategoryServices.getAllCategory();
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getDetailCategoryById = async (req, res) => { 
    try {
        let infor = await CategoryServices.getDetailCategoryById(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
//lấy ra thông tin Category
let HandleGetAllCategory = async (req, res) => { 
    let id = req.query.id; 
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
            categories: []
        })
    }
    let categories = await CategoryServices.getAllCategories(id);
    console.log(categories);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        categories
    })
}
///thêm mới 1 user trên front end
let HandleCreateNewCategory = async (req, res) => { 
    let message = await CategoryServices.createNewCategory(req.body);
    // console.log(message);
    return res.status(200).json(message);
}

//sửa thông tin user trên front end
let HandleEditCategory = async(req, res) => { 
    
    let message = await CategoryServices.UpdateCategoryData(req.body);
    return res.status(200).json(message);
}
// xóa thông tin user trên front end


let HandleDeleteCategory = async(req, res) => { 
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await CategoryServices.deleteCategory(req.body.id);
    return res.status(200).json(message);
}
module.exports = 
{
    getAllCategory: getAllCategory,
    getDetailCategoryById: getDetailCategoryById,
    HandleGetAllCategory: HandleGetAllCategory,
    HandleCreateNewCategory:HandleCreateNewCategory,
    HandleEditCategory: HandleEditCategory,
    HandleDeleteCategory:HandleDeleteCategory
}