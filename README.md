
# Aventura Sombria

Este é um jogo de aventura em texto com:

- História: clareira, portão enferrujado, viajante ferido e Guardião das Sombras.
- Sistema de vidas, pontos e dificuldade (Easy, Normal, Hard).
- Som de fundo (fogueira) e som de clique.
- Salvamento no localStorage.

## Estrutura

## Como Usar
1. Coloque `fogueira.mp3` e `clique.mp3` na pasta `sounds/`.
2. Abra `index.html`
3. Selecione dificuldade e clique em "Iniciar Jogo".
4. Faça escolhas, veja o cronômetro na fase 5.
5. No final, reinicie ou volte ao menu.

## Créditos
- Som de fundo e clique: arquivos locais.
- Autores do projeto:
  - Mauricio Santos Rodrigues
  - João Pedro Gonçalves Holanda
Divisão de Tarefas
Integrante 1 — João (Responsável pela Interface e Narrativa)
Criou a estrutura base em HTML e organizou os elementos da interface (texto, botões, status de vida/pontos).

Desenvolveu o arquivo styles.css com a identidade visual do jogo, cores e responsividade básica.

Escreveu a narrativa e estrutura das fases do jogo no arquivo data.js, incluindo escolhas e caminhos possíveis.

Testou e ajustou os textos para criar uma experiência imersiva e coerente com o tema do escudeiro.

Integrante 2 — Mauricio (Responsável pela Lógica e Funcionalidade)
Implementou toda a lógica de jogo com JavaScript modularizado (ES6+), usando os arquivos game.js, ui.js e script.js.

Criou o sistema de vidas e pontuação, além de lógica para reinício do jogo em caso de derrota.

Corrigiu erros de importação, modularização e atualização do DOM.

Coordenou o uso do Live Server no VS Code e garantiu o funcionamento do projeto no navegador.


