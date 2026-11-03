# ADR 0002 — Registros originais e conversão multimoeda

**Data:** 2026-11-03
**Estado:** preservação, padrão USD e uso do câmbio atual para distribuição e ganho geral confirmados; fonte, frescor e arredondamento ainda pendentes.

## Contexto

A carteira pode conter ativos e lançamentos em diferentes moedas. O proprietário pode informar, por exemplo, R$ 100 aplicados em CDI. Essa entrada precisa continuar sendo R$ 100 em consultas futuras. Recalcular uma conversão com uma taxa nova e apresentá-la como se fosse a entrada original alteraria o fato registrado.

## Decisão proposta

O backend recebe e armazena cada entrada monetária com **valor decimal exato, código de moeda original, unidade/tipo do valor, data e origem da informação**. O valor e a moeda informados pelo proprietário retornam sem conversão no campo de entrada original. Correções explícitas criam uma revisão ou atualização auditável; atualização de cotação não reescreve a entrada.

A moeda de consolidação é uma **preferência da carteira**, com padrão inicial **USD** e possibilidade de mudança futura. A preferência não é um campo fixo de todas as posições nem exige contas de usuário no MVP. O backend calcula a visão consolidada e a distribuição **quando solicitado**, a partir dos valores originais, cotações e taxas válidas naquele momento; não persiste um saldo convertido como substituto da posição. Cada valor convertido carrega valor e moeda de origem, moeda de destino, taxa aplicada, direção, fonte, `as_of`, data de coleta, regra de arredondamento e versão da política. Se não houver taxa válida, a visão convertida fica indisponível e a entrada original continua disponível. Um plano ou simulação salvo guarda o snapshot de preços e câmbio utilizado para reprodução posterior.

Para a **distribuição atual**, usar o valor atual de cada posição e o snapshot cambial mais recente que atenda ao limite de frescor aprovado no momento da consulta. “Atual” não implica cotação em tempo real. Para o **ganho geral do MVP**, converter tanto o valor originalmente investido quanto o valor atual usando o mesmo snapshot cambial da consulta; não usar o câmbio histórico do aporte nesse indicador. Esse método compara desempenho dos investimentos a câmbio constante na data da consulta e não mede separadamente o efeito cambial desde cada compra. A interface precisa explicar essa convenção. Os registros originais continuam em suas próprias moedas.

**Exemplo conceitual:** entrada `amount=100.00`, `currency=BRL`, `kind=contribution`, associada a uma aplicação informada como vinculada ao CDI. CDI é referência de remuneração, não identidade suficiente de instrumento. Ao consultar o registro, a API sempre retorna os mesmos R$ 100 como entrada. Um total em USD é outro campo ou recurso, com taxa e data identificadas. Valor atual de mercado ou saldo remunerado é uma terceira informação, calculada com regras próprias; não substitui o aporte.

**Exemplo de duas posições:** um título do Tesouro dos EUA cadastrado em USD e um título do Tesouro brasileiro cadastrado em BRL mantêm seus valores declarados nas moedas respectivas. Na consulta da distribuição, o backend avalia cada posição conforme sua política, converte os valores atuais para USD com uma taxa datada e então calcula os percentuais. Uma taxa nova pode mudar percentuais consolidados em uma consulta futura; ela não altera os registros originais exibidos em cada posição.

Identidades de instrumentos, preços e quantidades ficam separadas de lançamentos de dinheiro. O contrato distingue pelo menos: **entrada declarada**, **posição/quantidade**, **cotação/valor atual**, **valor convertido para relatório** e **proposta de aporte**. Usar códigos ISO 4217 quando aplicáveis; validar moedas suportadas por provedor e política de câmbio sem limitar o modelo às moedas do MVP. Precisão e arredondamento serão fixados em contrato por tipo de valor.

## Consequências e testes exigidos

- O frontend mostra entradas na moeda original e identifica claramente totais convertidos, taxa e data.
- Mudança de moeda de consolidação ou nova cotação pode alterar totais e distribuição calculados na consulta, mas nunca o valor/moeda de uma entrada já registrada.
- Testes de contrato: registrar BRL 100, consultar após atualização da taxa, verificar BRL 100 intactos; alterar preferência de consolidação e verificar que só o relatório muda; calcular distribuição de uma posição USD e outra BRL em duas taxas diferentes, verificando mudança apenas na distribuição; simular câmbio ausente/antigo sem converter para zero.
- O rebalanceador usa snapshots datados e moeda de consolidação explícita. Não mistura valores de datas ou moedas sem uma política aprovada.
- O valor investido em USD exibido no resumo pode mudar quando o câmbio atual muda; cada entrada original em BRL ou outra moeda permanece idêntica. O frontend rotula a conversão e seu instante para evitar confundi-la com o valor informado.

## Questões pendentes

1. Fonte, tipo de taxa, limite de frescor, tratamento de dias sem cotação e arredondamento da conversão atual; política específica de simulações futuras.
2. No exemplo de CDI, o campo R$ 100 representa aporte histórico ou saldo atual informado? Ambos podem existir e devem ter nomes distintos no contrato; o proprietário confirmou que uma entrada de aporte preserva seu valor original.
