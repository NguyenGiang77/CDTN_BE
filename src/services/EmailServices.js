require('dotenv').config();
import { result } from 'lodash';
import nodemailer from 'nodemailer';
let sendSimpleEmail = async(dataSend) => { 
    let transporter  = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });
    let info = await transporter.sendMail({
        from: '"YourHeart" <YourHeart@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html:getBodyHTMLEmail(dataSend)
    })
}
let getBodyHTMLEmail = (dataSend) => { 
    let result = ''
    if (dataSend.language === 'vi')
    {
        result =
             `
        <h3>Xin chào anh (chị) ${dataSend.patientName} </h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên website YourHeart</p>
        <p>Thông tin đặt lịch khám bệnh của bạn: </p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Nếu các thông tin trên chính xác, vui lòng click vào đường link bên dưới
            để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh của bạn. 
        </p>
        <div> 
            <a href = ${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <div><i>YourHeart cảm ơn quý khách</i></div>
        `
    }
    if (dataSend.language === 'en')
    {
        result =
             `
        <h3>Dear Mr (Miss) ${dataSend.patientName} </h3>
        <p>You received this email because you booked an online medical appointment on website YourHeart</p>
        <p>Your medical appointment booking information: </p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p>If the above information is correct, please click on the link below to confirm and complete your appointment.
        </p>
        <div> 
            <a href = ${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <div><i>YourHeart thank you!</i></div>
        `
    }
    return result;
}
let sendAttachment= async(dataSend) => { 
    let transporter  = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });
    let info = await transporter.sendMail({
        from: '"YourHeart" <YourHeart@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Thông tin xác nhận đăng ký lịch khám bệnh", // Subject line
        html:getBodyAttachment(dataSend),
        attachments: 
        [
            {
                filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                content: dataSend.imgBase64.split('base64,')[1],
                encoding: 'base64'
            }
        ],
    })

}
let getBodyAttachment = (dataSend) => { 
    let result = ''
    if (dataSend.language === 'vi')
    {
        result =
             `
        <h3>Xin chào bạn ${dataSend.patientName}!</h3>  
           
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên website YourHeart</p>
        <p>Thông tin hóa đơn khám bệnh được gửi trong file đính kèm sau: </p>

        <div><i>YourHeart cảm ơn quý khách</i></div>
        `
    }
    if (dataSend.language === 'en')
    {
        result =
             `
             <h3>Xin chào bạn ${dataSend.patientName}!</h3>  

        <p>You received this email because you booked an online medical appointment on website YourHeart</p>
        <p>Information on medical examination bills is sent in the following attachments: </p>

        <div><i>YourHeart thank you!</i></div>
        `
    }
    return result;

}
module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment:sendAttachment
}    