# Feature 005 — Ganho total da carteira no MVP

## Objetivo

Exibir no resumo geral do MVP o valor investido, o valor atual, a diferença absoluta e a diferença percentual da carteira. O detalhamento por ativo, classe ou período fica fora desta primeira entrega. Valores originais de cada entrada permanecem registrados em suas respectivas moedas; o backend calcula o resumo consolidado em USD quando solicitado, com cotações e taxas datadas.

## Critérios de aceite propostos

- A resposta distingue explicitamente `invested_total`, `current_total`, `absolute_change` e `percentage_change`, todos rotulados com moeda de consolidação, data e qualidade dos insumos.
- `absolute_change = current_total - invested_total`. Se `invested_total > 0`, `percentage_change = absolute_change / invested_total × 100`; sem base positiva, o percentual fica indisponível, não zero inventado.
- A consulta não altera valores nem moedas originalmente informados pelo proprietário. Mudanças de cotação ou FX afetam apenas o resumo calculado e snapshots futuros.
- O valor investido e o valor atual são convertidos para USD com o **mesmo snapshot de câmbio atual** da consulta. O indicador não usa câmbio histórico de cada aporte; a interface explicita que a variação cambial desde a compra não é medida separadamente nesse ganho.
- Dados de mercado ou FX ausentes/antigos segundo a política aprovada produzem estado explícito; a UI não mostra um ganho aparentemente preciso quando faltam insumos.
- Testes cobrem carteira com uma moeda, USD+BRL, ganho, perda, investimento zero, câmbio ausente e atualização de câmbio sem alteração dos registros originais.

## Decisões pendentes

Definir a fonte, o frescor e o arredondamento do câmbio atual, o tratamento de resgates, dividendos, taxas e impostos e a definição de `invested_total` em posições cadastradas sem histórico completo. O proprietário confirmou que o MVP mostrará apenas o agregado geral.
