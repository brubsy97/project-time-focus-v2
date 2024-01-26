import state from './state.js'
import * as timer from './timer.js'
import * as el from './elements.js'
import * as sounds from './sounds.js'

export function toggleRunning() {
    // Inverte a classe 'running' no elemento raiz do documento (document.documentElement)
    state.isRunnig = document.documentElement.classList.toggle('running')

    timer.countDown()

    // Toca o áudio de pressionar o botão
    sounds.buttonPressAudio.play()
}

export function reset() {
    // Define state.isRunning como falso
    state.isRunnig = false

    document.documentElement.classList.remove('running')

    sounds.buttonPressAudio.play()
}

export function set() {
    // Define 'contenteditable' como true para permitir edição no elemento com id 'minutes'
    el.minutes.setAttribute('contenteditable', true)

    // Foca (coloca o foco) no elemento com id 'minutes'
    el.minutes.focus()
}

export function addMinutes() {
    sounds.buttonPressAudio.play()

    //Obtém o valor atual dos minutos e adiciona 5
    let minutes = Number(el.minutes.textContent) + 5
    let seconds = Number(el.seconds.textContent)

    // Limita os minutos a 60 e redefine os segundos para 0 se ultrapassar
    if (minutes > 60) {
        minutes = 60
        seconds = 0
      }
    
    // Atualiza a exibição do temporizador com os novos valores
    timer.updateDisplay(minutes, seconds)
}

export function removeMinutes() {
    sounds.buttonPressAudio.play()

    // Obtém o valor atual dos minutos e subtrai 5
    let minutes = Number(el.minutes.textContent) - 5
    let seconds = Number(el.seconds.textContent)

    if (minutes < 0) {
        return
    }
    
    timer.updateDisplay(minutes, seconds)
}

export function toggleMusic(music) {
    // Alterna a classe 'active' no elemento HTML com o id igual ao nome da música
    document.getElementById(music).classList.toggle('active')
    
    // Verifica se a música está pausada e ajusta de acordo
    if (sounds.musics[music].paused) {
        sounds.musics[music].play();
    } else {
        sounds.musics[music].pause();
    }
}