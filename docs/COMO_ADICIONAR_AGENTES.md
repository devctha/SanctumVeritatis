# Como adicionar agentes

1. Adicione os metadados do usuário em `data/auth/users.json` e `data/auth/users-data.js`.
2. Normalize o nome de usuário em letras minúsculas.
3. Gere SHA-256 de `usuario-normalizado:SenhaExata` e inclua em `js/auth/credentials.js`.
4. Crie a pasta `agentes/<id>/` usando uma das páginas atuais como referência e altere `data-agent-owner`.
5. A rota deve apontar para `agentes/<id>/index.html`.
6. Execute os testes de autenticação e isolamento.

O painel do Mestre gera o bloco de metadados inicial. A senha deve ser adicionada ao módulo separado de credenciais; nunca ao JSON público de usuários.
