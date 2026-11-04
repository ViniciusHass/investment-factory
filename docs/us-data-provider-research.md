# Pesquisa inicial: dados gratuitos para o MVP dos EUA

**Data da verificação:** 2026-11-03. **Estado:** pesquisa para decisão arquitetural; nenhum provedor foi contratado, configurado ou integrado. **Escopo aprovado:** ações e ETFs dos EUA; moeda de consolidação configurável com padrão inicial USD; dados externos obtidos somente pelo FastAPI.

## Candidatos e limites publicados

| Necessidade | Fonte candidata | Cobertura e limite publicados | Risco/pendência |
|---|---|---|---|
| Preços de ações e ETFs dos EUA | [Twelve Data Basic](https://twelvedata.com/pricing) | Plano gratuito anuncia ações dos EUA em tempo real e 8 créditos por minuto / 800 por dia. [Regras de créditos](https://support.twelvedata.com/en/articles/5615854-credits) explicam que custo depende do endpoint e limite diário reinicia à meia-noite UTC; [requisição em lote](https://support.twelvedata.com/en/articles/5203360-batch-api-requests) cobra por símbolo. | Confirmar endpoints de ações/ETFs liberados no Basic, custo por símbolo, precisão/timestamp, política de cache e uso pessoal nos [termos](https://twelvedata.com/terms). Não interpretar 800 créditos como 800 símbolos em qualquer endpoint. |
| Alternativa de preços, sobretudo fim de dia | [Alpha Vantage](https://www.alphavantage.co/support/) | Serviço gratuito anuncia 25 chamadas por dia para a maioria dos datasets. A [documentação](https://www.alphavantage.co/documentation/) indica que dados dos EUA em tempo real e com atraso de 15 minutos exigem plano premium. | Verificar quais endpoints diários de ações e ETFs são gratuitos e termos de exibição/uso. O limite pode ser restritivo mesmo para carteira pessoal. |
| Fundamentos de empresas dos EUA | [SEC EDGAR data APIs](https://www.sec.gov/search-filings/edgar-application-programming-interfaces) | Company Facts e XBRL de relatórios oficiais; a [política de acesso](https://www.sec.gov/about/developer-resources) limita a 10 requisições por segundo e exige uso eficiente. [Orientação de acesso](https://www.sec.gov/search-filings/edgar-search-assistance/accessing-edgar-data) pede identificação de User-Agent. | Não é fonte de cotação. Cobertura de ETFs e mapeamento de taxonomias/periodicidade não podem ser presumidos. API `data.sec.gov` [não oferece CORS](https://www.sec.gov/search-filings/edgar-application-programming-interfaces), reforçando adapter no backend. |
| Câmbio USD/BRL datado | [BCB PTAX](https://dadosabertos.bcb.gov.br/pt_BR/dataset/dolar-americano-usd-todos-os-boletins-diarios) | Dataset oficial com compra/venda e boletins diários, acesso OData e licença indicada no portal. | Definir boletim/taxa, calendário de dias sem cotação, arredondamento e se PTAX representa a avaliação desejada. Nunca usar taxa atual para custo histórico sem regra aprovada. |

## Proposta para um protótipo de contrato, ainda sujeita a aceite

1. Comparar Twelve Data Basic e Alpha Vantage com uma pequena amostra de ações e ETFs que o proprietário escolha, sem codificar adapter antes da aprovação do card. Registrar corpo de resposta, timezone, `as_of`, limites, falhas e licença.
2. Usar SEC Company Facts apenas para métricas de empresas cuja interpretação por setor esteja especificada. Para ETFs, mostrar dados de preço e marcar fundamentos/score incompatíveis como indisponíveis até existir scorecard próprio.
3. Usar BCB PTAX para conversão USD/BRL somente depois de fixar a política de taxa, data e qualidade. Guardar moeda e valor originais; a taxa aplicada pertence a um snapshot convertido separado.
4. Implementar cache e orçamento de chamadas no backend quando o provedor for aprovado. O frontend mostra fonte, data e estado da informação. Chaves ficam em `.env` do servidor e fora de Git; nenhuma variável `VITE_` as contém.

## Condições antes de selecionar um provedor

- Confirmar com documentação atual e teste controlado: cobertura por bolsa/ticker, ações/ETFs, dados ajustados por split/dividendo, histórico, frescor, limites por endpoint e resposta de quota.
- Confirmar termos para ferramenta pessoal, armazenamento local de snapshots, exibição na interface e eventual mudança futura para múltiplos usuários. Plano gratuito pessoal não autoriza automaticamente redistribuição.
- Registrar decisão em ADR com data, plano/limite escolhido, orçamento de quota, fallback e critérios de troca. Não atribuir score zero a informação ausente ou a ETF sem métricas adequadas.
