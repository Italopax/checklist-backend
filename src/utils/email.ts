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
    const email = ConstantEnvs.email.user;
    const emailPassword = ConstantEnvs.email.password;
    const host = ConstantEnvs.email.host;
    const port = ConstantEnvs.email.port;
    const secure = ConstantEnvs.email.secure;

    if (!email || !emailPassword) throw new BadRequest(Errors.EMAIL_SENDING_ERROR);

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
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
