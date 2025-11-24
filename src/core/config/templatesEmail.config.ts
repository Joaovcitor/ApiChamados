// emailTemplates.ts

export const emailTemplates = {
  // 1. Template de Boas-vindas
  welcome: (name: string, actionUrl: string) => `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
      <h1 style="color: #2563eb;">Bem-vindo, ${name}!</h1>
      <p>Estamos muito felizes em ter você conosco. Seu cadastro foi realizado com sucesso.</p>
      <p>Para começar, clique no botão abaixo:</p>
      <a href="${actionUrl}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
        Acessar minha conta
      </a>
      <p style="font-size: 12px; color: #666; margin-top: 30px;">Se você não criou esta conta, ignore este email.</p>
    </div>
  `,

  // 2. Template de Recuperação de Senha
  resetPassword: (resetToken: string) => `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #d93025;">Recuperação de Senha</h2>
      <p>Recebemos uma solicitação para redefinir sua senha. Se foi você, entre pelo link abaixo e redefina sua senha:</p>
      <p>Clique no link direto: <a href="${process.env.URL_PROD}/reset/${resetToken}">Redefinir agora</a></p>
      <p style="color: #888;">Este link expira em 1 hora.</p>
    </div>
  `,

  // 3. Notificação Genérica (Ex: Status de Pedido/Chamado)
  notification: (title: string, message: string) => `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f0f2f5; padding: 40px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h3 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">${title}</h3>
        <p style="line-height: 1.6; color: #555;">
          ${message}
        </p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #999; text-align: center;">Enviado automaticamente pelo Sistema.</p>
      </div>
    </div>
  `,
};
