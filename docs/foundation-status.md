# Estado das fundações e próximos gates

**Verificação:** 2026-11-03. **Responsável:** Sol. **Natureza:** revisão e planejamento; nenhuma implementação de produto ou merge.

## Estado observado

| Área | Evidência | Gate seguinte |
|---|---|---|
| Três repositórios | Factory, backend e frontend foram publicados como repositórios públicos em `ViniciusHass`. Backend/frontend têm `main` e `develop` remotos; URLs dos submódulos apontam para GitHub. Factory protege `main`; produtos protegem `main` e `develop`. | Finalizar contratos, cards e testes antes de trabalho de implementação. |
| Backend do proprietário | Repositório irmão contém árvore `src/api`, `src/domain`, `src/aplication`, `src/infrastruct` e `tests`. `src/main.py` contém apenas um comentário. Não foram encontrados `pyproject.toml`, `uv.lock`, modelos, migrações ou OpenAPI. Alguns arquivos chamados `__init__,py` têm vírgula antes de `py`, e `aplication`/`infrastruct` podem ser nomes provisórios. | Proprietário confirma ou conclui o scaffold; Sol revisa contratos e organização sem sobrescrever o trabalho dele. O Dockerfile da API aguarda `pyproject.toml`, `uv.lock` e `src.main:app`. |
| Frontend | Ainda sem scaffold React/Vite; roadmap aprovado em 2026-11-04. | Specs/cards e contratos devem ser aceitos antes de F01 ou delegação. |
| Spec Kit | `specify` 1.3.0 inicializado na Factory com integração Codex e scripts PowerShell. A constituição e os specs anteriores ficaram intactos; `specify check` passou. | Clarificar specs, produzir planos e tarefas e analisá-los antes de converter tarefas aceitas em cards READY. |
| Execução de agentes | `specify check` informou VS Code disponível, mas não encontrou Codex CLI. | Validar CLI/autenticação/modelos e Windows antes de prometer orquestração automática. A integração de skills instalada não prova execução automática. |
| Dados de mercado | Pesquisa inicial de fontes gratuitas para ações/ETFs dos EUA e ADR de ports/adapters concluídos como propostas. | Verificar licença, limites e amostras de API; escolher fonte, política de frescor, fallback e custo antes do adapter. |
| CI | Workflows de bootstrap estão em PRs de rascunho. Os jobs `foundation` passaram após validar a estrutura; a troca do check obrigatório anterior `tests` nas regras GitHub depende de reautenticação do proprietário na interface. | Concluir a troca para `foundation`; reativar etapas de testes assim que existirem os primeiros testes reais e então revisar gates de integração com o proprietário. |

## Autoridade de merge confirmada

- Backend: cada PR de card para `develop` depende de aprovação do proprietário.
- Frontend: Sol pode autorizar e executar merge de PR de card para `develop` após CI e revisão técnica. Luna não faz merge.
- Ambos: promoção `develop → main` depende da avaliação do MVP e aprovação do proprietário.
- Nenhuma autoridade de merge dispensa regras de proteção no GitHub. As regras estão ativas; durante a troca de check obrigatório, não usar bypass para integrar PRs.

## Próxima sequência de trabalho arquitetural

1. Registrar no spec 002 a decisão de fonte/política de FX e fechar exemplos de qualidade de dados; revisar cobertura de preços de ações e ETFs dos EUA.
2. Completar a clarificação dos specs 001 e 005 sobre caixa, entradas sem histórico, resgates, proventos e precisão. Preservar valores originais e usar USD como consolidação inicial.
3. Criar planos e tarefas Spec Kit para contratos de carteira, mercado, ganho geral e rebalanceamento; executar análise de consistência. Converter somente tarefas aceitas em cards Factory com dependências, repositório e testes.
4. Com o scaffold backend executável, obter OpenAPI e alinhar o contrato frontend. O frontend só começa após aprovação do roadmap e cards.
5. Tornar os checks de CI executáveis quando houver manifests e scripts reais; o proprietário controla a promoção para `main`.
6. Após estabilizar os manifests e checks, detalhar SemVer independente para backend e frontend em card próprio; sem tags automáticas antes da política de release aprovada.

## Decisões ainda solicitadas

- Fonte e frescor do câmbio atual, direção compra/venda ou média, arredondamento e fallback.
- Escopo do ganho geral para dividendos, resgates e taxas; base de custo de posições sem histórico.
- Tratamento de caixa e instrumentos que cabem em mais de um ramo.
- Regras de score por tipo de instrumento e critérios de elegibilidade.
- Regras de proteção e checks disponíveis nos repositórios públicos GitHub.
