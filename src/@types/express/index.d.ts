// Define a interface para o payload que você coloca no token
interface UserPayload {
  id: number;
  role: string;
}

// Usa 'declare global' para mesclar com os tipos existentes do Express
declare global {
  namespace Express {
    export interface Request {
      // Anexa a sua interface UserPayload à interface Request
      user?: UserPayload;
    }
  }
}

// Adiciona esta linha vazia para garantir que o TypeScript trate este arquivo como um módulo.
export {};
