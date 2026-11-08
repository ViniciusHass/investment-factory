# Estado das fundações e próximos gates

**Verificação:** 2026-11-08. **Responsável:** Sol. **Natureza:** revisão, planejamento e acompanhamento da fundação frontend.

## Retomada de 2026-11-08

- A execução foi retomada depois das 10h locais; o relógio consultado no início indicava 12h59 em America/Sao_Paulo. Não houve execução às 10h comprovada por esta sessão.
- `git fetch`, `status` e `log` foram executados na Factory e nos repositórios de backend/frontend, incluindo os submódulos ativos do checkout de planejamento. O snapshot desta sessão estava em `ee03a60`; a branch local de trabalho foi atualizada por fast-forward para `33be152`, sem alteração de `main`.
- Frontend `origin/develop`: `bf151de`; o PR #3 foi integrado em 2026-11-07. Backend `origin/develop`: `49eb67c`. Factory PR #2 continua aberto de `docs/frontend-foundation-plan` para `main`; nenhum merge foi feito nesta retomada.
- No início da retomada, F02 / [INV-0003](../cards/INV-0003.md) estava RUNNING. O worktree `frontend-inv-0003`, branch `feat/inv-0003-shell-i18n`, continha implementação local não commitada preservada da execução anterior. Luna recebeu a responsabilidade de concluir e validar essas alterações.
- A checagem de pré-requisitos Spec Kit de `007-frontend-shell-i18n` passou com spec, plano e tarefas presentes. A análise cruzada cobriu 10 requisitos funcionais e 5 critérios de sucesso com 17 tarefas; nenhum conflito crítico foi encontrado.
- Não há resposta nova às perguntas de idioma e de abrangência da regra de `main` nos comentários do PR #2 consultados. pt-BR inicial e preferência explícita salva apenas no navegador continuam hipótese declarada. Nesta sessão, nenhum dos três repositórios terá merge em `main` sem autorização explícita após validação do MVP.
- A consulta à API pública do GitHub não encontrou PRs abertos de backend ou frontend. Backend permanece sem manifesto/OpenAPI no checkout inspecionado; o scaffold do proprietário não foi alterado.
- F03 permanece dependente de C01/C02 e do OpenAPI aceito. Não liberar implementação de cliente/telas financeiras com contratos ou valores inventados para contornar essas dependências.

## Resultado da retomada

- F02 / INV-0003 está DONE: [frontend PR #4](https://github.com/ViniciusHass/investment-frontend/pull/4) integrado por Sol a `develop`, merge `d3b4473`, após revisão técnica, inspeção visual e [CI foundation verde](https://github.com/ViniciusHass/investment-frontend/actions/runs/42501901783) no commit `3db937f`.
- Instalação limpa, lint, typecheck, 28 testes unitários, 16 testes Playwright/axe e build passaram localmente. A CI Linux também passou em todas as etapas, incluindo instalação do Chromium. A recuperação do lockfile após erro de normalização foi validada sem alterar versões preexistentes de F01.
- [INV-0004](../cards/INV-0004.md) registra manutenção BACKLOG para 10 advisories herdados em ferramentas de desenvolvimento; `npm audit --omit=dev` retornou zero. Nenhum upgrade maior foi feito sem seu próprio planejamento.
- C01 foi esclarecido pelo proprietário: scaffold pronto, caixa inicial zero, cadastro de posições e botão para recomendar ativos/quantidades. Sol definiu o contrato técnico; fonte e evidências estão na seção C01 abaixo. Nenhum requisito de endpoint/schema fica pendente do proprietário.
- Factory PR #2 permanece aberto; nenhum merge em `main` nos três repositórios e nenhum PR backend integrado por Sol.

## Estado observado

| Área | Evidência | Gate seguinte |
|---|---|---|
| Três repositórios | Factory, backend e frontend foram publicados como repositórios públicos em `ViniciusHass`. Backend/frontend têm `main` e `develop` remotos; URLs dos submódulos apontam para GitHub. Factory protege `main`; produtos protegem `main` e `develop`. | Finalizar contratos e cards antes das próximas funcionalidades de produto. |
| Backend do proprietário | Scaffold estrutural confirmado pronto pelo proprietário em 2026-11-08. O checkout publicado ainda contém estrutura/entry point sem manifesto executável; esta é uma observação técnica de implementação, sem invalidar o aceite do scaffold. | Sol prepara contratos e decompõe runtime/API em card próprio preservando a estrutura; o proprietário revisa o PR. |
| Frontend | INV-0002 e INV-0003 integrados a `develop` pelos PRs #3 e #4. Shell responsivo, pt-BR/en, estados compartilhados, testes de componente e Chromium/axe estão presentes; `main` ainda não recebeu o MVP. | F03 aguarda contratos e OpenAPI; INV-0004 aguarda planejamento específico de manutenção. |
| Spec Kit | `specify` 1.3.0 inicializado na Factory com integração Codex e scripts PowerShell. A constituição e os specs anteriores ficaram intactos; `specify check` passou. | Clarificar specs, produzir planos e tarefas e analisá-los antes de converter tarefas aceitas em cards READY. |
| Execução de agentes | `specify check` informou VS Code disponível, mas não encontrou Codex CLI. | Validar CLI/autenticação/modelos e Windows antes de prometer orquestração automática. A integração de skills instalada não prova execução automática. |
| Dados de mercado | Pesquisa inicial de fontes gratuitas para ações/ETFs dos EUA e ADR de ports/adapters concluídos como propostas. | Verificar licença, limites e amostras de API; escolher fonte, política de frescor, fallback e custo antes do adapter. |
| CI | PRs #1 e #2 de backend/frontend foram integrados a `develop`. O frontend PR #3 reativou o teste no job `foundation`; instalação, lint, typecheck, teste e build passaram. O backend ainda aguarda manifesto e primeiros testes. | Reativar teste backend quando houver testes reais e revisar gates de integração com o proprietário após o MVP. |

## Autoridade de merge confirmada

- Backend: cada PR de card para `develop` depende de aprovação do proprietário.
- Frontend: Sol pode autorizar e executar merge de PR de card para `develop` após CI e revisão técnica. Luna não faz merge.
- Ambos: promoção `develop → main` depende da avaliação do MVP e aprovação do proprietário.
- Nenhuma autoridade de merge dispensa regras de proteção no GitHub. As regras estão ativas, com `foundation` como check obrigatório; novos PRs seguem a autoridade de merge definida acima.

## Próxima sequência de trabalho arquitetural

1. Registrar no spec 002 a decisão de fonte/política de FX e fechar exemplos de qualidade de dados; revisar cobertura de preços de ações e ETFs dos EUA.
2. Completar a clarificação dos specs 001 e 005 sobre caixa, entradas sem histórico, resgates, proventos e precisão. Preservar valores originais e usar USD como consolidação inicial.
3. Criar planos e tarefas Spec Kit para contratos de carteira, mercado, ganho geral e rebalanceamento; executar análise de consistência. Converter somente tarefas aceitas em cards Factory com dependências, repositório e testes.
4. Com o scaffold backend executável, obter OpenAPI e alinhar o contrato frontend. F01 e F02 estão integrados em `develop`; a autorização geral do frontend mantém a exigência de Spec Kit, contratos e critérios por card, sem repetir aceite já concedido.
5. Tornar os checks backend executáveis quando houver manifests e scripts reais; o proprietário controla a promoção para `main`.
6. Após estabilizar os manifests e checks, detalhar SemVer independente para backend e frontend em card próprio; sem tags automáticas antes da política de release aprovada.

## Decisões ainda solicitadas

- Fonte e frescor do câmbio atual, direção compra/venda ou média, arredondamento e fallback.
- Escopo do ganho geral para dividendos, resgates e taxas; base de custo de posições sem histórico.
- Tratamento de caixa e instrumentos que cabem em mais de um ramo.
- Regras de score por tipo de instrumento e critérios de elegibilidade.
- Regras de proteção e checks disponíveis nos repositórios públicos GitHub.

## C01 — esclarecimento e contrato em 2026-11-08

O proprietário confirmou o scaffold pronto e atribuiu a Sol a definição técnica do contrato. O MVP começa com caixa zero, permite cadastrar posições existentes e informar um novo aporte; “Calcular investimento” deve mostrar o que comprar, quantidades, custos estimados e saldo. O orçamento é simulação, não depósito ou compra executada.

[INV-0005 / C01](../cards/INV-0005.md) conclui o desenho de [OpenAPI v0.1.0](../contracts/portfolio/v1/openapi.json), com plano/tarefas e análise Spec Kit. Validação executada: 36 schemas, 15 operações e 37 casos sintéticos (12 aceitos / 25 rejeitados), sem coerção e com invariantes de pesos/orçamento em aritmética exata. Treze operações são núcleo carteira/posições/metas; valuation e preview têm gates financeiros separados. Isso não representa endpoints implementados.

[INV-0006](../cards/INV-0006.md) registra a implementação backend em BACKLOG até sua decomposição técnica, com preservação do scaffold, persistência e testes de API/OpenAPI; o proprietário revisará o PR e nenhum agente fará merge backend. F03 passa a ter uma fonte versionada de contrato; export/conformidade da API e integração real continuam trabalho de implementação. Não exigir definição de schemas/endpoints pelo proprietário.

O proprietário respondeu: ações têm quantidades inteiras; investimentos que permitem frações, como CDB, seguem regras verificadas do produto. A pergunta foi encerrada, sem presumir mínimos/incrementos ou ampliar automaticamente cobertura de mercados. Provider/FX, score e taxas continuam gates de feature 004, sem dados inventados. Nenhum produto backend foi alterado e nenhuma main foi integrada nesta etapa de contrato.

## Quantidades e banco de dados — 2026-11-08

Ações inteiras e frações condicionadas ao produto estão confirmadas em [ADR0006](decisions/0006-product-quantity-rules.md). O [banco foi planejado](database-design.md) com tabelas, relacionamentos, originais textuais/numeric, revisões, concorrência, constraints, etapas Alembic e testes PG17. Nenhuma migration foi executada e nenhum scaffold backend foi alterado.

Contrato v0.2.0: 36 schemas, 15 operações, 42 casos sintéticos passaram (15 aceitos/27 rejeitados). INV-0006 inclui o plano de persistência, mantendo implementação não iniciada. A cobertura inicial continua US stock/ETF; o planejamento permite extensão para principal de CDB sem instrumentos/quotes falsos.

[Continuidade da automação](automation-continuity.md): sessões anteriores observadas são distintas; não foi confirmada a configuração atual de destino nem alterado o agendamento. Decisões, estado e PRs publicados são a fonte durável de retomada; o histórico de chat pode ser consultado explicitamente quando disponível.
