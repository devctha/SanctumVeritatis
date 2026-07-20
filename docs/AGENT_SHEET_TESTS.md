# Testes das fichas de agente

## Implementado e validado

- Criação inicial independente para cada agente.
- Salvamento automático com chaves por usuário e por domínio de dados.
- Atributos com limites de 0 a 5.
- PV, PE, SAN e Defesa com limites mínimo/máximo.
- Perícias, treino, bônus e rolagem local.
- Inventário, carga, equipar e remover com confirmação.
- Habilidades e rituais carregados dos dados de regras.
- Notas pessoais e histórico de alterações.
- Exportação, importação validada, backup anterior e impressão/PDF.
- Modos de consulta e edição.
- Layout responsivo com navegação móvel.

## Chaves isoladas

`sv_agent_<id>_sheet`, `_notes`, `_inventory`, `_history`, `_rituals` e `_abilities`.
