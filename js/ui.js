/*
  Este arquivo controla:
  - Texto e botões de escolha
  - Som de clique (clique.mp3)
  - Botões de fim de jogo (reiniciar e voltar ao menu)
  - Não há mais cronômetro aqui
*/

export default class UI {
  constructor(game) {
    this.game = game
    this.textElement = document.getElementById("text")
    this.choicesElement = document.getElementById("choices")
    this.livesElement = document.getElementById("lives")
    this.pointsElement = document.getElementById("points")
    this.endButtonsDiv = document.getElementById("end-buttons")

    // Botões finais
    this.restartButton = document.getElementById("restart-button")
    this.backMenuEnd = document.getElementById("back-menu-end")

    // Reseta o jogo ao clicar em "Reiniciar Jogo"
    this.restartButton.addEventListener("click", () => {
      this.game.resetGame()
      this.start()
    })

    // Volta ao menu (recarrega a página)
    this.backMenuEnd.addEventListener("click", () => {
      window.location.reload()
    })

    // Teclas numéricas para escolher opções (1 a 9)
    document.addEventListener("keydown", (e) => this.handleKey(e))
  }
  
  start() {
    this.updateUI()
  }
  
  updateUI() {
    const phase = this.game.getCurrentPhase()

    // Efeito de fade-in no texto
    this.textElement.classList.remove('show')
    setTimeout(() => {
      this.textElement.textContent = phase.text
      this.textElement.classList.add('show')
    }, 50)

    // Limpa os botões anteriores
    this.choicesElement.innerHTML = ""
    this.updateScoreboard()

    // Se a fase tiver choices, cria botões
    if (phase.choices && phase.choices.length > 0) {
      phase.choices.forEach((choice, index) => {
        const button = document.createElement("button")
        button.textContent = choice.text
        button.addEventListener("click", () => this.handleChoice(index, choice.action))
        this.choicesElement.appendChild(button)
      })
      this.endButtonsDiv.style.display = "none"
    } else {
      // Fim de jogo (sem choices)
      this.endButtonsDiv.style.display = "block"
    }
  }
  
  updateScoreboard() {
    this.livesElement.textContent = "Vidas: " + this.game.lives
    this.pointsElement.textContent = "Pontos: " + this.game.points
  }
  
  handleChoice(choiceIndex, action) {
    // Som de clique
    const clickSound = new Audio('../sounds/clique.mp3')
    clickSound.play().catch(() => {})

    // Processa a escolha no Game
    this.game.processChoice(choiceIndex)
    this.updateUI()
  }

  handleKey(e) {
    const phase = this.game.getCurrentPhase()
    if (!phase.choices || phase.choices.length === 0) return

    // Se a tecla for um número de 1 a 9
    const key = e.key
    if (/^[1-9]$/.test(key)) {
      const index = parseInt(key) - 1
      if (index >= 0 && index < phase.choices.length) {
        this.handleChoice(index, phase.choices[index].action)
      }
    }
  }
}
