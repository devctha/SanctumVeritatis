# Contribuição

## Fluxo

1. Crie uma branch curta a partir de `main`: `feature/*`, `fix/*`, `docs/*` ou `chore/*`.
2. Não publique conteúdo de mestre, spoilers, dados pessoais ou credenciais.
3. Preserve URLs existentes; mudanças de rota exigem alias compatível.
4. Execute `npm.cmd ci --ignore-scripts` e `npm.cmd run validate`.
5. Use o template de pull request e aguarde o check `validate`.

## Commits

Use Conventional Commits, por exemplo:

```text
feat(auth): add server-backed session
fix(routes): preserve legacy document URL
docs(repository): update deployment guide
```

Separe alterações incompatíveis, não inclua artefatos temporários e não reescreva commits publicados. Conteúdo narrativo sigiloso deve ser coordenado fora de issues e PRs públicos.
