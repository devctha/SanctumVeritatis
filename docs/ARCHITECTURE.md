# Arquitetura

O sistema usa arquitetura estática multipágina. HTML compõe cada rota; CSS central fornece tokens e componentes; JavaScript é dividido por domínio; JSON e arquivos `*-data.js` fornecem dados. Geradores Node convertem fontes estruturadas em artefatos consumidos no navegador.

O navegador mantém sessão e preferências localmente. Guardas de rota melhoram a experiência narrativa, mas não são fronteira de segurança. A evolução recomendada mantém a interface estática como cliente e adiciona API/backend para identidade, permissões, conteúdo privado, auditoria e backups.
