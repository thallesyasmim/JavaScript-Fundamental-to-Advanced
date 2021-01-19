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

const GENDER = { // Como se fosse um ENUM, para não ficarmos com string perdida por aí
    male: 'male',
    female: 'female'
}

{ // Diz que estamos criando um contexto, as variáveis que serão criadas não poderão ser acessadas de fora
    const employee = new Employee({
        name: 'Yasmim Cristina',
        gender: GENDER.female
    })

    console.log('Employee', employee.birthYear) // Deu erro porque não passamos o 'age'
}