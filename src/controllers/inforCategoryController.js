import InforCategoryServices from "../services/InforCategoryServices"
let getAllInforCategory = async (req, res) => { 
    try {
        let infor = await InforCategoryServices.getAllInforCategory();
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getDetailInforCategoryById = async (req, res) => { 
    try {
        let infor = await InforCategoryServices.getDetailInforCategoryById(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getExtraInforCategortById = async(req, res) => { 
    try {
         let infor = await InforCategoryServices.getExtraInforCategortById(req.query.id); // query để lấy ra dữ liệu có tham số truyền vào (với Get với Post dùng req.body)
         return res.status(200).json(infor);
     } catch (e) { 
         console.log(e);
         return res.status(200).json({
             errCode: -1,
             errMessage: "Error from the server"
         })
     }    
 }

//lấy ra thông tin InforCategory
let HandleGetAllInforCategory = async (req, res) => { 
    let id = req.query.id; 
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
            inforCategories: []
        })
    }
    let inforCategories = await InforCategoryServices.getAllInforCategories(id);
    console.log(inforCategories);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        inforCategories
    })
}
///thêm mới 1 user trên front end
let HandleCreateNewInforCategory = async (req, res) => { 
    let message = await InforCategoryServices.createNewInforCategory(req.body);
    // console.log(message);
    return res.status(200).json(message);
}

//sửa thông tin user trên front end
let HandleEditInforCategory = async(req, res) => { 
    
    let message = await InforCategoryServices.UpdateInforCategoryData(req.body);
    return res.status(200).json(message);
}
// xóa thông tin user trên front end


let HandleDeleteInforCategory = async(req, res) => { 
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await InforCategoryServices.deleteInforCategory(req.body.id);
    return res.status(200).json(message);
}
module.exports = 
{

    getAllInforCategory: getAllInforCategory,
    getDetailInforCategoryById: getDetailInforCategoryById,
    HandleGetAllInforCategory: HandleGetAllInforCategory,
    HandleCreateNewInforCategory:HandleCreateNewInforCategory,
    HandleEditInforCategory: HandleEditInforCategory,
    HandleDeleteInforCategory:HandleDeleteInforCategory,
    getExtraInforCategortById:getExtraInforCategortById
}