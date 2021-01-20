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
const Util = require('./util')

const GENDER = { // Como se fosse um ENUM, para não ficarmos com string perdida por aí
    male: 'male',
    female: 'female'
}

{ // Caso que deu erro
    const employee = new Employee({
        name: 'Yasmim Cristina',
        gender: GENDER.female
    })

    assert.throws(() => employee.birthYear, { message: 'you must define age first!!' }) 
}

{ // Caso que deu certo
    const employee = new Employee({
        name: 'Thalles Gabriel',
        age: 17,
        gender: GENDER.male
    })

    assert.deepStrictEqual(employee.name, 'Mr. Thalles Gabriel') // Comparação dos valores, se forem !== dará erro
    assert.deepStrictEqual(employee.age, undefined) // O get age não está definido, então retornará undefined
    assert.deepStrictEqual(employee.gender, 'male')
    // assert.deepStrictEqual(employee.grossPay, 'R$ 5.000,40') Dá erro mesmo sendo exatamente a mesma string
    assert.deepStrictEqual(employee.grossPay, Util.formatCurrency(5000.40)) // Deu certo!!!
} 
