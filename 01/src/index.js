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
const Manager = require('./manager')
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

const CUURENT_YEAR = 2021
Date.prototype.getFullYear = () => CUURENT_YEAR // Substituindo o método getFullYear do JS, sempre que temos variáveis que dependem do O.S mocamos, essas variáveis

{ // Caso que deu certo
    const employee = new Employee({
        name: 'Thalles Gabriel',
        age: 18,
        gender: GENDER.male
    })

    assert.deepStrictEqual(employee.name, 'Mr. Thalles Gabriel') // Comparação dos valores, se forem !== dará erro
    assert.deepStrictEqual(employee.age, undefined) // O get age não está definido, então retornará undefined
    assert.deepStrictEqual(employee.gender, 'male')
    // assert.deepStrictEqual(employee.grossPay, 'R$ 5.000,40') Dá erro mesmo sendo exatamente a mesma string
    assert.deepStrictEqual(employee.grossPay, Util.formatCurrency(5000.40)) // Deu certo!!!
    assert.deepStrictEqual(employee.netPay, Util.formatCurrency(4000.32))

    const expectedBirthYear = 2003
    assert.deepStrictEqual(employee.birthYear, expectedBirthYear)

    // BirthYear não tem set, logo não vai mudar
    // employee.birthYear = new Date().getFullYear() - 90
    // assert.deepStrictEqual(employee.birthYear, new Date().getFullYear() - 90)

    employee.age = 90 // O age tem set, logo irá mudar
    assert.deepStrictEqual(employee.birthYear, 1931)
} 

{
    const manager = new Manager({
        name: 'Yasmim Cristina',
        age: 17,
        gender: GENDER.female
    })

    assert.deepStrictEqual(manager.name, 'Ms. Yasmim Cristina')
    assert.deepStrictEqual(manager.age, undefined)
    assert.deepStrictEqual(manager.gender, 'female')
    assert.deepStrictEqual(manager.birthYear, 2004)
    assert.deepStrictEqual(manager.grossPay, Util.formatCurrency(5000.40))
    assert.deepStrictEqual(manager.bonuses, Util.formatCurrency(2000))

    assert.deepStrictEqual(manager.netPay, Util.formatCurrency(6000.32)) // Agora será o netPay do manager!
}