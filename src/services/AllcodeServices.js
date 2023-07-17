import db from "../models/index";
require('dotenv').config();
let getAllAllcodes = (allcodeId) => {
    return new Promise(async(resolve, reject) => { 
        try { 
            let allcodes = '';
            if (allcodeId === 'ALL') {
                allcodes = await db.Allcode.findAll({
                    attributes: 
                        ['id','keyMap', 'type', 'valueEN', 'valueVN']
                })

            }
            if(allcodeId && allcodeId !=='ALL') {
                allcodes = await db.Allcode.findOne({
                    where: {id: allcodeId},
                    attributes: 
                        ['id','keyMap', 'type', 'valueEN', 'valueVN']
                })
            }
            resolve(allcodes)
        }
        
        catch (e) { 
            reject(e)
        }
    })
}
let createNewAllcode = (data) => { 
    return new Promise(async (resolve, reject) => { 
            
                await db.Allcode.create({
                    keyMap: data.keyMap,
                    type: data.type,
                    valueEN: data.valueEN,
                    valueVN: data.valueVN
                })
                 resolve({
                    errCode: 0,
                    errMessage: "ok"
                })           
        }
    )

}

let deleteAllcode = (allcodeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allcode = await db.Allcode.findOne({
                where: { id: allcodeId }
            })  
            if (allcode) {
                await db.Allcode.destroy({
                    where: {id: allcodeId}
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


let UpdateAllcodeData = (data) => {
    return new Promise(async(resolve, reject) => { 
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Allcode id is required"
                });
            }
            let allcode = await db.Allcode.findOne({
                where:{id: data.id},
                raw: false
            })
            if (allcode) {
                allcode.id = data.id
                allcode.keyMap = data.keyMap;
                allcode.type = data.type;
                allcode.valueEN = data.valueEN;
                allcode.valueVN = data.valueVN;
                await allcode.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update allcode succeed"
                });

            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "Allcode not found"
                });
            }
            

        } catch (e)
        {
            reject(e)
        }
        console.log(resolve)
        
    })
    
}
module.exports = {

    getAllAllcodes: getAllAllcodes,
    createNewAllcode: createNewAllcode,
    deleteAllcode:deleteAllcode,
    UpdateAllcodeData:UpdateAllcodeData,
}