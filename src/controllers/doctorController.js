import DoctorServices from "../services/DoctorServices"

let getTopDoctor = async (req, res) => { 
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await DoctorServices.getTopDoctor(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }

}
let getAllDoctor = async (req, res) => {
    try {
        let doctors = await DoctorServices.getAllDoctor();
        console.log(doctors);
        return res.status(200).json(doctors);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let postInforDoctor = async (req, res) => {
    try {
        let response = await DoctorServices.postInforDoctor(req.body);
        return res.status(200).json(response);
    } catch (e) { 
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getDoctorById = async (req, res) => { 
    try {
        let infor = await DoctorServices.getDoctorById(req.query.id);
        return res.status(200).json(infor);
    } catch (e) { 
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the server"
        })
    }
    
}
let bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await DoctorServices.bulkCreateSchedule(req.body);
        return res.status(200).json(infor);
    } catch (e) { 
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the server"
        })
    }
}
module.exports = {
    getTopDoctor: getTopDoctor,
    getAllDoctor: getAllDoctor,
    postInforDoctor: postInforDoctor,
    getDoctorById: getDoctorById,
    bulkCreateSchedule:bulkCreateSchedule
}