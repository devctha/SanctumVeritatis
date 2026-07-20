# Dados e banco

Não existe banco de dados. JSON, JavaScript gerado, `localStorage` e `sessionStorage` armazenam dados. Os geradores em `tools/` são determinísticos e suas fontes ficam em `data/`.

Uma futura migração deve modelar usuários, papéis, agentes, operações, documentos e logs em banco transacional; incluir migrações, backup, índices, integridade referencial e filtragem de campos secretos no servidor. Dados locais existentes precisam de exportação explícita antes da migração.
