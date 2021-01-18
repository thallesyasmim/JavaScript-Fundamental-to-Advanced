// const EntityBase = require('./entityBase')

// console.log(new EntityBase({
//     name: 'Yasmim Cristina',
//     gender: 'female'
// }).name)

// console.log(new EntityBase({
//     name: 'Thalles Gabriel',
//     gender: 'male'
// }).name)

const assert = require('assert')
const Employee = require('./employee')

{ // Diz que estamos criando um contexto, as variáveis que serão criadas não poderão ser acessadas de fora
    const yasmim = 'Linda'
}
{ // Por exemplo, não dará erro
    const yasmim = 'Linda'
}