# Testes — Arquivo Central

## Dados

- 50 documentos principais confirmados.
- 300 registros secundários confirmados.
- 328.067 registros procedurais representados por intervalo e seed.
- 328.417 registros totais.
- 350 IDs materializados sem duplicação.

## Motor

- Geração repetida do mesmo índice produz objeto idêntico.
- Busca por `farol` retorna registros narrativos relevantes.
- Operador `date:1995` validado.
- Operador `integrity:<50` retorna somente integridade abaixo de 50.
- Sintaxe de todos os scripts validada.
- Todas as 14 referências locais de `arquivos.html` existem.

## Performance

O DOM mantém somente a página atual (25, 50, 100 ou 250 linhas). Registros procedurais são materializados sob demanda. O teste de cálculo de 10.000 índices-base concluiu em menos de 100 ms no runtime local; o custo real no navegador inclui renderização, limitada pela paginação.

## Persistência

Favoritos, notas, investigação e visualização escolhida usam chaves próprias em `localStorage`. A exportação produz JSON local e não transmite dados.

## Pendente

Teste visual por viewport e leitor de tela em navegador real permanece recomendado antes da expansão para o segundo lote de documentos principais.
