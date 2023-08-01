import ClinicServices from "../services/ClinicServices"
let getAllClinic = async (req, res) => { 
    try {
        let infor = await ClinicServices.getAllClinic();
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getDetailClinicById = async (req, res) => { 
    try {
        let infor = await ClinicServices.getDetailClinicById(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
//lấy ra thông tin clinic
let HandleGetAllClinic = async (req, res) => { 
    let id = req.query.id; 
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
            clinics: []
        })
    }
    let clinics = await ClinicServices.getAllClinics(id);
    console.log(clinics);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        clinics
    })
}
///thêm mới 1 user trên front end
let HandleCreateNewClinic = async (req, res) => { 
    let message = await ClinicServices.createNewClinic(req.body);
    // console.log(message);
    return res.status(200).json(message);
}

//sửa thông tin user trên front end
let HandleEditClinic = async(req, res) => { 
    
    let message = await ClinicServices.UpdateClinicData(req.body);
    return res.status(200).json(message);
}
// xóa thông tin user trên front end


let HandleDeleteClinic = async(req, res) => { 
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await ClinicServices.deleteClinic(req.body.id);
    return res.status(200).json(message);
}
let filterUserByNameClinic = async (req,res) =>
{
    try {
        let filter = req.params.filterName;
        let infor = await ClinicServices.filterUserByNameClinic(filter); // query để lấy ra dữ liệu có tham số truyền vào (với Get với Post dùng req.body)
        return res.status(200).json(infor);
    } catch (e) { 
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the server"
        })
    } 
}
module.exports = 
{

    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
    HandleGetAllClinic: HandleGetAllClinic,
    HandleCreateNewClinic:HandleCreateNewClinic,
    HandleEditClinic: HandleEditClinic,
    HandleDeleteClinic:HandleDeleteClinic,
    filterUserByNameClinic:filterUserByNameClinic
}