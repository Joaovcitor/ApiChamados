import { z } from "zod";

const schemaCreateInventory = z.object({
  nome: z.string(),
  quantidade: z.number(),
  localizacao: z.string({ error: "Localização é obrigatória" }).trim(),
  departamentoId: z.number({ error: "O departamento é obrigatório!" }),
  valorUnitario: z.number().optional(),
  fornecedor: z.string().optional(),
  usuarioResponsavelId: z.number({ error: "O responsável é obrigatório!" }),
});

const movimentacaoSchema = z.object({
  itemId: z.number({ error: "O ID do item é obrigatório!" }),
  quantidade: z.number({ error: "A quantidade é obrigatória!" }),
  tipo: z.enum(["entrada", "saida"]),
  motivo: z.string({ error: "O motivo é obrigatório!" }),
  responsavelId: z.number({ error: "O ID do responsável é obrigatório!" }),
});
const schemaUpdateInventory = schemaCreateInventory.partial();

export type CreateInventoryDTO = z.infer<typeof schemaCreateInventory>;
export type UpdateInventoryDTO = z.infer<typeof schemaUpdateInventory>;
export type MovimentacaoDTO = z.infer<typeof movimentacaoSchema>;
