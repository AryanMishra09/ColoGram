import nodemailer from "nodemailer";
import mail from './nodemailerConfig.js';

//for email verification : 
const SendVerifyEmail = async (name, email, token) => {
    try{
        const transporter =nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: mail.emailUser,
                pass: mail.emailPassword,
            }
        });
        const mailOptions = {
            from : mail.emailUser,
            to: email,
            subject: "ColoGram. Email Verification Link🔗",
            html: `<p> 
                        Hii ${name}, <br/> <br />  
                        You requested to register in ColoGram. 
                        <br /> <br />  
                        Please, use the Link below to verify you email.
                        <br /> <br />  
                        Link : <a href="https://cologram.onrender.com/verify?token=${token}&email=${email}" > Email verifiaction Link </a> 
                        <br /> <br />
                        Hope you have Good Day dear ${name}💕
                    </p>`
        }
        transporter.sendMail(mailOptions, (error, information)=>{
            if(error){
                console.log("error: ", error);
            }else{
                console.log("Mail has been sent. Info: ", information.response);
            }
        })
    }catch(error){
        console.log("Error: ",error);
    }
}

export default SendVerifyEmail;
