import db from "../models/index";
require('dotenv').config();
const {Op}  = require("sequelize");
import _, { includes } from 'lodash';

let checkName = (ClinicName) => { 
    return new Promise(async(resolve, reject) => { 
        try {
            let clinic = await db.Clinic.findOne({
                where: {name: ClinicName}
            })
            if (clinic) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        }

        catch (e) { 
            reject(e)
        }
    })
        
}
let getAllClinics = (clinicId) => {
    return new Promise(async(resolve, reject) => { 
        try { 
            let clinics = '';
            if (clinicId === 'ALL') {
                
                clinics = await db.Clinic.findAll({
                    attributes: 
                        ['id','descriptionMarkown', 'descriptionHTML', 'name', 'address','image']
                    
                    
                })

            }
            if(clinicId && clinicId !=='ALL') {
                clinics = await db.Clinic.findOne({
                    
                    where: {id: clinicId},
                    attributes: 
                        ['descriptionMarkown', 'descriptionHTML', 'name', 'address','image']
                })
            }
            resolve(clinics)
        }
        
        catch (e) { 
            reject(e)
        }
    })
}
let createNewClinic = (data) => { 
    return new Promise(async (resolve, reject) => { 
        try {
            let check = await checkName(data.name);
            if (check === true) { 
                resolve({
                errCode: 1,
                errMessage: "Clinic is already exists. Try another Clinic",
            })
        }
            
                await db.Clinic.create({
                    name: data.name,
                    image: data.image,
                    address: data.address,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkown: data.descriptionMarkown
                })
                 resolve({
                    errCode: 0,
                    errMessage: "ok"
                })           
        } catch (e) { 
            reject(e);
        }
    })

}

let deleteClinic = (clinicId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinic = await db.Clinic.findOne({
                where: { id: clinicId }
            })  
            if (clinic) {
                await db.Clinic.destroy({
                    where: {id: clinicId}
                });
                
            }
            resolve({
                errCode: 0,
                errMessage: "ok"
            })        ;
        } catch (e) {
            reject(e);
    }
})
}


let UpdateClinicData = (data) => {
    return new Promise(async(resolve, reject) => { 
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Clinic id is required"
                });
            }
            let clinic = await db.Clinic.findOne({
                where:{id: data.id},
                raw: false
            })
            if (clinic) {
                clinic.id = data.id
                clinic.name = data.name;
                clinic.address = data.address;
                clinic.image = data.image;
                clinic.descriptionHTML = data.descriptionHTML;
                clinic.descriptionMarkown = data.descriptionMarkown;
                await clinic.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update clinic succeed"
                });

            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "Clinic not found"
                });
            }
            

        } catch (e)
        {
            reject(e)
        }
        console.log(resolve)
        
    })
    
}
let getAllClinic = () => { 
    return new Promise(async(resolve, reject) => { 
        try {
            let infor = await db.Clinic.findAll({
               
            })
            if (infor && infor.length > 0) { 
                infor.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item
                })
            }
            if (!infor) infor = { };

            resolve({
                errCode: 0,
                data: infor
            })   
        } catch (e) { 
            reject(e);
        }
    })
}
let getDetailClinicById = (inputId) => { 
    return new Promise(async(resolve, reject) => { 
        try {
            if (!inputId) {
               resolve({
                    errCode: 1,
                    errMessage: "Missing parameter required"
                }) 
            }
            else {
                
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: 
                    ['descriptionMarkown', 'descriptionHTML', 'name', 'address','image']

                })
                if (data)
                {
                    let doctorClinic = [];
                        doctorClinic = await db.InforDoctor.findAll({
                            where: { clinicId: inputId },
                            attributes: ['doctorId'],
                        
                        })
                    data.doctorClinic = doctorClinic
                }
                if (data && data.image) {
                    data.image= new Buffer(data.image, 'base64').toString('binary');
                    
                }
                else data = {}
                resolve({
                errCode: 0,
                data
            })
            }
              
        } catch (e) { 
            reject(e);
        }
    })
}
let filterUserByNameClinic = (filter) => {
    return new Promise(async (resolve, reject) => {
      try {
        let infor = await db.Clinic.findAll({
          where: {
              [Op.or]: [
                {name: { [Op.like]: `%${filter}%` } },
                {address: { [Op.like]: `%${filter}%` } },  // Lọc các records có ký tự 'T' trong lastName

              ]
            },
            attributes:['name', 'address','image'],
            
         
      })
      if (infor && infor.image) {
          infor.image= new Buffer(infor.image, 'base64').toString('binary');
      }
      if (!infor) infor = { };
              resolve({
          errCode: 0,
          data: infor,
      })
      } catch (error){
          console.log("hihi",error)
      }
    });
  };
module.exports = {
    // checkName: checkName,
    getAllClinics: getAllClinics,
    createNewClinic: createNewClinic,
    deleteClinic:deleteClinic,
    UpdateClinicData:UpdateClinicData,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
    filterUserByNameClinic:filterUserByNameClinic
}