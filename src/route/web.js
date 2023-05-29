// nơi một lần truy cập vào đường link của web thì sẽ chạy vào file này đầu tiên
import express  from "express";  
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
//là 1 đích danh, 1 object của file wen
let router = express.Router();
let initWebRouter = (app) => {
    router.get('/',homeController.getHomPage);// hiển thị trang động /
    router.get('/about',homeController.getAboutPage);
    router.get('/crub',homeController.getCrubPage);
    //router.get('/links',(req,res)=>{
    //    return res.send("Hello 3")
    //}); // hiển thị sang đường link /links
    router.post('/post-crub',homeController.getPostCrubPage);
    router.get('/get-crub',homeController.displayGetCrubPage);
    router.get('/edit-crub', homeController.getEditCrubPage);
    router.post('/put-crub', homeController.pustCrubPage);
    router.get('/delete-crub', homeController.deleteCrubPage);
    router.post('/api/login', userController.HandleLogin);
    router.get('/api/get-all-users', userController.HandleGetAllUsers);
    router.post('/api/create-new-user', userController.HandleCreateNewUser);
    router.put('/api/edit-user', userController.HandleEditUser);
    router.delete('/api/delete-user', userController.HandleDeleteUser);
    router.get('/api/allcode',userController.getAllCode);
    return app.use("/", router);

}
module.exports = initWebRouter;
