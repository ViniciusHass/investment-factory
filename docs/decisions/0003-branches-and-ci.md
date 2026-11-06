# ADR 0003 — Branches de implementação e CI

**Data:** 2026-11-03
**Estado:** fluxo e autoridades de merge confirmados pelo proprietário. Os três repositórios são públicos no GitHub. Factory protege `main`; backend/frontend protegem `main` e `develop`, com PR, check `foundation` obrigatório e bloqueio de force push/exclusão. A conta do proprietário é a única exceção de bypass configurada.

## Contexto

Backend e frontend são repositórios distintos e submódulos da Factory. O proprietário quer uma branch `develop` em cada um, uma branch isolada por implementação, testes no GitHub Actions e validação pessoal do MVP antes da integração final. Sol recebe autoridade restrita para merges de cards do frontend em `develop`.

## Fluxo proposto

1. `main` representa uma versão aprovada. `develop` integra cards aceitos em cada repositório de produto.
2. Cada card aprovado cria uma branch e um worktree próprios a partir da ponta atual de `develop`. Nome sugerido: `feat/INV-<id>-<resumo>` ou `fix/INV-<id>-<resumo>`. A branch não é criada no checkout compartilhado do submódulo.
   Os próximos commits de backend/frontend serão atômicos e seguirão o padrão de mensagem existente; veja ADR 0005. Os commits já publicados não serão reescritos.
3. Luna implementa e testa o card. Sol revisa spec, contrato, evidências e diferenças. O PR aponta para `develop` do mesmo repositório. CI precisa passar. No backend, o proprietário aprova o merge. No frontend, Sol pode autorizar e executar o merge do card após sua revisão técnica. Luna nunca faz merge.
4. Mudanças de contrato que afetam backend e frontend usam cards dependentes e PRs separados. O Factory registra o vínculo e só atualiza ponteiros de submódulo para commits aceitos, em uma alteração própria.
5. Ao completar o MVP, o proprietário executa testes manuais. Revisamos juntos o conjunto final de gates da pipeline. A promoção de `develop → main` em backend e frontend depende da autorização do proprietário; Sol não a executa autonomamente.

## GitHub Actions em etapas

- **Quando houver manifests executáveis:** workflow por repositório em PR para `develop` e push em `develop`. Backend com uv/lockfile, lint, typecheck e testes; frontend com instalação pelo lockfile, lint, typecheck, testes e build. Não bloquear o scaffold atual com comandos que ainda não existem.
- **Quando houver contratos FastAPI:** checar OpenAPI, geração de tipos e testes de contrato. Dados financeiros externos são simulados nos testes; credenciais de provedores não são necessárias para PRs.
- **Antes da integração final do MVP:** acrescentar ou ajustar testes de integração/E2E com banco de teste, revisar tempo de execução e proteção de branches com o proprietário. O teste manual do proprietário é um gate separado e explícito.
- Workflows de backend e frontend foram integrados a `develop` pelos PRs #1. O job inicial `foundation` valida arquivos essenciais e passa sem manifests, deixando explícitos os checks adiados. Quando os manifests aparecem, instala dependências e executa os checks de código disponíveis; nenhum teste é declarado como executado antes de existir. O primeiro card com testes reais reativa a etapa de testes. Nenhum workflow recebe permissão para fazer merge ou bypass.

## Critérios de aceite para cards de CI

- **CI-B01 (backend):** após `pyproject.toml` e `uv.lock` do proprietário, PR de teste mostra instalação reproduzível, lint/typecheck/testes e falha ao introduzir erro controlado; sem segredos em logs.
- **CI-F01 (frontend):** após scaffolding aprovado e lockfile, PR de teste mostra lint/typecheck/testes/build e falha ao introduzir erro controlado; sem chaves de dados no bundle.
- **CI-I01 (integração do MVP):** contratos e cenários críticos validados contra FastAPI e banco descartável; instruções de teste manual, evidências e política de merge final revisadas com o proprietário.

## Consequências

`develop` pode conter trabalho aceito para integração antes de `main`; apenas o proprietário decide quando promover. A delegação de merge ao Sol limita-se a PRs de cards do frontend para `develop`, com CI e revisão técnica completos. Worktrees isolam implementações; submódulos não isolam checkouts simultâneos. A publicação dos remotes não substitui regras de proteção nem checks executados.
