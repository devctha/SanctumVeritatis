# Inventário de funcionalidades

## Implementadas

- portal público e diretório de registros;
- login e sessões locais com expiração;
- perfis de agentes isolados no armazenamento;
- terminal mestre e override narrativo;
- Arquivo Central com busca/filtros e índice procedural;
- Canto da Mariposa pública e compatibilidade Setentrional;
- cartografia São Firmo;
- progressão Sintech e eventos RedLotus;
- geradores narrativos legados;
- páginas de erro e estado offline;
- build, testes e CI.

## Parciais

- autenticação/autorização: somente cliente;
- operações: não há CRUD ou repositório unificado;
- agentes: dados administrativos não são protegidos por servidor;
- documentos/evidências: previews variam entre páginas;
- mestre: alterações ficam no navegador e não têm auditoria confiável;
- observabilidade: tentativas locais, sem backend central.

## Ausentes

- backend, API, banco, upload, recuperação de acesso e backup remoto;
- permissões por recurso verificadas no servidor;
- C.R.I.S. e módulos citados sem arquivos localizados;
- E2E automatizado multi-browser e métricas Lighthouse reproduzíveis.
