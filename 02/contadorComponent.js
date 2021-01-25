(() => { // IIFE - Immediately Invoked Function Expression
    const BTN_REINICIAR = 'btnReiniciar'
    const ID_CONTADOR = 'contador'
    const VALOR_CONTADOR = 100
    const PERIODO_INTERVALO = 10
    
    class ContadorComponent {
        constructor() {
            this.inicializar()
        }
    
        prepararContadorProxy() {
            const handler = {
                set: (currentContext, propertyKey, newValue) => { // Método acessório SET para o objeto Proxy - Executado sempre que o objeto passado no construtor do Proxy mudar
                    console.log({ currentContext, propertyKey, newValue })
                    // console.log('Contexto Atual - Objeto que está sendo passado no construtor do Proxy', currentContext)
    
                    // Parar todo o processamento
                    if(!currentContext.valor) { // Quando for 0, ele será falso
                        currentContext.efetuarParada()
                    }
    
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
            return () => { // Currying - Função que será executada depois
                clearInterval(idIntervalo)
                elementoContador.innerHTML = ''
                this.desabilitarBotao(false) // Enxerga somente o contexto criado com o método apply()
            }
        }
    
        prepararBotao(elementoBotao, iniciarFn) {
            elementoBotao.addEventListener('click', iniciarFn.bind(this)) // Vai executar também na primeira vez, guardando os parâmetros
            // Dará erro porque o this no método inicializar é as propriedades do elemento botão, com o método bind(this) dizemos que queremos o contexto da classe
            return (valor = true) => { // Por padrão será true, ou seja, se ninguém passar algo como parâmetro
                const atributo = 'disabled'
    
                if(valor) {
                    elementoBotao.setAttribute(atributo, valor)
                    return
                }
    
                elementoBotao.removeAttribute(atributo)
            }
        } 
    
        inicializar() {
            console.log('Inicializou!')
            const elementoContador = document.getElementById(ID_CONTADOR) // OUTPUT
    
            const contador = this.prepararContadorProxy()
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
                const elementoBotao = document.getElementById(BTN_REINICIAR)
                const desabilitarBotao = this.prepararBotao(elementoBotao, this.inicializar)
                desabilitarBotao()
                const argumentos = {
                    elementoContador,
                    idIntervalo
                }
                // const desabilitarBotao = () => console.log('Desabilitou...')
                const paraContadorFn = this.agendarParadaContador.apply({ desabilitarBotao }, [argumentos]) // JÁ CHAMA O MÉTODO - Criando um novo contexto no 1° parâmetro, 2° Array de argumentos, no nosso caso temos só o objeto 'argumentos'
                contador.efetuarParada = paraContadorFn
            }
        }
    }

    window.ContadorComponent = ContadorComponent
})() // Uma função auto-executável || Agora nomes de variáveis, etc não vão conflitar com nenhuma LIB ou outros arquivos, porque só existem nesse contexto

