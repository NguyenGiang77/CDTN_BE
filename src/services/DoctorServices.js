import db from "../models/index";
import _ from 'lodash'
require('dotenv').config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctor = (limit) => {
    return new Promise( async(resolve, reject) => { 
        try {
            let users = await db.User.findAll({
                limit: limit,
                where: {roleId: 'R2'},
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: [ 'valueEN', 'valueVN'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEN', 'valueVN'] },
                    { model: db.Allcode, as: 'roleData', attributes: ['valueEN', 'valueVN'] },
                ],
                raw: true,
                nest: true,
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) { 
            reject(e);
        }
    })
}
let getAllDoctor = () => { 
    return new Promise(async(resolve, reject) => { 
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude:['password', 'image']
                },
            })
            resolve({
                errCode: 0,
                data: doctors
            })   
        } catch (e) { 
            reject(e);
        }
    })
}
let postInforDoctor = (inputData) => { 
    return new Promise(async(resolve, reject) => {
        try {
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown)
            {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter '
                })
            }
            else {
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    doctorId: inputData.doctorId

                })
                resolve({
                    errCode: 0,
                    errMessage: "Save infor doctor success"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getDoctorById = (inputId) => { 
    return new Promise(async (resolve, reject) => { 
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"

                })
                
            }
            else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                    exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: [
                                'description',
                                'contentHTML',
                                'contentMarkdown'
                            ],  
                        },
                        
                        { model: db.Allcode, as: 'positionData', attributes: [ 'valueEN', 'valueVN'] },
                        { model: db.Allcode, as: 'genderData', attributes: ['valueEN', 'valueVN'] },
                        { model: db.Allcode, as: 'roleData', attributes: ['valueEN', 'valueVN'] },
                            
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
                    data: data,
                })
            }
        } catch (e) { 
            reject(e);
        }
    

    })
}
let bulkCreateSchedule =  (data) => {
    return new Promise(async(resolve, reject) => { 
        try {
            if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters",
                })
            }
            else {
                let schedule = data.arrSchedule
                if (schedule && schedule.length > 0) { 
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }
                //get all existing data
                let existingData = await db.Schecdule.findAll({
                    where: { doctorId: data.doctorId, date: data.formatedDate },
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw: true
                })
                // convert date
                if (existingData && existingData.length > 0) {
                    existingData = existingData.map(item => {
                        item.date = new Date(item.date).getTime();
                        return item;
                    })
                }
                //compare different
                let toCreate = _.differenceWith(schedule, existingData, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date;
                });
                //create data
                if (toCreate && toCreate.length > 0) {
                    await db.Schecdule.bulkCreate(toCreate);

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
module.exports = {
    getTopDoctor: getTopDoctor,
    getAllDoctor: getAllDoctor,
    postInforDoctor: postInforDoctor,
    getDoctorById: getDoctorById,
    bulkCreateSchedule: bulkCreateSchedule
}