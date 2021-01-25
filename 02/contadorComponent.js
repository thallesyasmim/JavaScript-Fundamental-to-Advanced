const BTN_REINICIAR = 'btnReiniciar'
const ID_CONTADOR = 'contador'
const VALOR_CONTADOR = 100
const PERIODO_INTERVALO = 10

class ContadorComponent {
    constructor() {
        this.inicializar()
    }

    preparContadorProxy() {
        const handler = {
            set: (currentContext, propertyKey, newValue) => { // Método acessório SET para o objeto Proxy - Executado sempre que o objeto passado no construtor do Proxy mudar
                console.log({ currentContext, propertyKey, newValue })
                // console.log('Contexto Atual - Objeto que está sendo passado no construtor do Proxy', currentContext)

                currentContext[propertyKey] = newValue
                return true
            }
        }
        
        const contador = new Proxy({ // Proxy - Observar a instância, com o objeto que está sendo passado no seu construtor. Quando esse objeto mudar, ele vai executar uma função.
            valor: VALOR_CONTADOR,
            efetuarParada: () => {}
        }, handler)

        return contador
    }

    atualizarTexto = ({ elementoContador, contador }) => () => { // Na primeira vez que o método for executado ele vai somente guardar os parâmetros, depois vai executar realmente a lógica.
        const identificadorTexto = '$$contador'
        const textoPadrao = `Começando em <strong>${identificadorTexto}</strong> segundos...`

        elementoContador.innerHTML = textoPadrao.replace(identificadorTexto, contador.valor--)
    }

    agendarParadaContador({ elementoContador, idIntervalo }) { // 2° Forma de criar Closures - Função Parcial 
        return () => {
            clearInterval(idIntervalo)
            elementoContador.innerHTML = ''
            this.desabilitarBotao() // Enxerga somente o contexto criado com o método apply()
        }
    }

    inicializar() {
        console.log('Inicializou!')
        const elementoContador = document.getElementById(ID_CONTADOR) // OUTPUT

        const contador = this.preparContadorProxy()
        // contador.valor = 100 - Proxy observou à alteração, e invocou o método SET do objeto 'handler'
        // contador.valor = 90 - Mostrando no console o contexto atual, propriedade que está sendo alterada e o novo valor
        // contador.valor = 80 - Nesse caso, a prop seria 'valor' e o novo valor seria '80'
        console.log('Contador', contador)

        const argumentos = {
            elementoContador,
            contador
        }

        const fn = this.atualizarTexto(argumentos) // Retorna uma função com os parâmetros, mas a lógica não foi executada
        // fn()  Agora sim a lógica será executada!
        // fn()  O mesmo resultado que antes, mas com uma vantagem, se eu posso passar agora sem parâmetros...
        // fn()  ...Posso passar como referência direta no setInterval()

        const idIntervalo = setInterval(fn, PERIODO_INTERVALO) // A cada 10 ms a nossa Closure será executada, já com os parâmetros guardados
        
        {
            const argumentos = {
                elementoContador,
                idIntervalo
            }
            const desabilitarBotao = () => console.log('Desabilitou')

            const paraContadorFn = this.agendarParadaContador.apply({ desabilitarBotao }, [argumentos]) // Criando um novo contexto no 1° parâmetro, 2° Array de argumentos, no nosso caso temos só o objeto 'argumentos'
            contador.efetuarParada = paraContadorFn


        }



    }
}
