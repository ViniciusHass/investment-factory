# ADR 0001 — Stack do frontend

**Data:** 2026-11-03
**Estado:** direção aprovada com o roadmap em 2026-11-04; versões exatas e contratos ainda dependem dos cards.

## Contexto

O produto é um planejador pessoal com frontend React + TypeScript e FastAPI como fonte de dados e cálculos. O proprietário está aprendendo React. São necessários formulários hierárquicos, duas línguas, dados remotos com qualidade explícita, acessibilidade e contratos tipados.

## Decisão proposta

Usar React + TypeScript estrito + Vite; React Router; TanStack Query; React Hook Form + Zod; CSS Modules e variáveis CSS; `openapi-typescript` com `fetch` encapsulado; i18next + react-i18next com catálogos pt-BR/en; `Intl` para moeda e datas; Vitest, Testing Library, MSW, Playwright e axe para testes. Recharts só quando houver dados históricos reais. A moeda de consolidação será configurável, começando em USD, e independente do idioma. Entradas mantêm valor e moeda originais, conforme ADR 0002. Versões exatas e licenças serão verificadas no card F01.

## Alternativas consideradas

- Framework full stack acrescenta servidor e convenções de implantação sem necessidade estabelecida para a SPA com FastAPI.
- Store global para todos os dados duplica o cache remoto.
- Biblioteca visual abrangente traz custo de bundle e convenções antes de haver requisitos visuais suficientes.
- Tipos de API escritos à mão podem divergir do OpenAPI.
- Textos embutidos nos componentes dificultam a segunda língua e expansão.

## Consequências

FastAPI mantém validação e cálculo autoritativos. O frontend precisa de disciplina de invalidação de cache, traduções completas e estados de dados antigos/ausentes. Formatação não substitui decimal exato no contrato. Uma nova dependência exigirá justificativa, licença e versão fixada.

## Condições para aprovação

Revisão do proprietário sobre prioridades de UX, contratos da primeira fatia e adequação da estratégia SPA.
