# Arquivos duplicados

Foram encontrados inicialmente 9 grupos SHA-256 e 21.871 bytes potencialmente repetidos.

## Eliminado

- Hash `e7d50d4e...`: `images/op-logo.png` foi mantido como canônico; `SAS Results/images/op-logo.png` foi removido. As referências existentes já apontavam ao canônico. Economia: 19.557 bytes.

## Preservados intencionalmente

Oito grupos são aliases HTML de 287–293 bytes em `agentes/agent-vex/` e `agentes/batata-legume-12/`. Cada arquivo redireciona relativamente para o `index.html` do próprio perfil. Consolidá-los quebraria isolamento de rota.

`npm run check:duplicates` calcula SHA-256 e falha se surgir duplicação não classificada.
