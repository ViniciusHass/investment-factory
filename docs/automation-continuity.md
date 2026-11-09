# Continuidade entre execuções da automação

**Verificação:** 2026-11-08. Este registro distingue observação local de configuração não confirmada. Não implementa um scheduler da Factory.

## O que foi observado

O histórico disponível mostra sessões/worktrees distintos de planejamento do projeto em 4, 5, 6 e 7 de novembro. Nesta retomada de 8 de novembro, Sol consultou explicitamente a sessão anterior para recuperar o contexto; não presumiu que todo o chat anterior tivesse sido carregado automaticamente.

Foi localizado um registro histórico de atualização da automação das 10h, mas o trecho recuperável de configuração estava truncado e não comprovava seu destino naquele momento. As ferramentas de gerenciamento do agendamento não estavam disponíveis naquela sessão. A configuração foi confirmada posteriormente, como registrado abaixo.

## Configuração confirmada posteriormente em 2026-11-08

Nesta conversa, `listAutomations` confirmou uma automação habilitada no Local Agent Host para o workspace `investment-factory`, com execução diária às 10h locais. O prompt foi atualizado para **primeiro reconstruir o dia calendário anterior (00:00–23:59 em `America/Sao_Paulo`)** a partir de mensagens/decisões, commits, PRs, CI, cards e tarefas dos três repositórios; só depois deve escolher novo trabalho. A execução precisa verificar o estado remoto porque os snapshots do prompt envelhecem.

O estado remoto observado nesta atualização já inclui F02/INV-0003 integrado em frontend `develop` pelo PR #4, e C01/INV-0005 concluído como contrato técnico na Factory. Factory PR #2 segue aberto para revisão; `main` não recebeu o MVP. A automação preserva a agenda das 10h e foi atualizada apenas no prompt. Por ser uma tarefa local, depende do computador e do aplicativo em execução, conforme a [documentação oficial](https://learn.chatgpt.com/docs/automations).

A [documentação oficial](https://learn.chatgpt.com/docs/automations?surface=app) distingue tarefas independentes, que começam novos chats a partir do prompt salvo, e tarefas vinculadas a um chat existente, que usam seu contexto. O histórico local é compatível com execuções separadas; essa é uma inferência, não leitura da configuração atual.

## Fonte durável de continuidade

Uma nova sessão não deve depender de decisões guardadas somente no chat. Antes de agir:

1. Ler as instruções do repositório, [handoff](../SOL_HANDOFF.md), constituição, arquitetura, roadmap e spec/card vigente.
2. Fazer fetch/status/log nos três repositórios; inspecionar PRs e worktrees para identificar estado publicado e trabalho não commitado de outras sessões.
3. Enquanto Factory PR #2 estiver aberto, consultar o planejamento atual de `origin/docs/frontend-foundation-plan`; `main` continua aguardando MVP/autorização e pode conter um snapshot antigo. Não sobrescrever o trabalho local para alinhar branches.
4. Ler [estado das fundações](foundation-status.md), os cards e seus commits/testes. Consultar sessões anteriores explicitamente quando disponível e necessário para resolver uma lacuna; registrar no repositório a decisão recuperada.
5. Ao encerrar, publicar decisões, estado, testes realmente executados, PR/commit, bloqueios e próximo passo. Trabalho feito apenas em um chat ou worktree não publicado não é considerado automaticamente disponível a outra execução.

As decisões atuais de quantidade estão no [ADR0006](decisions/0006-product-quantity-rules.md): ações inteiras e produtos fracionáveis conforme regras verificadas. O [plano do banco](database-design.md) e o contrato C01 acompanham essas decisões. Não repetir ao proprietário perguntas já respondidas nos registros atuais.

Nenhum horário, frequência ou destino do agendamento foi alterado. O prompt agora exige a leitura do dia anterior antes de continuar. O futuro orquestrador Python da Factory continua sendo trabalho distinto.
