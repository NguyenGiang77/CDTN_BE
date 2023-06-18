import db from "../models/index";
import _ from 'lodash'
require('dotenv').config();

let postBookingSchedule = (data) => { 
    return new Promise(async(resolve, reject) => { 
        try {
            if (!data.email) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                });
            }
            else {
                let user = await db.User.findOrCreate({
                    where: {
                        email: data.email
                    },
                    defaults: {
                        email: data.email,
                        roleId: "R3"
                    }
                    // raw:true// = true nếu tạo mới, = false là update
                    
                });
                if(user && user[0])
                    {
                        await db.Booking.create({
                            statusId: "S1",
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        })
                    }

                resolve({
                    
                    errCode: 0,
                    errMessage: "Save infor doctor success"
                })
            }
            resolve({
                errCode: 1,
                errMessage:"Missing required parameters"
            })
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    postBookingSchedule: postBookingSchedule
}