import state from './state.js'
import * as el from './elements.js'
import { reset } from './actions.js'
import { kitchenTimer } from './sounds.js'

export function countDown() {
    //Cancela o temporizador anterior, removendo qualquer ação agendada para ser executada pelo setTimeout. Isso é feito para evitar múltiplos temporizadores concorrentes que podem interferir uns com os outros.
    clearTimeout(state.countdownId)
    
    //Verifica se o temporizador deve estar em execução (state.isRunnig). Se não estiver em execução, a função retorna, interrompendo a contagem regressiva.
    if(!state.isRunnig) {
        return
    }

    //Obtém o valor dos minutos do elemento com id minutes e seconds e converte para número.
    let minutes = Number(el.minutes.textContent)
    let seconds = Number(el.seconds.textContent)

    //Decrementa o valor de seconds em 1.
    seconds--

    //Se seconds se tornar menor que 0, redefine seconds para 59 e decrementa minutes em 1.
    if(seconds < 0) {
        seconds = 59
        minutes--
    }

    //Se minutes se tornar menor que 0, chama a função reset, reproduz o som associado ao temporizador da cozinha (kitchenTimer.play()), e retorna da função, encerrando a contagem regressiva.
    if(minutes < 0) {
        reset()
        kitchenTimer.play()
        return
    }

    //Chama a função updateDisplay com os novos valores de minutos e segundos para atualizar a interface do usuário.
    updateDisplay(minutes, seconds) 

    state.countdownId = setTimeout(() => countDown(), 1000) //recursão, quando uma função chama ela msm em algum momento
    //o nome de uma função que recebe outra função como parâmetro se chama callback function
}

export function updateDisplay(minutes, seconds) {
    //Verifica se o valor de minutes é nulo ou indefinido. Se for, utiliza o valor armazenado em state.minutes como valor padrão. O mesmo para seconds.
    minutes = minutes ?? state.minutes
    seconds = seconds ?? state.seconds

    el.minutes.textContent = String(minutes).padStart(2, "0")
    el.seconds.textContent = String(seconds).padStart(2, "0")
}