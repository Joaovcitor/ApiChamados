import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/prisma"; // Ajuste o caminho se necessário

// Tipagem para os dados que vamos anexar ao socket
interface SocketUserData {
  id: number;
  role: string;
}

export const onConnection = (io: Server) => {
  io.use(async (socket: Socket, next) => {
    try {
      const cookie = socket.handshake.headers.cookie;
      const token = cookie
        ?.split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        return next(new Error("Token de autenticação não encontrado."));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: number;
        role: string;
      };

      (socket as any).user = {
        id: decoded.id,
        role: decoded.role,
      } as SocketUserData;
      next();
    } catch (error: any) {
      console.error("Falha na autenticação do Socket:", error.message);
      next(new Error("Autenticação inválida."));
    }
  });

  io.on("connection", (socket: Socket) => {
    const user = (socket as any).user as SocketUserData;
    console.log(
      `✅ Usuário conectado via Socket: ${socket.id}, ID: ${user.id}`
    );

    // --- ENTRADA AUTOMÁTICA EM SALAS (ROOMS) ---
    // Todo usuário entra em uma sala privada, para receber notificações diretas
    socket.join(`user:${user.id}`);

    socket.on("joinTicketRoom", (ticketId: number) => {
      socket.join(`ticket:${ticketId}`);
      console.log(`Usuário ${user.id} entrou na sala do ticket #${ticketId}`);
    });

    socket.on("leaveTicketRoom", (ticketId: number) => {
      socket.leave(`ticket:${ticketId}`);
      console.log(`Usuário ${user.id} saiu da sala do ticket #${ticketId}`);
    });

    socket.on("disconnect", () => {
      console.log(`❌ Usuário desconectado: ${socket.id}`);
    });
  });
};
