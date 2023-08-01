import SpecialtyServices from "../services/SpecialtyServices"
let createSpecialty = async (req, res) => { 
    try {
        let infor = await SpecialtyServices.createSpecialty(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
//lấy ra thông tin Specialty
let HandleGetAllSpecialty = async (req, res) => { 
    let id = req.query.id; 
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
            specialties: []
        })
    }
    let specialties = await SpecialtyServices.getAllSpecialties(id);
    console.log(specialties);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        specialties
    })
}
//sửa thông tin user trên front end
let HandleEditSpecialty = async(req, res) => { 
    
    let message = await SpecialtyServices.UpdateSpecialtyData(req.body);
    return res.status(200).json(message);
}
// xóa thông tin user trên front end


let HandleDeleteSpecialty = async(req, res) => { 
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await SpecialtyServices.deleteSpecialty(req.body.id);
    return res.status(200).json(message);
}
let getAllSpecialty = async (req, res) => { 
    try {
        let infor = await SpecialtyServices.getAllSpecialty();
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getDetailSpecialtyById = async (req, res) => { 
    try {
        let infor = await SpecialtyServices.getDetailSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let filterUserByName = async (req,res) =>
{
    try {
        let filter = req.params.filterName;
        let infor = await SpecialtyServices.fiterUserByName(filter); // query để lấy ra dữ liệu có tham số truyền vào (với Get với Post dùng req.body)
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
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,
    HandleDeleteSpecialty: HandleDeleteSpecialty,
    HandleEditSpecialty: HandleEditSpecialty,
    HandleGetAllSpecialty: HandleGetAllSpecialty,
    filterUserByName
}