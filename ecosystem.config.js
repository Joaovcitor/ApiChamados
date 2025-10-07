// ecosystem.config.js

module.exports = {
  apps: [
    {
      // --- Configuração Principal ---
      name: "api-chamados", // Nome da sua aplicação no PM2
      script: "dist/server.js", // O CAMINHO PARA O ARQUIVO DE ENTRADA APÓS O BUILD

      // --- Gerenciamento de Cluster ---
      exec_mode: "cluster", // Permite que a aplicação rode em múltiplos núcleos de CPU
      instances: "max", // Cria uma instância por núcleo de CPU disponível ('2', '4', etc.)

      // --- Gerenciamento de Processo ---
      autorestart: true, // Reinicia a aplicação se ela falhar
      watch: false, // Desabilitado em produção. Use 'pm2 reload' para atualizações.
      max_memory_restart: "512M", // Reinicia se a aplicação usar mais de 512MB de memória

      // --- Variáveis de Ambiente ---
      // Define variáveis de ambiente para o ambiente de produção
      // Elas serão carregadas ANTES do seu dotenv.config()
      env_production: {
        NODE_ENV: "production",
        // PORT: 8080, // Você pode sobrescrever a porta aqui se necessário
      },

      // --- Gerenciamento de Logs ---
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      error_file: "logs/error.log", // Caminho para os logs de erro
      out_file: "logs/out.log", // Caminho para os logs gerais
      merge_logs: true, // Junta os logs de todas as instâncias em um só arquivo
    },
  ],
};
