# Auditoria de dependências

Comandos executados:

```text
npm ci --ignore-scripts
npm ls --all
npm outdated
npm audit --audit-level=high
```

Resultado: pacote raiz sem dependências diretas ou transitivas, nenhuma versão desatualizada reportada e zero vulnerabilidades conhecidas pelo npm.

## Decisão

Nenhuma biblioteca foi adicionada. HTML/CSS/JavaScript e APIs nativas resolvem as necessidades atuais sem bundle. React, validação por schema, store global, query cache, animação e bibliotecas de UI seriam custo sem backend ou fluxo de dados que as justificasse.

As Actions usadas pela CI devem ser atualizadas pelo Dependabot quando a configuração de governança for integrada.
