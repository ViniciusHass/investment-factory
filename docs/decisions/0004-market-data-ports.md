# ADR 0004 — Ports e adapters para preços e câmbio

**Data:** 2026-11-03
**Estado:** direção arquitetural confirmada; provedor, política de frescor e regras de fallback ainda pendentes.

## Contexto

O MVP precisa avaliar ações e ETFs dos EUA, converter valores de diferentes moedas para USD e calcular distribuição e ganho geral com dados datados. Fontes gratuitas podem mudar limites, cobertura ou termos. O proprietário quer trocar a fonte de câmbio sem alterar as regras da carteira. APIs externas ficam exclusivamente no backend FastAPI.

## Decisão

Definir ports de domínio/aplicação para obter **cotação de instrumento** e **taxa de câmbio**, com contratos de saída independentes do formato de cada fornecedor. Os adapters de infraestrutura traduzem respostas de provedores para esses contratos. Serviços de avaliação, alocação e simulação dependem dos ports, sem importar clientes HTTP ou nomes de provedores.

O resultado de câmbio inclui par de moedas, direção da taxa, valor decimal, `as_of`, `collected_at`, fonte, unidade, qualidade e erro quando indisponível. O resultado de preço inclui identidade normalizada do instrumento, moeda/unidade, `as_of`, `collected_at`, fonte e qualidade. Ausente, antigo, não suportado e erro são estados distintos. Um adapter não converte automaticamente a entrada monetária registrada pelo usuário.

A escolha do adapter é configurável no backend. Cache, limite de chamadas, retentativas e eventual fallback são políticas da camada de aplicação/infraestrutura, documentadas por fonte. O fallback nunca mistura taxas ou preços de datas incompatíveis sem indicar isso na resposta. Simulações e planos salvos guardam o snapshot efetivamente usado. A primeira fonte de FX ainda será escolhida após verificar cobertura, termos, custo, precisão e frescor; PTAX e API gratuita de mercado são candidatas, não compromissos.

## Alternativas consideradas

- Chamar a API financeira diretamente nos serviços de carteira: dificulta substituição e testes determinísticos.
- Chamar o provedor no frontend: expõe credenciais e dispersa política de qualidade.
- Gravar valores convertidos como posição: permite que uma taxa posterior pareça alterar o valor informado pelo usuário.

## Critérios de aceite de contrato

- Um teste troca um adapter de FX por outro sem alterar o serviço de distribuição e mantém o mesmo formato de resposta.
- Taxa ausente ou antiga, segundo política configurada, torna a conversão indisponível sem substituir o valor por zero.
- Cada cálculo apresenta fonte e data de preço e câmbio; um plano salvo pode ser reproduzido com seu snapshot.
- Limites de API e comportamento de erro são testados com respostas controladas, sem credenciais reais em testes.

## Pendências

Escolher fonte inicial, limite de frescor, regra para fins de semana/feriados, direção compra/venda ou taxa média e arredondamento. Confirmar se haverá fallback automático ou somente troca manual de configuração no MVP.
