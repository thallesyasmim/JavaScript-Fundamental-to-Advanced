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

    atualizarTexto({ elementoContador, contador }) {
        const identificadorTexto = '$$contador'
        const textoPadrao = `Começando em <strong>${identificadorTexto}</strong> segundos...`

        elementoContador.innerHTML = textoPadrao.replace(identificadorTexto, contador.valor--)
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


    }
}
