# ADR 0005 — Commits atômicos, GitFlow e SemVer

**Data:** 2026-11-04
**Estado:** política de commits confirmada para trabalho futuro; implantação de SemVer planejada para etapa posterior.

## Contexto

Backend e frontend têm branches `main` e `develop`, PRs por card e checks obrigatórios. O proprietário pediu que os próximos commits de produto sejam atômicos e sigam GitFlow. Os commits de infraestrutura já publicados não precisam ser reescritos. O proprietário também confirmou que deseja adotar SemVer depois.

## Decisão sobre commits

- Cada commit futuro em backend ou frontend representa uma mudança coerente que pode ser entendida e revisada isoladamente. Evitar misturar política de agentes, CI, Docker e código de produto no mesmo commit quando forem assuntos independentes.
- Usar mensagens no padrão Conventional Commits já presente nos repositórios, por exemplo `feat:`, `fix:`, `chore:`, `docs:` ou `ci:`, com assunto objetivo.
- Cada implementação aprovada usa branch e worktree próprios a partir de `develop`; o PR do card aponta para `develop`. A autoridade de merge continua no ADR 0003.
- Commits feitos por agentes usam autor `Codex <codex@users.noreply.github.com>` por comando ou configuração local ao worktree. A identidade global do proprietário não é alterada. Commits já publicados com outro autor permanecem como estão; não usar amend nem force push para reescrevê-los.

## Plano de SemVer, ainda sem implantação

Backend e frontend terão versões independentes no formato `MAJOR.MINOR.PATCH`. A versão de cada repositório será registrada em seu manifesto e confirmada por uma tag Git quando uma release for aprovada. A política exata para versões `0.x`, o marco `1.0.0`, notas de release e automação de tags será definida em card próprio depois que os manifests, testes e branches protegidas estiverem estáveis. Nenhum commit de card cria tag automaticamente; o proprietário aprova a promoção `develop → main` e a release do MVP.

## Critérios para o futuro card de versionamento

- Definir a versão inicial de cada produto e a regra para incremento major, minor e patch, com exemplos de mudanças do projeto.
- Manter manifesto, tag e notas de release consistentes; impedir tag de release em commit não aprovado de `main`.
- Testar que a pipeline detecta divergência entre versão do manifesto e tag quando uma release for preparada.
- Documentar como corrigir uma release sem force push nem alterar histórico publicado.
