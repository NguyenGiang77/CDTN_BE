import db from "../models/index";

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
module.exports = {
    getTopDoctor: getTopDoctor
}