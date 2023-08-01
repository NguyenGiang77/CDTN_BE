import db from "../models/index";
import _, { includes } from 'lodash';

require('dotenv').config();

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let checkName = (InforCategoryName) => { 
    return new Promise(async(resolve, reject) => { 
        try {
            let inforCategory = await db.InforCategory.findOne({
                where: {name: InforCategoryName}
            })
            if (inforCategory) {
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
let getAllInforCategories = (inforCategoryId) => {
    return new Promise(async(resolve, reject) => { 
        try { 
            let inforCategories = '';
            if (inforCategoryId === 'ALL') {
                
                inforCategories = await db.InforCategory.findAll({
                    attributes: 
                        ['id','inforCategoryHTML', 'inforCategoryMarkdown','description', 'name','image'],
                        
                })
            }
            if(inforCategoryId && inforCategoryId !=='ALL') {
                inforCategories = await db.InforCategory.findOne({
                    
                    where: {id: inforCategoryId},
                    attributes: 
                        ['id','inforCategoryHTML', 'inforCategoryMarkdown','description', 'name','image'],
                        
                })
            }
            resolve(inforCategories)
        }
        
        catch (e) { 
            reject(e)
        }
    })
}
let createNewInforCategory = (data) => { 
    return new Promise(async (resolve, reject) => { 
        try {
            let check = await checkName(data.name);
            if (check === true) { 
                resolve({
                errCode: 1,
                errMessage: "InforCategory is already exists. Try another InforCategory",
            })
        }
            
                await db.InforCategory.create({
                    name: data.name,
                    image: data.image,
                    description: data.description,
                    inforCategoryHTML: data.inforCategoryHTML,
                    inforCategoryMarkdown: data.inforCategoryMarkdown,
                    clinicId:data.clinicId,
                    priceId:data.priceId,
                    paymentId:data.paymentId,
                    provinceId: data.provinceId,
                    categoryId: data.categoryId
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

let deleteInforCategory = (inforCategoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let inforCategory = await db.InforCategory.findOne({
                where: { id: inforCategoryId }
            })  
            if (inforCategory) {
                await db.InforCategory.destroy({
                    where: {id: inforCategoryId}
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


let UpdateInforCategoryData = (data) => {
    return new Promise(async(resolve, reject) => { 
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "InforCategory id is required"
                });
            }
            let inforCategory = await db.InforCategory.findOne({
                where:{id: data.id},
                raw: false
            })
            if (inforCategory) {
                inforCategory.id = data.id
                inforCategory.name = data.name;
                inforCategory.description = data.description;
                inforCategory.image = data.image;
                inforCategory.inforCategoryHTML = data.inforCategoryHTML;
                inforCategory.inforCategoryMarkdown = data.inforCategoryMarkdown;
                inforCategory.clinicId = data.clinicId,
                inforCategory.priceId = data.priceId,
                inforCategory.provinceId = data.provinceId,
                inforCategory.paymentId = data.paymentId,
                inforCategory.categoryId =  data.categoryId
                await inforCategory.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update inforCategory succeed"
                });

            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "InforCategory not found"
                });
            }
            

        } catch (e)
        {
            reject(e)
        }
        console.log(resolve)
        
    })
    
}
let getAllInforCategory = () => { 
    return new Promise(async(resolve, reject) => { 
        try {
            let infor = await db.InforCategory.findAll({
               
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

let getDetailInforCategoryById = (inforCategoryId) => { 
    return new Promise(async(resolve, reject) => { 
        try {
            if (!inforCategoryId) {
               resolve({
                    errCode: 1,
                    errMessage: "Missing parameter required"
                }) 
            }
            else {
                
                let data = await db.InforCategory.findOne({
                    where: {
                        id: inforCategoryId
                    },
                    attributes: 
                        ['id','inforCategoryHTML', 'inforCategoryMarkdown','description', 'name','image'],
                    include: [
                            { model: db.Clinic, as: 'clinicInforCategoryData', attributes: [ 'name','address'] },
                            { model: db.Allcode, as: 'paymentInforCategoryData', attributes: [ 'valueEN', 'valueVN'] },
                            { model: db.Category, as: 'categoryInforCategoryData', attributes:[ 'name'] },
                            { model: db.Allcode, as: 'priceInforCategoryData', attributes: [ 'valueEN', 'valueVN'] },
                            { model: db.Allcode, as: 'provinceInforCategoryData', attributes: [ 'valueEN', 'valueVN'] },

                        ],

                        raw: false,
                        nest: true
                    })
                    if (data && data.image) {
                        data.image= new Buffer(data.image, 'base64').toString('binary');
                        
                    }
                    if (!data) data = { };
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

let bulkCreateScheduleCategory =  (data) => {
    return new Promise(async(resolve, reject) => { 
        try {
            if (!data.arrSchedule || !data.inforCategoryId || !data.formatedDate) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters",
                })
            }
            else {
                let schecdule = data.arrSchedule
                if (schecdule && schecdule.length > 0) { 
                    schecdule = schecdule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }
                //get all existing data
                let existingData = await db.SchecduleCategory.findAll({
                    where: { inforCategoryId: data.inforCategoryId, date: data.formatedDate },
                    attributes: ['timeType', 'date', 'inforCategoryId', 'maxNumber'],
                    raw: true
                })
               
                // a = '5'
            //    b = +a => b = 5 tức là khi thêm dấu + vào trước biến thì biến STRING = > SỐ
                let toCreate = _.differenceWith(schecdule, existingData, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date;
                });
                //create data
                if (toCreate && toCreate.length > 0) {
                    await db.SchecduleCategory.bulkCreate(toCreate);

                 }
                 resolve({
                    errCode: 0,
                    errMessage: 'OK'

                })
            }

        } catch (e) { 
            reject(e);
        }
    })
}
let getSchCategoryByDate = (inforCategoryId, date) => { 
    return new Promise( async(resolve, reject) => { 
        try {
            if (!inforCategoryId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
                
            }
            else {
                let dataSch = await db.SchecduleCategory.findAll({
                    where: {
                        inforCategoryId: inforCategoryId, // KeyTrongdb: Keytruyenvao
                        date: date
                    },
                    include: [
                        { model: db.Allcode, as: 'timeScheduleCateData', attributes: ['valueEN', 'valueVN'] },
                        { model: db.InforCategory, as: 'schecduleInforCategoryData', attributes: ['name'] },
                    ],
                    raw: false,
                    nest: true
                })
                if (!dataSch) dataSch = [];
                resolve({
                    errCode: 0,
                    data: dataSch
                })
            }
        } catch (e) { 
            resolve(e);
        }
    })
}


let getlisPatientForCategory = (inforCategoryId,date) => { 
    return new Promise( async(resolve, reject) => { 
        try {
            if (!inforCategoryId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
                
            }
            else {
                let data = await db.BookingCategory.findAll({
                    where: {
                        statusId: 'S2',
                        inforCategoryId: inforCategoryId,
                        date: date
                        
                        
                    },
                    include: [
                        { model: db.User, as: 'patientbookingCategoryData', 
                            attributes: ['email', 'firstName', 'address', 'gender', 'phoneNumber'] ,
                            include: [
                                {
                                    model: db.Allcode, as: 'genderData', attributes: ['valueEN','valueVN']
                                }
                            ]
                        },
                        {model: db.Allcode, as :'timeTypeInforCategoryData',
                            attributes: ['valueEN','valueVN']
                    }
                        
                    ],
                    raw: false,
                    nest: true
                })
                if (!data) data = [];
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
let getAllInforDoctor = (limit) => {
    return new Promise( async(resolve, reject) => { 
        try {
            let users = await db.User.findAll({
                where: {roleId: 'R2'},
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: [ 'valueEN', 'valueVN'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEN', 'valueVN'] },
                    { model: db.Allcode, as: 'roleData', attributes: ['valueEN', 'valueVN'] },
                    {
                        model: db.InforDoctor,
                        attributes: [
                            
                        ],
                        include: [
                            {model: db.Specialty, as: 'specialtyData', attributes: ['name']}
                        ]
                    }
                ],
                raw: true,
                nest: true,
            })
            if (users && users.image) {
                users.image= new Buffer(users.image, 'base64').toString('binary');
                
            }
            if (!users) users = { };
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) { 
            reject(e);
        }
    })
}
module.exports = {
    checkName: checkName,
    getAllInforCategories: getAllInforCategories,
    createNewInforCategory: createNewInforCategory,
    deleteInforCategory:deleteInforCategory,
    UpdateInforCategoryData:UpdateInforCategoryData,
    getAllInforCategory: getAllInforCategory,
    getDetailInforCategoryById: getDetailInforCategoryById,
    bulkCreateScheduleCategory:bulkCreateScheduleCategory,
    getlisPatientForCategory: getlisPatientForCategory,
    getSchCategoryByDate: getSchCategoryByDate,
}