# Decisões de dependências

## Resultado desta modernização

**Nenhuma biblioteca adicionada.**

Nome: APIs nativas da plataforma
Versão: navegadores modernos / Node.js 20+
Finalidade: interface estática, geração e testes
Problema resolvido: manter execução sem bundle e sem cadeia transitiva
Alternativas avaliadas: React, TypeScript, Zod, Vitest, Playwright, bibliotecas de UI
Motivo da escolha: o projeto não possui backend, componentes compilados ou dados remotos que justifiquem esses pacotes
Impacto no bundle: zero
Impacto de segurança: superfície de supply chain mínima
Licença: recursos nativos, não aplicável

Playwright/axe são candidatos futuros para E2E e acessibilidade automatizada, mas devem ser aprovados após definir execução na CI, custo de browsers e manutenção.
