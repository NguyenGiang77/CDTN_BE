// nơi một lần truy cập vào đường link của web thì sẽ chạy vào file này đầu tiên
import express  from "express";  
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import categoryController from "../controllers/categoryController";
import inforCategoryController from "../controllers/inforCategoryController";
import allcodeController from "../controllers/allcodeController";

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
    router.get('/api/allcode', userController.getAllCode);

    //bác sĩ
    router.get('/api/top-doctor', doctorController.getTopDoctor);
    router.get('/api/all-doctor', doctorController.getAllDoctor);
    router.post('/api/save-infor-doctor', doctorController.postInforDoctor);
    router.get('/api/get-doctor-by-id', doctorController.getDoctorById);
    router.get('/api/all-infor-doctor', doctorController.getAllInforDoctor);
    router.get('/api/search-doctor', doctorController.SearchDoctor);

    

    //lịch khám
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);  
    router.get('/api/get-schedule-doctor-by-date', doctorController.getSchDoctorByDate);
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById);
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);
    router.get('/api/get-list-patient-for-doctor', doctorController.getlisPatientForDoctor)
    router.post('/api/send-remedy', doctorController.sendRemedy);

    router.post('/api/patient-book-appointment', patientController.postBookingSchedule);
    router.post('/api/patient-book-category-appointment', patientController.postBookingCategorySchedule);
    router.post('/api/verify-book-appointment', patientController.postVerifyBook);
    router.post('/api/verify-book-category-appointment', patientController.postVerifyBookCategory);

    //chuyên khoa
    router.post('/api/create-new-specialty', specialtyController.createSpecialty);
    router.get('/api/get-specialty', specialtyController.getAllSpecialty);
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById); 
    router.get('/api/get-all-specialties', specialtyController.HandleGetAllSpecialty);
    router.put('/api/edit-specialty', specialtyController.HandleEditSpecialty);
    router.delete('/api/delete-specialty', specialtyController.HandleDeleteSpecialty);


    // phòng khám
    router.get('/api/get-clinic', clinicController.getAllClinic);
    router.get('/api/get-detail-clinic-by-id', clinicController.getDetailClinicById); 

    router.post('/api/create-new-clinic', clinicController.HandleCreateNewClinic);
    router.get('/api/get-all-clinics', clinicController.HandleGetAllClinic);
    router.put('/api/edit-clinic', clinicController.HandleEditClinic);
    router.delete('/api/delete-clinic', clinicController.HandleDeleteClinic);

    //gói khám bệnh
    router.get('/api/get-detail-category-by-id', categoryController.getDetailCategoryById); 
    router.get('/api/get-category', categoryController.getAllCategory);
    router.get('/api/get-all-categories', categoryController.HandleGetAllCategory);
    router.post('/api/create-new-category', categoryController.HandleCreateNewCategory);
    router.put('/api/edit-category', categoryController.HandleEditCategory);
    router.delete('/api/delete-category', categoryController.HandleDeleteCategory);

    // chi tiết gói khám bệnh
    router.get('/api/get-inforCategory', inforCategoryController.getAllInforCategory);
    router.get('/api/get-detail-inforCategory-by-id', inforCategoryController.getDetailInforCategoryById); 
    router.get('/api/get-all-inforCategories', inforCategoryController.HandleGetAllInforCategory);
    router.post('/api/create-new-inforCategory', inforCategoryController.HandleCreateNewInforCategory);
    router.put('/api/edit-inforCategory', inforCategoryController.HandleEditInforCategory);
    router.delete('/api/delete-inforCategory', inforCategoryController.HandleDeleteInforCategory);
    router.get('/api/get-extra-infor-category-by-id', inforCategoryController.getExtraInforCategortById);
    router.post('/api/bulk-create-schedule-category', inforCategoryController.bulkCreateScheduleCategory);  
    router.get('/api/get-schedule-category-by-date', inforCategoryController.getSchCategoryByDate);
    router.get('/api/get-list-patient-for-category', inforCategoryController.getlisPatientForCategory)

    
    // Bảng allcode
    router.post('/api/create-new-allcode', allcodeController.HandleCreateNewAllcode);
    router.get('/api/get-all-allcodes', allcodeController.HandleGetAllAllcode);
    router.put('/api/edit-allcode', allcodeController.HandleEditAllcode);
    router.delete('/api/delete-allcode', allcodeController.HandleDeleteAllcode);


    return app.use("/", router);
}
module.exports = initWebRouter;
