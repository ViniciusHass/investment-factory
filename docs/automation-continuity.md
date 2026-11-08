# Continuidade entre execuções da automação

**Verificação:** 2026-11-08. Este registro distingue observação local de configuração não confirmada. Não implementa um scheduler da Factory.

## O que foi observado

O histórico disponível mostra sessões/worktrees distintos de planejamento do projeto em 4, 5, 6 e 7 de novembro. Nesta retomada de 8 de novembro, Sol consultou explicitamente a sessão anterior para recuperar o contexto; não presumiu que todo o chat anterior tivesse sido carregado automaticamente.

Foi localizado um registro histórico de atualização da automação das 10h, mas o trecho recuperável de configuração está truncado e não comprova seu destino atual. As ferramentas de gerenciamento do agendamento não estão disponíveis nesta sessão. Portanto, não há confirmação de que o agendamento atual continue este mesmo chat.

A [documentação oficial](https://learn.chatgpt.com/docs/automations?surface=app) distingue tarefas independentes, que começam novos chats a partir do prompt salvo, e tarefas vinculadas a um chat existente, que usam seu contexto. O histórico local é compatível com execuções separadas; essa é uma inferência, não leitura da configuração atual.

## Fonte durável de continuidade

Uma nova sessão não deve depender de decisões guardadas somente no chat. Antes de agir:

1. Ler as instruções do repositório, [handoff](../SOL_HANDOFF.md), constituição, arquitetura, roadmap e spec/card vigente.
2. Fazer fetch/status/log nos três repositórios; inspecionar PRs e worktrees para identificar estado publicado e trabalho não commitado de outras sessões.
3. Enquanto Factory PR #2 estiver aberto, consultar o planejamento atual de `origin/docs/frontend-foundation-plan`; `main` continua aguardando MVP/autorização e pode conter um snapshot antigo. Não sobrescrever o trabalho local para alinhar branches.
4. Ler [estado das fundações](foundation-status.md), os cards e seus commits/testes. Consultar sessões anteriores explicitamente quando disponível e necessário para resolver uma lacuna; registrar no repositório a decisão recuperada.
5. Ao encerrar, publicar decisões, estado, testes realmente executados, PR/commit, bloqueios e próximo passo. Trabalho feito apenas em um chat ou worktree não publicado não é considerado automaticamente disponível a outra execução.

As decisões atuais de quantidade estão no [ADR0006](decisions/0006-product-quantity-rules.md): ações inteiras e produtos fracionáveis conforme regras verificadas. O [plano do banco](database-design.md) e o contrato C01 acompanham essas decisões. Não repetir ao proprietário perguntas já respondidas nos registros atuais.

Nenhum horário, frequência, destino ou configuração de memória do agendamento foi alterado nesta etapa. O futuro orquestrador Python da Factory continua sendo trabalho distinto.
