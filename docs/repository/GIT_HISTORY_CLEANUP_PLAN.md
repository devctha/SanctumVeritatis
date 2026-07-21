# Plano separado para o histórico Git

O pack inicial tinha 69,73 MiB. Os maiores blobs históricos são assets ainda ativos; não foram encontrados checkpoints ZIP no histórico. A limpeza atual não reduz blobs de commits anteriores.

## Recomendação

Não reescrever agora. Primeiro:

1. criar clone espelho e backup verificável;
2. definir assets substituíveis por WebP, WebM ou OGG;
3. medir a economia com `git filter-repo --analyze`;
4. coordenar janela e novo clone para colaboradores;
5. revisar GitHub Pages e forks;
6. obter autorização explícita antes de force push.

Nenhum comando de reescrita ou force push foi executado.
