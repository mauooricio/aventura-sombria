/*
  História: 
  - Clareira (phase1)
  - Portão enferrujado (phase2, phase2Fail, phase2Success)
  - Viajante ferido (phase3, phase3Help)
  - Castelo (phase4)
  - Guardião das Sombras (phase5)
  - finalVictory e gameOver
  Com dificuldade, inventário, cronômetro e salvamento.
*/

export default class Game {
  constructor() {
    this.lives = 3
    this.points = 0
    this.currentPhase = 'phase1'
    this.difficulty = 'normal'
    this.inventory = []
    this.achievements = { noDamage: true, speedKill: false }
    this.startTime = null

    this.phases = {
      phase1: {
        text: 
`Você desperta numa clareira envolta em névoa. 
Há dois caminhos: um para o norte, onde um portão antigo se ergue, 
e outro para o leste, onde a vegetação é mais densa. 
Qual direção você escolhe?`,
        choices: [
          { text: "Ir para o norte (portão)", nextPhase: "phase2", action: "advance" },
          { text: "Ir para o leste (vegetação)", nextPhase: "phase3", action: "advance" }
        ]
      },
      phase2: {
        text:
`Você chega diante de um portão enferrujado, coberto de símbolos mágicos. 
Há um cadeado estranho e uma inscrição quase ilegível. 
Talvez seja um enigma. Você também pode tentar forçar o cadeado, mas parece arriscado.`,
        choices: [
          { text: "Forçar o cadeado", nextPhase: "phase2Fail", action: "forceLock" },
          { text: "Observar e decifrar", nextPhase: "phase2Success", action: "puzzle" }
        ]
      },
      phase2Fail: {
        text:
`A magia do cadeado reage violentamente e você é atingido por uma descarga de energia sombria, 
perdendo parte de sua vitalidade. 
Talvez seja melhor recuar por enquanto...`,
        choices: [
          { text: "Voltar à clareira", nextPhase: "phase1", action: "advance" }
        ]
      },
      phase2Success: {
        text:
`Você lê a inscrição: "Sempre passa, mas nunca volta." 
Ao sussurrar a resposta certa, o cadeado se desfaz e o portão se abre. 
Um calafrio percorre seu corpo, mas você sente que avançou em seu destino.`,
        choices: [
          { text: "Seguir adiante pelo portão", nextPhase: "phase4", action: "advance" }
        ]
      },
      phase3: {
        text:
`Ao leste, você encontra um viajante ferido, apoiado em um tronco retorcido. 
Ele pede ajuda em troca de uma poção. Seu olhar é de desespero. 
Você pode ajudá-lo ou simplesmente ignorá-lo.`,
        choices: [
          { text: "Ajudar o viajante", nextPhase: "phase3Help", action: "helpTraveler" },
          { text: "Ignorar e prosseguir", nextPhase: "phase4", action: "advance" }
        ]
      },
      phase3Help: {
        text:
`Você improvisa um curativo. O viajante agradece e lhe entrega uma pequena poção esverdeada. 
"Use-a na hora certa e talvez salve sua vida."`,
        choices: [
          { text: "Continuar viagem", nextPhase: "phase4", action: "advance" }
        ]
      },
      phase4: {
        text:
`Você avista um castelo abandonado, suas torres meio destruídas e portões arrombados. 
Dizem que o Guardião das Sombras vive ali. 
O vento sopra, carregando murmúrios de espíritos antigos. 
Você entra ou volta?`,
        choices: [
          { text: "Entrar no castelo", nextPhase: "phase5", action: "advance" },
          { text: "Voltar à clareira", nextPhase: "phase1", action: "advance" }
        ]
      },
      phase5: {
        text:
`Dentro do castelo, uma presença sombria se ergue: 
"Eu sou o Guardião das Sombras. Prove seu valor ou seja consumido!" 
A atmosfera pesa e a batalha final começa.`,
        choices: [
          { text: "Enfrentar o Guardião", nextPhase: "finalVictory", action: "finalBattle" },
          { text: "Tentar fugir", nextPhase: "gameOver", action: "loseLife" }
        ]
      }
    }

    this.finalVictory = {
      text:
`Você vence o Guardião das Sombras! 
O castelo treme enquanto energias sombrias se dissipam, 
e uma luz surge para guiá-lo de volta à clareira. 
Você sai triunfante e sua lenda será contada por gerações.`,
      choices: []
    }

    this.gameOver = {
      text:
`Você sucumbe à escuridão. 
Seus últimos suspiros ecoam pelos corredores do castelo abandonado. 
Talvez em outra ocasião você consiga superar este destino...`,
      choices: []
    }
  }

  setDifficulty(diff) {
    this.difficulty = diff
  }

  resetGame() {
    if (this.difficulty === 'easy') this.lives = 5
    else if (this.difficulty === 'hard') this.lives = 2
    else this.lives = 3

    this.points = 0
    this.currentPhase = 'phase1'
    this.inventory = []
    this.achievements = { noDamage: true, speedKill: false }
    this.startTime = null
    this.saveState()
  }

  loadState(state) {
    this.lives = state.lives
    this.points = state.points
    this.currentPhase = state.currentPhase
    this.difficulty = state.difficulty
    this.inventory = state.inventory || []
    this.achievements = state.achievements || { noDamage: true, speedKill: false }
    this.startTime = state.startTime
  }

  saveState() {
    const gameState = {
      lives: this.lives,
      points: this.points,
      currentPhase: this.currentPhase,
      difficulty: this.difficulty,
      inventory: this.inventory,
      achievements: this.achievements,
      startTime: this.startTime
    }
    localStorage.setItem('gameState', JSON.stringify(gameState))
  }

  processChoice(choiceIndex) {
    const phaseObj = this.getCurrentPhase()
    const choice = phaseObj.choices[choiceIndex]

    switch (choice.action) {
      case "advance":
        this.points += 5
        this.currentPhase = choice.nextPhase
        break
      case "forceLock":
        this.loseLife()
        this.currentPhase = "phase2Fail"
        break
      case "puzzle":
        this.handlePuzzle(choice.nextPhase)
        break
      case "helpTraveler":
        this.inventory.push("potion")
        this.points += 5
        this.currentPhase = choice.nextPhase
        break
      case "loseLife":
        this.loseLife()
        if (this.lives <= 0) {
          this.currentPhase = "gameOver"
        } else {
          this.currentPhase = choice.nextPhase
        }
        break
      case "finalBattle":
        // cronômetro
        if (!this.startTime) this.startTime = Date.now()
        this.handleFinalBattle()
        break
      default:
        console.log("Ação desconhecida:", choice.action)
    }

    this.saveState()
  }

  loseLife() {
    this.lives--
    this.achievements.noDamage = false
  }

  handlePuzzle(nextPhase) {
    const answer = prompt("Enigma: 'Sempre passa, mas nunca volta.'")
    if (answer && answer.toLowerCase().includes("tempo")) {
      this.points += 10
      this.currentPhase = nextPhase
    } else {
      this.loseLife()
      if (this.lives <= 0) {
        this.currentPhase = "gameOver"
      } else {
        this.currentPhase = nextPhase
      }
    }
  }

  handleFinalBattle() {
    const now = Date.now()
    const elapsedSec = (now - this.startTime) / 1000
    if (elapsedSec > 12) {
      // Se passar de 12s, o Guardião ataca primeiro
      alert("Você demorou muito e o Guardião atacou primeiro!")
      this.loseLife()
      if (this.lives <= 0) {
        this.currentPhase = "gameOver"
        this.saveState()
        return
      }
    }

    let baseChance = 0.7
    if (this.difficulty === 'easy') baseChance = 0.9
    if (this.difficulty === 'hard') baseChance = 0.5

    if (this.inventory.includes("potion")) {
      baseChance += 0.1
      this.inventory = this.inventory.filter(item => item !== "potion")
    }

    if (Math.random() < baseChance) {
      this.points += 20
      if (this.lives === this.getMaxLives()) {
        this.achievements.noDamage = true
      }
      if (elapsedSec <= 10) {
        this.achievements.speedKill = true
      }
      this.currentPhase = "finalVictory"
    } else {
      this.loseLife()
      if (this.lives <= 0) {
        this.currentPhase = "gameOver"
      } else {
        this.currentPhase = "phase5"
      }
    }
  }

  getMaxLives() {
    if (this.difficulty === 'easy') return 5
    if (this.difficulty === 'hard') return 2
    return 3
  }

  getCurrentPhase() {
    if (this.currentPhase === "gameOver") {
      return this.gameOver
    }
    if (this.currentPhase === "finalVictory") {
      let bonus = ""
      if (this.achievements.noDamage) {
        bonus += "\nConquista: Terminou sem perder vida!"
      }
      if (this.achievements.speedKill) {
        bonus += "\nConquista: Derrotou o Guardião rapidamente!"
      }
      return {
        text: this.finalVictory.text + bonus,
        choices: []
      }
    }
    return this.phases[this.currentPhase]
  }
}
