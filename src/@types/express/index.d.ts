import type { User } from "@prisma/client";

// Usa 'declare global' para mesclar com os tipos existentes do Express
declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

// Adiciona esta linha vazia para garantir que o TypeScript trate este arquivo como um módulo.
export {};
