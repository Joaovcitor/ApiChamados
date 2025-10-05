# Apresentação do Sistema — ApiChamados

Este documento explica, de forma simples, o que é o sistema ApiChamados e como ele pode ajudar pessoas e equipes no dia a dia.

## O que é o ApiChamados?
É um sistema de registro e acompanhamento de chamados (também chamados de tickets). Pense em um “pedido de ajuda” ou “solicitação de serviço”: alguém abre um chamado descrevendo o problema ou a necessidade, e uma pessoa responsável acompanha até resolver.

## Para quem serve?
- Pessoas usuárias (quem precisa de ajuda): abrem chamados e acompanham o andamento.
- Agentes (quem atende): recebem chamados, atualizam o status e resolvem.
- Administradores: organizam o sistema, categorias e departamentos, e definem quem pode fazer o quê.

## O que dá para fazer?
- Abrir chamados: você descreve o que precisa e cadastra o pedido.
- Acompanhar seus chamados: ver o status, atualizar informações e comentar.
- Comentários: trocar mensagens dentro do chamado, para manter tudo documentado.
- Categorias: organizar os chamados por tipo (por exemplo: TI, Financeiro, Suporte).
- Departamentos: separar chamados por áreas da empresa.

## Papéis (perfis de acesso)
- Usuário (USER): pode criar chamados e ver os seus próprios.
- Agente (AGENT): recebe chamados para atender, atualiza e acompanha os chamados atribuídos.
- Administrador (ADMIN): gerencia usuários, categorias e departamentos, e tem acesso a todos os chamados.

Esses perfis existem para garantir que cada pessoa tenha acesso apenas ao que precisa.

## Como você acessa?
- O sistema possui login com e-mail e senha. Depois do login, é gerado um “passe” (token) que mantém sua sessão ativa com segurança.
- Para usar com um site ou aplicativo, basta que o site se conecte à API (o “cérebro” do sistema) e siga as regras de acesso.

## Por que é útil?
- Organiza melhor as demandas da equipe.
- Facilita o acompanhamento: ninguém se perde, pois tudo está registrado.
- Transparência: você vê o andamento, comentários e histórico.
- Segurança: cada perfil acessa apenas o que é permitido.

## Exemplos práticos
- “Preciso de suporte de TI”: você abre um chamado. Um agente recebe, conversa com você pelos comentários, resolve e marca como concluído.
- “Quero uma nova categoria”: o administrador cria essa categoria para organizar melhor os pedidos.
- “Departamento novo”: o administrador cria e associa pessoas a esse departamento.

## Como começar a usar (resumo)
- Faça login com suas credenciais.
- Se você é Usuário: vá até a área de chamados e crie um novo.
- Se você é Agente: acesse seus chamados atribuídos e atualize o andamento.
- Se você é Administrador: organize usuários, categorias e departamentos.

## Dúvidas comuns
- “Posso ver chamados de outras pessoas?”
  - Usuários veem apenas os seus chamados.
  - Agentes veem chamados que foram atribuídos a eles.
  - Administradores veem todos os chamados.

- “Consigo editar um comentário de outra pessoa?”
  - Em geral, cada pessoa edita seus próprios comentários. Administradores podem ter permissões especiais conforme as regras da empresa.

## Conclusão
O ApiChamados ajuda a trazer ordem e clareza no atendimento de demandas. Ele é flexível, seguro e pensado para diferentes perfis de uso. Se você quer melhorar a organização dos pedidos na sua equipe, este sistema é um ótimo ponto de partida.