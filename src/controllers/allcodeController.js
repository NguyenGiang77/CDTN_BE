import AllcodeServices from "../services/AllcodeServices"

//lấy ra thông tin clinic
let HandleGetAllAllcode = async (req, res) => { 
    let id = req.query.id; 
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
            allcodes: []
        })
    }
    let allcodes = await AllcodeServices.getAllAllcodes(id);
    console.log(allcodes);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        allcodes
    })
}
///thêm mới 1 user trên front end
let HandleCreateNewAllcode = async (req, res) => { 
    let message = await AllcodeServices.createNewAllcode(req.body);
    // console.log(message);
    return res.status(200).json(message);
}

//sửa thông tin user trên front end
let HandleEditAllcode = async(req, res) => { 
    
    let message = await AllcodeServices.UpdateAllcodeData(req.body);
    return res.status(200).json(message);
}
// xóa thông tin user trên front end


let HandleDeleteAllcode = async(req, res) => { 
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await AllcodeServices.deleteAllcode(req.body.id);
    return res.status(200).json(message);
}
module.exports = 
{
    HandleGetAllAllcode: HandleGetAllAllcode,
    HandleCreateNewAllcode:HandleCreateNewAllcode,
    HandleEditAllcode: HandleEditAllcode,
    HandleDeleteAllcode:HandleDeleteAllcode
}