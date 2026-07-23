# Relatório de arquivos grandes

Maiores arquivos rastreados na versão auditada:

| Arquivo | Tamanho aproximado | Tipo | Ação recomendada |
| --- | ---: | --- | --- |
| `The-Known-World.jpg` | 10,3 MB | imagem | Converter para WebP/AVIF após teste visual e de referências. |
| `images/Evocation1.gif` | 9,8 MB | GIF | Converter para vídeo moderno ou animação otimizada. |
| `images/Runa J.gif` | 8,2 MB | GIF | Otimizar; confirmar licença e uso. |
| `images/1.mp3` | 8,1 MB | áudio | Recompactar após teste auditivo e documentar origem. |
| `images/evocation.gif` | 8,0 MB | GIF | Verificar possível variante/duplicata de `Evocation1.gif`. |
| `images/setentrional/setentrional-storm.mp4` | 6,5 MB | vídeo | Avaliar bitrate, poster e carregamento sob demanda. |
| `images/Farol.png` | 6,5 MB | imagem | Converter para formato moderno mantendo transparência. |
| `images/setentrional/mapa-sao-firmo.png` | 3,7 MB | imagem | Gerar tamanhos responsivos. |

Git LFS não foi adotado: os arquivos ainda são compatíveis com os limites do GitHub, e migrar o histórico afetaria clones e o deploy. Primeiro devem ser feitos otimização, lazy loading e verificação de licença. O relatório cobre a versão atual; uma auditoria histórica completa com `git-filter-repo --analyze` pode ser realizada separadamente sem alterar o histórico.
