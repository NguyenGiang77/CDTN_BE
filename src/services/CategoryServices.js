import db from "../models/index";
require('dotenv').config();

let checkName = (CategoryName) => { 
    return new Promise(async(resolve, reject) => { 
        try {
            let category = await db.Category.findOne({
                where: {name: CategoryName}
            })
            if (category) {
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
let getAllCategories = (categoryId) => {
    return new Promise(async(resolve, reject) => { 
        try { 
            let categories = '';
            if (categoryId === 'ALL') {
                
                categories = await db.Category.findAll({
                    attributes: 
                        ['id','categoryMarkown', 'categoryHTML', 'name'],
                })

            }
            if(categoryId && categoryId !=='ALL') {
                categories = await db.Category.findOne({
                    
                    where: {id: categoryId},
                    attributes: 
                        ['id','categoryMarkown', 'categoryHTML', 'name'],
                })
            }
            resolve(categories)
        }
        
        catch (e) { 
            reject(e)
        }
    })
}

let createNewCategory = (data) => { 
    return new Promise(async (resolve, reject) => { 
        try {
            let check = await checkName(data.name);
            if (check === true) { 
                resolve({
                errCode: 1,
                errMessage: "Category is already exists. Try another Category",
            })
        }
            
                await db.Category.create({
                    name: data.name,
                    categoryHTML: data.categoryHTML,
                    categoryMarkown: data.categoryMarkown
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
let getAllCategory = () => { 
    return new Promise(async(resolve, reject) => { 
        try {
            let infor = await db.Category.findAll({
               
            })
            resolve({
                errCode: 0,
                data: infor
            })   
        } catch (e) { 
            reject(e);
        }
    })
}
let deleteCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await db.Category.findOne({
                where: { id: categoryId }
            })  
            if (category) {
                await db.Category.destroy({
                    where: {id: categoryId}
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


let UpdateCategoryData = (data) => {
    return new Promise(async(resolve, reject) => { 
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Category id is required"
                });
            }
            let category = await db.Category.findOne({
                where:{id: data.id},
                raw: false
            })
            if (category) {
                category.id = data.id
                category.name = data.name;
                category.categoryHTML = data.categoryHTML;
                category.categoryMarkown = data.categoryMarkown;
                await category.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update category succeed"
                });

            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "Category not found"
                });
            }
            

        } catch (e)
        {
            reject(e)
        }
        console.log(resolve)
        
    })
    
}

let getDetailCategoryById = (inputId) => { 
    return new Promise(async(resolve, reject) => { 
        try {
            if (!inputId) {
               resolve({
                    errCode: 1,
                    errMessage: "Missing parameter required"
                }) 
            }
            else {
                
                let data = await db.Category.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: 
                    ['categoryMarkown', 'categoryHTML', 'name']

                })
                if (data)
                {
                    let categoryInforCategoryData = [];
                    categoryInforCategoryData = await db.InforCategory.findAll({
                            where: { categoryId: inputId },
                            attributes: ['categoryId'],
                        
                        })
                    data.categoryInforCategoryData = categoryInforCategoryData
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


module.exports = {
    checkName: checkName,
    getAllCategory: getAllCategory,
    getAllCategories: getAllCategories,
    createNewCategory: createNewCategory,
    deleteCategory:deleteCategory,
    UpdateCategoryData:UpdateCategoryData,
    getDetailCategoryById: getDetailCategoryById,
}