# Estado das fundações e próximos gates

**Verificação:** 2026-11-07. **Responsável:** Sol. **Natureza:** revisão, planejamento e acompanhamento da fundação frontend.

## Estado observado

| Área | Evidência | Gate seguinte |
|---|---|---|
| Três repositórios | Factory, backend e frontend foram publicados como repositórios públicos em `ViniciusHass`. Backend/frontend têm `main` e `develop` remotos; URLs dos submódulos apontam para GitHub. Factory protege `main`; produtos protegem `main` e `develop`. | Finalizar contratos e cards antes das próximas funcionalidades de produto. |
| Backend do proprietário | Repositório irmão contém árvore `src/api`, `src/domain`, `src/aplication`, `src/infrastruct` e `tests`. `src/main.py` contém apenas um comentário. Não foram encontrados `pyproject.toml`, `uv.lock`, modelos, migrações ou OpenAPI. Alguns arquivos chamados `__init__,py` têm vírgula antes de `py`, e `aplication`/`infrastruct` podem ser nomes provisórios. | Proprietário confirma ou conclui o scaffold; Sol revisa contratos e organização sem sobrescrever o trabalho dele. O Dockerfile da API aguarda `pyproject.toml`, `uv.lock` e `src.main:app`. |
| Frontend | INV-0002 implementado pela Luna e integrado a `develop` pelo PR #3 após CI e revisão do Sol. React/Vite, TypeScript estrito, lockfile e teste de UI estão presentes; `main` ainda não recebeu o MVP. | F02 exige card próprio aceito; integração FastAPI aguarda contratos e OpenAPI. |
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
4. Com o scaffold backend executável, obter OpenAPI e alinhar o contrato frontend. O próximo card frontend precisa de aceite próprio; F01 está integrado em `develop`.
5. Tornar os checks backend executáveis quando houver manifests e scripts reais; o proprietário controla a promoção para `main`.
6. Após estabilizar os manifests e checks, detalhar SemVer independente para backend e frontend em card próprio; sem tags automáticas antes da política de release aprovada.

## Decisões ainda solicitadas

- Fonte e frescor do câmbio atual, direção compra/venda ou média, arredondamento e fallback.
- Escopo do ganho geral para dividendos, resgates e taxas; base de custo de posições sem histórico.
- Tratamento de caixa e instrumentos que cabem em mais de um ramo.
- Regras de score por tipo de instrumento e critérios de elegibilidade.
- Regras de proteção e checks disponíveis nos repositórios públicos GitHub.
