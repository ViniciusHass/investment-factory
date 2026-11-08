# Roadmap de longo prazo do frontend

**Estado:** roadmap aprovado pelo proprietário em 2026-11-04; cards, contratos e regras financeiras ainda exigem aceite próprio. **Arquiteto:** Sol. **Implementação:** Luna, apenas após cards prontos e aprovados. **Repositório de execução:** `investment-frontend`.

## Objetivo e limites

O produto é um planejador pessoal de carteira. A interface registra posições e metas, apresenta dados e elegibilidade de instrumentos, simula aportes e compara planejado com realizado. Não executa ordens nem promete retornos. FastAPI é a fonte autoritativa de cálculos, pontuação, conversão cambial e qualidade de dados; React pode calcular prévias de formulário, mas o servidor revalida tudo.

Este documento registra o **plano aprovado**. O aceite do roadmap não libera automaticamente o scaffolding ou outro card: cada execução exige dependências resolvidas, especificação aceita, contrato aplicável e testes esperados. Cada PR será revisado por Sol. O proprietário aprova merges de cards do backend; Sol pode autorizar e executar merges de cards do frontend para `develop` após CI e revisão técnica. A promoção de ambos os repositórios para `main` depende do proprietário.

## Estrutura encontrada

| Área | Estado atualizado em 2026-11-07 | Implicação |
|---|---|---|
| Factory | Três repositórios públicos foram publicados em `ViniciusHass`; os submódulos usam URLs GitHub. A Factory protege `main`; backend/frontend protegem `main` e `develop` com PR e check `foundation` obrigatório. | Os quatro PRs de bootstrap foram integrados em `develop`; testes serão reativados com os primeiros testes reais. Contratos de produto ainda estão pendentes. |
| Backend | Repositório irmão tem árvore inicial `src/` e `tests/`, um commit à frente do submódulo; sem `pyproject.toml`, migrações, modelos ou OpenAPI na inspeção | O scaffold pertence ao proprietário; contratos e ambiente executável ainda precisam ser acertados |
| Frontend | F01 e F02 integrados em frontend `develop` pelos PRs #3/#4; shell, pt-BR/en e testes Chromium/axe estão presentes | F03 usa contratos versionados; main aguarda MVP e autorização |
| Spec Kit | `specify` 1.3.0 inicializado com integração Codex e scripts PowerShell; constituição e specs originais preservadas | Clarificar specs, gerar planos e tarefas antes de promover cards a READY |
| Contratos | OpenAPI C01 versionado em `contracts/portfolio/v1/`, com schemas e fixtures verificados em 2026-11-08 | Implementação/export OpenAPI backend e integração real são cards distintos |

## Decisões do proprietário

- O backend recebe entradas em sua moeda original e as devolve com **o mesmo valor e moeda informados**. A moeda de consolidação é preferência da carteira, com padrão inicial **USD** e possibilidade de mudança futura. Distribuição e totais consolidados são calculados quando solicitados; cada valor convertido é separado da entrada original e mostra taxa, fonte e timestamp. Não se presume que existam contas de usuário no MVP; a preferência não fica presa a um usuário fixo.
- Interface inicial em **português e inglês**, com estrutura para adicionar idiomas. Textos não devem ficar espalhados em componentes. Idioma e moeda-base são preferências distintas.
- Descoberta de ativos ainda não possuídos fica **depois do MVP**. A arquitetura e os contratos podem acomodá-la, mas não haverá tela de busca ampla no primeiro fluxo.
- Todas as camadas da hierarquia podem ser omitidas. Um nó sem filhos é uma folha válida. Se um nó tiver filhos, seus pesos relativos devem somar exatamente 100%. O formulário mostra erro **vermelho**, textual e acessível quando a soma difere de 100%, e bloqueia o envio. O backend aplica a mesma regra.
- Quando uma camada é omitida, o investimento se liga diretamente ao nível anterior disponível (ou à raiz da carteira); o peso efetivo continua sendo o produto dos pesos relativos no caminho existente.
- O primeiro MVP usa dados reais dos **EUA para ações e ETFs**. REITs, mercado brasileiro e descoberta de investimentos ainda não possuídos ficam em fases posteriores, salvo nova decisão. Provedores candidatos gratuitos e seus limites estão em `docs/us-data-provider-research.md`.
- Aportes realizados são registrados por compra individual: ativo, quantidade, preço e data, com moeda e taxas a definir no contrato.
- A distribuição usa o valor atual das posições e câmbio atual válido na consulta. O frontend mostra percentual atual, meta e desvio. Ramos abaixo da meta são candidatos a aporte; ramos acima da meta não recebem recomendação de compra. Elegibilidade, limites e caixa ainda podem impedir uma compra abaixo da meta.
- No ganho geral do MVP, valor investido e valor atual são convertidos com o mesmo snapshot cambial atual. A interface informa essa convenção e não confunde o total convertido com os valores originais cadastrados.
- Docker Compose prioriza **desenvolvimento**.

## Jornadas de usuário

1. **Visão geral:** valor e composição atuais da carteira, metas e desvios, caixa disponível, status e data das cotações; no MVP, ganho geral como valor investido versus valor atual, diferença absoluta e percentual calculados com o mesmo câmbio atual.
2. **Metas:** editar a árvore flexível de alocação, ver pesos relativos e efetivos, erros de soma e prévia antes de salvar.
3. **Posições:** cadastrar/corrigir quantidade, instrumento, custo quando conhecido, moeda e data; distinguir posição informada pelo usuário de preço de mercado.
4. **Análise de investimentos possuídos:** ver elegibilidade, critérios, score 0–100 quando calculável, fontes, lacunas e dados antigos. Busca de ativos não possuídos é posterior.
5. **Aporte:** informar orçamento, ver ramos abaixo e acima da meta, inspecionar proposta explicável para ramos elegíveis abaixo da meta, restrições, caixa residual e desvios após o aporte. Salvar plano não executa compra.
6. **Realizado:** registrar aportes efetivos e comparar com o plano sem inferir compras a partir de preços.
7. **Histórico e cenários:** consultar snapshots e projeções com premissas, versões e timestamps explícitos.

Cada jornada precisa de estados vazio, carregando, erro, indisponível, dado antigo e sucesso. Tabelas numéricas acompanham gráficos.

## Arquitetura React + FastAPI

`React → cliente HTTP tipado → FastAPI → aplicação/domínio → adapters de provedores`. O navegador nunca acessa provedores financeiros nem recebe suas chaves. O backend valida e persiste a árvore, posições, avaliações e planos.

Estrutura sugerida para quando o frontend for aprovado:

```text
src/
  app/             rotas, composição, providers, estilos globais
  pages/           telas ligadas a rotas
  features/        allocation, holdings, scoring, contributions, history
  entities/        view models e mapeamento de DTOs
  shared/api/      cliente HTTP, tipos OpenAPI gerados, erros
  shared/i18n/     catálogos pt-BR/en, seleção de idioma
  shared/ui/       componentes visuais reutilizáveis
  shared/lib/      formatação e funções de apresentação
  test/            fixtures e handlers MSW
```

Features encapsulam componentes, hooks, formulários e testes. Composição entre features ocorre em `pages/`. DTOs gerados não são editados à mão. Estado de servidor usa cache de consulta; estado de formulário e navegação fica local. Sem store global no MVP.

### Bibliotecas propostas

O registro de decisão é `docs/decisions/0001-frontend-stack.md`. Versões exatas e licenças serão verificadas e fixadas no lockfile no card de scaffolding.

| Área | Escolha | Motivo |
|---|---|---|
| Base | React + TypeScript estrito + Vite | Stack acordada; configuração pequena |
| Rotas | React Router | Rotas aninhadas sem framework de servidor adicional |
| Estado remoto | TanStack Query | Cache, invalidação e erros de rede; o `as_of` do servidor determina frescor financeiro |
| Formulários | React Hook Form + Zod | Árvore dinâmica e erros por campo; backend revalida |
| UI | CSS Modules, variáveis CSS, HTML semântico | Sistema visual leve e acessível |
| Gráficos | Recharts quando houver histórico real | API simples; sempre com tabela equivalente |
| API | `openapi-typescript` + wrapper `fetch` | Tipos derivados do OpenAPI aceito, tratamento uniforme de erros |
| Idiomas | i18next + react-i18next, catálogos pt-BR/en | Troca de idioma em tempo de execução e expansão futura |
| Formatação | `Intl` com idioma e moeda independentes | Número, data e moeda sem embutir BRL nas telas |
| Testes | Vitest, Testing Library, MSW, Playwright, axe | Componentes, integração, jornadas e acessibilidade |

### Componentes e design

Tokens: tipografia, espaçamento, cores, contraste, foco e breakpoints. Componentes básicos: `AppShell`, `PageHeader`, `Breadcrumbs`, `Card`, `DataTable`, `StatusBadge`, `Money`, `Percent`, `Timestamp`, `FormField`, `ErrorSummary`, `EmptyState`, `LoadingState` e `ConfirmDialog`. Componentes de domínio: `AllocationTree`, `HoldingsForm`, `ScoreBreakdown`, `ContributionForm`, `RecommendationTable`, `AssumptionPanel` e `HistoryChart`.

Priorizar WCAG 2.2 AA: rótulos visíveis, foco perceptível, teclado, mensagens associadas aos campos, foco após diálogo, texto para estados além de cor e revisão manual com leitor de tela. Erro de soma aparece em vermelho e por texto; `aria-describedby`/resumo de erros anunciam a falha. Layout móvel mantém todos os valores importantes, inclusive em tabelas.

Valores monetários usam decimal textual ou unidade menor segundo contrato, sem cálculo financeiro com `number` no navegador. A formatação separa valor bruto, idioma e moeda. Formulários e detalhes retornam o valor/moeda originais; totais consolidados aparecem em campos separados com câmbio e data. Ausente, zero, erro e antigo são estados distintos. Toda projeção mostra premissas e não sugere retorno garantido.

## Contratos FastAPI necessários

Os recursos abaixo são propostas, **não endpoints existentes**. Antes do cliente tipado, aprovar schemas versionados em Factory e exportar OpenAPI do backend.

| Recurso | Campos/semântica mínima | Tela |
|---|---|---|
| Carteira e preferências | ID estável; moeda de consolidação configurável com padrão inicial USD; idioma pt-BR/en; configuração sem exigir conta de usuário agora | shell, visão geral |
| Metas | árvore de nós, pai, tipo opcional, peso relativo/efetivo, versão e validação de irmãos | editor |
| Posições e entradas | instrumento, quantidade quando aplicável; valor decimal, moeda e data originais; tipo de entrada; valor de mercado e total convertido calculado sob demanda em campos separados; compras individuais informadas | posições |
| Mercado/FX | identificador normalizado, bolsa, país, moeda, unidade, fonte, `as_of`, `collected_at`, qualidade e motivo de ausência; câmbio com par, direção, fonte/data e versão da política | visão geral, detalhes |
| Avaliação | versão de regras, gates, motivos, estado elegível/inelegível/insuficiente, critérios e score opcional | scoring |
| Plano de aporte | orçamento, moeda, snapshot e versão do cálculo, alocações, limites, razões, caixa restante, desvio antes/depois | simulador |
| Realizado | referência opcional ao plano, compras informadas, data, valores e divergências | reconciliação |
| Ganho geral | valor investido e atual convertidos pelo mesmo câmbio atual, diferença absoluta e percentual em USD; datas, qualidade e convenção visíveis; sem divisão por zero | visão geral |
| Histórico/cenário | snapshots, premissas, versão, taxas de câmbio e ausência explícita de séries | histórico |

Contratos também devem fixar paginação, filtros, erros estruturados, `null`, idempotência, concorrência na edição de metas, cache e frescor. `VITE_API_BASE_URL` guarda apenas a URL do FastAPI; nenhum segredo entra em variável `VITE_`. CORS usa origens locais configuradas no backend. O cliente trata timeout/abort e nunca transforma ausência em zero. CI compara tipos gerados com OpenAPI aceito.

## Milestones e dependências

Faixas são estimativas de esforço, **não datas**; não incluem espera por contratos ou decisões.

| Marco | Resultado | Pré-requisito | Esforço |
|---|---|---|---|
| M0 — especificações e contratos | decisões pendentes resolvidas; ADR e schemas aceitos | respostas do proprietário, pesquisa de provedores dos EUA, revisão do backend | 1–3 semanas |
| M1 — fundação | Vite, TS, testes, i18n, tokens e shell responsivo | roadmap aprovado, F01 aceito, Git/CI; contratos de M0 podem avançar em paralelo | 1–2 semanas |
| M2 — metas | API tipada, visão geral e editor da árvore | contrato e endpoints de carteira | 2–4 semanas |
| M3 — posições e ganho geral | CRUD, atual versus alvo e resumo investido versus atual | posição, valuation, FX e regra de ganho aprovada | 2–3 semanas |
| M4 — scoring de ativos possuídos | proveniência, gates e score | adapters, regras e contrato | 2–4 semanas |
| M5 — aporte e realizado | simulação, plano e comparação | algoritmo e contratos aprovados | 3–5 semanas |
| M6 — histórico | snapshots e cenários acessíveis | persistência e premissas | 2–4 semanas |
| M7 — descoberta | instrumentos não possuídos | decisão pós-MVP, cobertura/licença | a estimar |

Fluxo principal: `M0 + M1 → M2 → M3 → M4 → M5 → M6`. O scaffold F01 pode ocorrer em paralelo à definição dos contratos de M0 após aceite do card; telas que consomem API aguardam contratos e backend reais. Pesquisa de provedores pode seguir em paralelo à fundação. Trabalho simultâneo em repositórios requer worktrees próprios.

## Cards propostos — BACKLOG

Os códigos são provisórios. Após Spec Kit `clarify → plan → tasks → analyze`, criar cards rastreáveis em `cards/` com spec, repositório, dependências, testes e Definition of Done. Intervalos em dias úteis de execução.

| Card | Repo / spec | Dependências | Critério de aceite e prova | Esforço |
|---|---|---|---|---|
| C01 — contrato de carteira | Factory / 001 | regras de árvore e moeda | schemas de metas/preferências/posições, entrada monetária original e conversão sob demanda separadas, padrão USD, exemplos válidos e inválidos, validação de soma só para nós com filhos | 2–4 d |
| C02 — mercado e qualidade | Factory / 002; evoluir INV-0001 | pesquisa de licença/cobertura dos EUA | IDs, unidades, FX, fonte, timestamps, ausente/antigo e exemplos validados; decisão de provedor gratuita documentada | 3–5 d |
| C03 — score e aporte | Factory / 003, 004 | C01, C02, regras financeiras | estados e razões, snapshots, versões e limites documentados com cenários de contrato | 3–6 d |
| C04 — contrato de ganho geral | Factory / 005 | C01, C02, política de FX e custo | fórmula com mesmo câmbio atual para investido e atual; ganho/perda/zero, moedas e qualidade documentados; exemplos validados | 2–4 d |
| F01 — scaffold e gates | Frontend / 006, card INV-0002 | roadmap aprovado, Git/proteções e card aceito; contratos de API não necessários nesta fatia | app inicia; lint, teste, typecheck e build passam; README de execução; sem dado financeiro fictício em produção | 2–3 d |
| F02 — shell, UI e i18n | Frontend / 001 | F01 | rotas, layout móvel/desktop, pt-BR/en completos, troca de idioma e estados compartilhados; teclado/axe | 3–5 d |
| F03 — cliente OpenAPI | Frontend / 001, 002 | F01, C01, C02, OpenAPI | tipos gerados, erros/abort/frescor, MSW de sucesso/falha e CI de divergência | 3–5 d |
| F04 — metas e overview | Frontend / 001 | F02, F03, endpoint | árvore opcional; folha válida; soma !=100 vermelha e acessível bloqueia requisição; persistência e reabertura; teste de jornada | 5–8 d |
| F05 — posições | Frontend / 001 | F03, F04, contrato FX | cria/edita posição e entrada em moeda original, distingue aporte, custo, cotação e total convertido; nova taxa não altera campo original; testes de decimal e teclado | 4–7 d |
| F11 — ganho total do MVP | Frontend / 005 | F05, C04 e endpoint de resumo | mostra valor investido, valor atual, diferença absoluta e percentual gerais em USD; estados ausente/sem base/FX antigo explícitos; nenhuma divisão por zero | 3–5 d |
| F06 — score dos possuídos | Frontend / 002, 003 | C02, C03, F03, backend | mostra fontes/gates, diferencia insuficiente de zero; testes de estados | 5–8 d |
| F07 — simulação | Frontend / 004 | F04–F06, C03, backend | orçamento respeitado, abaixo/acima da meta e razões visíveis, sem recomendar compra em ramo já acima da meta; saldo, desvios, snapshot e restrições testados | 6–10 d |
| F08 — plano/realizado | Frontend / 004 | F07, contrato realizado | registra cada compra com ativo, quantidade, preço e data sem assumir execução; mostra diferenças por ativo, moeda e data; teste de reconciliação | 4–7 d |
| F09 — histórico | Frontend / 004 e spec futura | F08, premissas | tabela/gráfico equivalentes, timestamps e hipóteses; vazio/acessibilidade testados | 5–8 d |
| F10 — descoberta pós-MVP | Frontend / 002 | M7, contrato de busca | busca limitada à cobertura aprovada e estados de qualidade; teste de filtros/erro | a estimar |

**Definition of Done:** spec e contrato aceitos; critérios reproduzíveis; testes relevantes, lint, typecheck e build passando; documentação de uso/limites atualizada; evidências apresentadas; revisão Sol; branch/worktree próprio criado de `develop`; PR para `develop` com CI; Sol pode autorizar/efetuar merge de card frontend após sua revisão, enquanto backend e promoções para `main` dependem da aprovação do proprietário.

## Testes, manutenção e ensino

- Unitários: formatação, tradução, validação de formulário, mapeamento de qualidade e cálculos apenas de apresentação.
- Componentes: interação de teclado, estados de erro/vazio/antigo, mensagens e axe.
- Integração: MSW com fixtures versionadas para sucesso, validação, timeout e dados ausentes; mocks não substituem teste de contrato real.
- Contrato: OpenAPI exportado do FastAPI e tipos gerados comparados em CI; backend valida exemplos e status.
- E2E: Playwright para cadastrar meta, posição, simular aporte e registrar realizado, quando APIs existirem.
- Gates de PR: lint, typecheck, testes e build; E2E para fluxos integrados. Conferir bundle e dependências a cada milestone.

GitHub Actions tem o check obrigatório `foundation`. F01 adicionou o primeiro teste significativo e reativou `npm run test -- --run`: uma falha controlada bloqueou o PR #3, e a correção posterior passou por instalação, lint, typecheck, teste e build. No backend, o primeiro card com testes reais deverá reativar `uv run pytest tests` após o proprietário concluir o manifesto uv. Depois do teste manual do MVP, revisaremos juntos os testes de integração e os gates de promoção. O fluxo de branches e CI está no ADR 0003.

O README do frontend deve ensinar o mapa de pastas, o caminho de uma requisição, como criar uma feature, como executar testes e como adicionar tradução. Componentes novos precisam de responsabilidade clara; evitar abstrações antes de haver uso concreto.

Commits futuros de backend/frontend serão atômicos, em branches GitFlow por card, conforme ADR 0005. A adoção de SemVer para releases independentes será detalhada depois que manifests e CI estiverem estáveis; o roadmap não autoriza tags ou releases automáticas.

## Decisões ainda pendentes

1. Como representar caixa e instrumentos que cabem em mais de uma categoria? Ramos omitidos têm ligação direta e soma de filhos decididas.
2. USD é o padrão inicial de consolidação; distribuição e ganho geral usam câmbio atual (o ganho aplica o mesmo câmbio a investido e atual). Faltam fonte, tipo de taxa, limite de frescor, arredondamento e regra para simulações. A entrada original sempre permanece em sua própria moeda.
3. EUA, ações e ETFs entram primeiro. Ainda é preciso definir bolsas específicas, métricas obrigatórias e prazo de frescor aceitável; fontes gratuitas candidatas precisam de prova prática e revisão de licença.
4. Quais scorecards, gates e pesos por classe/setor? Dados insuficientes não são score zero.
5. O realizado será registrado por compra individual. Ainda é preciso definir frações, taxas, impostos, dividendos e caixa residual.
6. Quais horizonte e premissas de cenários? Não calcular retorno hipotético sem escolha explícita.
7. Remotes, URLs dos submódulos e proteção de branches estão configurados. O check `foundation` passa; testes de produto serão exigidos quando os primeiros testes reais forem implementados.

## Próximo passo

F01 está concluído em frontend `develop`. Prosseguir com Spec Kit 1.3.0 nos contratos e specs pendentes, sem sobrescrever a constituição: especificações → clarificações → planos → tarefas → análise. Converter tarefas aceitas em cards Factory antes de liberar F02 e os recursos que consomem FastAPI.

## Contrato C01 e entrada de aporte — 2026-11-08

O proprietário confirmou o scaffold pronto e atribuiu a Sol o contrato técnico. O MVP começa com caixa zero e permite cadastrar posições existentes e informar quanto investir. O botão “Calcular investimento” retorna investimentos, quantidades, custos estimados e saldo, sem executar ou registrar compras. Ver [C01](../contracts/portfolio/v1/README.md). Whole/fractional-unit policy é uma pergunta de negócio pendente; nenhuma política foi inferida a partir do schema decimal. Endpoints ainda dependem de implementação backend, não da definição de contrato pelo proprietário.
