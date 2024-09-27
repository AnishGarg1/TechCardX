const nodemailer = require("nodemailer");

exports.sendMail = async (email, subject, message) => {
    try {
        const mailTransporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const info = await mailTransporter.sendMail({
            from: "TechCardX || Anish Garg",
            to:`${email}`,
            subject: `${subject}`,
            html: `${message}`

        });

        console.log("info:", info);
        return info;
    } catch (error) {
        console.log("Error:", error);
    }
}
