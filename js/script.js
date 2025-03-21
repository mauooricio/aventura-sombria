import Game from './game.js'
import UI from './ui.js'

/*
  Gerencia o menu, créditos e jogo.
  Lê dificuldade, toca som de fundo e carrega save se existir.
*/

const menuContainer = document.getElementById("menu-container")
const creditsContainer = document.getElementById("credits-container")
const gameContainer = document.getElementById("game-container")

const startGameBtn = document.getElementById("start-game-btn")
const creditsBtn = document.getElementById("credits-btn")
const exitBtn = document.getElementById("exit-btn")
const backMenuBtn = document.getElementById("back-menu-btn")

const difficultySelect = document.getElementById("difficulty")
const bgSound = document.getElementById("bg-sound")

const game = new Game()
const ui = new UI(game)

// Mostra o menu ao iniciar
showMenu()

startGameBtn.addEventListener("click", () => {
  const diff = difficultySelect.value
  localStorage.setItem('chosenDifficulty', diff)

  const savedState = localStorage.getItem('gameState')
  if (savedState) {
    const confirmLoad = confirm("Existe um jogo salvo. Deseja continuar de onde parou?")
    if (confirmLoad) {
      game.loadState(JSON.parse(savedState))
      showGame()
      playBgSound()
      return
    } else {
      localStorage.removeItem('gameState')
    }
  }

  game.setDifficulty(diff)
  game.resetGame()
  showGame()
  playBgSound()
})

creditsBtn.addEventListener("click", () => {
  showCredits()
})

exitBtn.addEventListener("click", () => {
  alert("Encerrando... se o navegador permitir, a aba será fechada.")
  window.close()
})

backMenuBtn.addEventListener("click", () => {
  showMenu()
})

function showMenu() {
  menuContainer.style.display = "flex"
  creditsContainer.style.display = "none"
  gameContainer.style.display = "none"
}

function showCredits() {
  menuContainer.style.display = "none"
  creditsContainer.style.display = "flex"
  gameContainer.style.display = "none"
}

function showGame() {
  menuContainer.style.display = "none"
  creditsContainer.style.display = "none"
  gameContainer.style.display = "flex"
  ui.start()
}

function playBgSound() {
  bgSound.volume = 0.3
  bgSound.play().catch(err => {
    console.log("Som de fundo bloqueado ou falhou:", err)
  })
}
