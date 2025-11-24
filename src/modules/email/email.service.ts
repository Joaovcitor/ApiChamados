import { emailConfig } from "../../core/config/email.config";
import { SendMailDTO } from "./email.dto";
import { emailTemplates } from "../../core/config/templatesEmail.config";
export class EmailService {
  async sendMailTicket(data: SendMailDTO, token: string) {
    const send = await emailConfig.sendMail({
      from: process.env.EMAIL_USER!,
      to: data.to,
      subject: data.subject,
      html: data.html,
    });
    return send;
  }
}
