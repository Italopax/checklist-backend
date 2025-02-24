import nodemailer from "nodemailer";
import { getEnv } from "../constants";
import { BadRequest, Errors } from "./error";

const ConstantEnvs = getEnv();

export default class Email {
  static async sendEmail({
    userEmail,
    title,
    text,
  }: {
    userEmail: string;
    title: string;
    text: string;
  }): Promise<void> {
    const email = ConstantEnvs.email.emailSender;
    const emailPassword = ConstantEnvs.email.emailSenderPassoword;

    if (!email || !emailPassword) throw new BadRequest(Errors.EMAIL_SENDING_ERROR);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: emailPassword,
      },
    });

    const emailInfos = {
      from: email,
      to: userEmail,
      subject: title,
      text: text,
    };

    transporter.sendMail(emailInfos, (error, info) => {
      if (error) {
        console.log("ERRO AO ENVIAR EMAIL:", error);
      } else {
        console.log("EMAIL ENVIADO COM SUCESSO:", info.response);
      }
    });
  }
}
