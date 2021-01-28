const { describe, it, before } = require('mocha') // Mocha - nosso motor de renderização, não precisamos usar o Node em sí aqui
const { expect } = require('chai') // Chai - para fazer asserções, vimos o módulo Assert do Node.js também, porém vamos usar o Chai por ser algo mais facilmente visível

describe('todo', () => {

})

/* Pensamento sobre TDD não tem nada haver com ferramenta, afinal, poderíamos usar TDD aqui somente com que existe no Node.js 
    O conceito é como que eu penso nas funcionalidades, o que há área de negócio me passou. As regras do sistema tem que ficar muito bem definidas antes de começar
    Ter um bloco de notas por exemplo com o que precisa ser entregue para depois ir implementando os testes

    O TDD normalmente fazemos o teste para falhar e arrumamos esse teste para passar depois, porém há alguns casos que não faz sentido
    como por exemplo: Testar se um método existe numa classe se nem criamos a classe ainda.
    Nesse caso, o Erick Wendel criaria a classe primeiro, a assinatura para depois fazer os testes. Acaba sendo mais produtivo!
    */