# ADR 0006 — Quantidades por tipo de investimento e produto

**Data:** 2026-11-08. **Estado:** regra de negócio confirmada pelo proprietário; persistência e validação aguardam implementação por cards.

## Decisão

Ações devem ter quantidades inteiras positivas. Investimentos que admitem fracionamento, como CDBs, podem ser fracionados segundo as regras do produto. Não existe uma opção global “tudo fracionado” nem é necessário perguntar novamente ao proprietário entre inteiras/frações como regra universal.

Quantidades continuam decimais textuais no transporte para representar diferentes produtos com exatidão. O backend valida ação como valor inteiro, inclusive representações equivalentes como “2.000”. Para outros produtos, capacidade, mínimo e incremento precisam ser verificados; desconhecimento bloqueia a recomendação em vez de escolher uma unidade arbitrária.

O cadastro de inventário não é uma nova ordem: não aplicar o mínimo de uma nova compra à posição histórica existente. A regra de ação inteira continua sendo aplicada. Novas recomendações respeitam a grade e os demais limites vigentes.

## Persistência e contratos

Ver [banco de dados](../database-design.md) e [C01](../../contracts/portfolio/v1/README.md). Guardar o texto original e valores numeric exatos, sem float; regras de negociação são versionadas e registram origem/data. Quando salvar um plano, congelar as regras realmente utilizadas.

A interface atual de bolsa usa stock/ETF e quantidade em share. CDB futuro será modelado por principal monetário/termos do produto, sem ticker/MIC ou preço unitário falsos. Esta regra não ativa automaticamente um mercado/provider além da cobertura já aprovada.

## Verificação

Contrato rejeita recomendação de ação fracionada; aceita ação inteira e a forma equivalente com zeros decimais. Fixture de produto fracionável documenta uma política sintética explícita; a implementação precisa testar a granularidade real. Banco usa testes PostgreSQL de inteiro, mínimo/incremento, valores originais e histórico. Nenhuma migration foi executada por este ADR.
