import { controls, sounds } from './elements.js'
import * as actions from './actions.js'
import * as el from './elements.js'
import state from './state.js' 
import { updateDisplay } from './timer.js'

//funcão responsável por registrar os eventos de clique dos elementos
export function registerControls() {
    controls.addEventListener('click', (event) => {
        // Obtém o valor do atributo 'data-action' do elemento clicado
        const action = event.target.dataset.action
        // Verifica se a propriedade correspondente a 'action' em 'actions' é uma função
        if(typeof actions[action] != "function") {
            return
        }
        // Chama a função correspondente a 'action' em 'actions'
        actions[action]()
    })

    sounds.addEventListener('click', (event) => {
        const music = event.target.dataset.action
        if(music == undefined) return
        actions.toggleMusic(music)
    })
}

export function setMinutes() {
    //Quando o campo de minutos recebe o foco (quando o usuário clica ou navega até ele), o conteúdo do elemento minutes é definido como uma string vazia ("").
    el.minutes.addEventListener('focus', () => {
        el.minutes.textContent = ""
    })

    //A função verifica se a tecla pressionada é um número (/\d/ é uma expressão regular que corresponde a qualquer dígito de 0 a 9). Se a tecla não for um número, ela não será inserida no campo.
    el.minutes.onkeypress = (event) => /\d/.test(event.key)

    el.minutes.addEventListener('blur', (event) => {
        //Obtém o valor atual do campo de minutos (event.currentTarget.textContent).
        let time = event.currentTarget.textContent
        //Limita o valor do tempo (minutos) a 60, caso seja maior que isso
        time = time > 60 ? 60 : time

        //Atualiza o estado (state.minutes e state.seconds) com os novos valores.
        state.minutes = time
        state.seconds = 0

        updateDisplay()
        el.minutes.removeAttribute('contenteditable')
    })
}