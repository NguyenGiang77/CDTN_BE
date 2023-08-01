import db from "../models/index";
require('dotenv').config();
let checkName = (SpecialtyName) => { 
    return new Promise(async(resolve, reject) => { 
        try {
            let specialty = await db.Specialty.findOne({
                where: {name: SpecialtyName}
            })
            if (specialty) {
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
let createSpecialty = (data) => { 
    return new Promise(async (resolve, reject) => { 
        try {
            let check = await checkName(data.name);
            if (check === true) { 
                resolve({
                errCode: 1,
                errMessage: "Specialty is already exists. Try another Specialty",
                })
            }
                
            await db.Specialty.create({
                name: data.name,
                image: data.image,
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

let getAllSpecialty = () => { 
    return new Promise(async(resolve, reject) => { 
        try {
            let infor = await db.Specialty.findAll({
               
            })
            if (infor && infor.length > 0) { 
                infor.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item
                })
            }
            resolve({
                errCode: 0,
                data: infor
            })   
        } catch (e) { 
            reject(e);
        }
    })
}
let getDetailSpecialtyById = (inputId,location) => { 
    return new Promise(async(resolve, reject) => { 
        try {
            if (!inputId  || !location) {
               resolve({
                    errCode: 1,
                    errMessage: "Missing parameter required"
                }) 
            }
            else {
                
                let data = await db.Specialty.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: 
                    ['descriptionMarkown', 'descriptionHTML']

                })
                if (data)
                {
                    let doctorSpecialty = [];
                    if (location === "ALL")
                    {
                        doctorSpecialty = await db.InforDoctor.findAll({
                            where: { specialtyId: inputId },
                            attributes: ['doctorId', 'provinceId'],
                        
                        })
                    }
                    else {
                            doctorSpecialty = await db.InforDoctor.findAll({
                                where: {
                                    specialtyId: inputId,
                                    provinceId: location
                                },
                                attributes: ['doctorId', 'provinceId'],
                            })
                    }
                    data.doctorSpecialty = doctorSpecialty
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

let getAllSpecialties = (specialtyId) => {
    return new Promise(async(resolve, reject) => { 
        try { 
            let specialties = '';
            if (specialtyId === 'ALL') {
                
                specialties = await db.Specialty.findAll({
                    attributes: 
                        ['id','descriptionMarkown', 'descriptionHTML', 'name','image']
                    
                    
                })

            }
            if(specialtyId && specialtyId !=='ALL') {
                specialties = await db.Specialty.findOne({
                    
                    where: {id: specialtyId},
                    attributes: 
                        ['descriptionMarkown', 'descriptionHTML', 'name','image']
                })
            }
            resolve(specialties)
        }
        
        catch (e) { 
            reject(e)
        }
    })
}


let deleteSpecialty = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialty = await db.Specialty.findOne({
                where: { id: specialtyId }
            })  
            if (specialty) {
                await db.Specialty.destroy({
                    where: {id: specialtyId}
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


let UpdateSpecialtyData = (data) => {
    return new Promise(async(resolve, reject) => { 
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Specialty id is required"
                });
            }
            let specialty = await db.Specialty.findOne({
                where:{id: data.id},
                raw: false
            })
            if (specialty) {
                specialty.id = data.id
                specialty.name = data.name;
                specialty.image = data.image;
                specialty.descriptionHTML = data.descriptionHTML;
                specialty.descriptionMarkown = data.descriptionMarkown;
                await specialty.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update specialty succeed"
                });

            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "Specialty not found"
                });
            }
            

        } catch (e)
        {
            reject(e)
        }
        
    })
    
}
let fiterUserByName = (filter) => {
    return new Promise(async (resolve, reject) => {
      try {
        let specialty = await db.Specialty.findAll({
          where: {
              [Op.or]: [
                { name: { [Op.like]: `%${filter}%` } }, // Lọc các records có ký tự 'T' trong firstName
              ]
            },
            attributes:{},

          raw: true,
          nest: true,
      })
      if (specialty && specialty.image) {
          specialty.image= new Buffer(specialty.image, 'base64').toString('binary');
      }
      if (!specialty) specialty = { };
        let a = specialty;
        resolve({
          errCode: 0,
          data: specialty,
      })
      } catch (error){
          console.log("hihi",error)
      }
    });
  };
module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,
    checkName: checkName,
    getAllSpecialties: getAllSpecialties,
    UpdateSpecialtyData: UpdateSpecialtyData,
    deleteSpecialty: deleteSpecialty,
    fiterUserByName
}