# Plano de reconstrução

1. Preservar e inventariar todo conteúdo e URLs legadas. **Concluído.**
2. Centralizar tokens, componentes, layout responsivo e acessibilidade. **Concluído na fundação; migração legado é incremental.**
3. Estruturar autenticação narrativa, agentes, mestre e arquivo. **Concluído para a versão estática.**
4. Consolidar Setentrional, Sintech e RedLotus com dados gerados. **Em andamento; conteúdo futuro permanece previsto.**
5. Adicionar testes reproduzíveis, documentação e CI. **Concluído nesta etapa.**
6. Executar QA visual, Lighthouse e revisão manual de todas as rotas. **Pendente.**
7. Migrar segurança real para backend antes de armazenar conteúdo confidencial. **Pendente e obrigatório para produção privada.**

Decisão arquitetural: manter a stack estática por compatibilidade e baixo custo. Uma migração de framework não resolve a principal limitação, que é ausência de backend, e elevaria o risco de apagar comportamentos narrativos.
