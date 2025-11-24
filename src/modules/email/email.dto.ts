import { z } from "zod";

// 1. Definição do Schema de Validação
export const sendMailSchema = z.object({
  to: z
    .string({ error: "O destinatário é obrigatório" })
    .email("Formato de email inválido"),

  subject: z
    .string({ error: "O assunto é obrigatório" })
    .min(3, "O assunto deve ter pelo menos 3 caracteres")
    .max(100, "O assunto é muito longo"),

  html: z
    .string({ error: "O conteúdo HTML é obrigatório" })
    .min(10, "O conteúdo do email é muito curto"),
});

export type SendMailDTO = z.infer<typeof sendMailSchema>;
