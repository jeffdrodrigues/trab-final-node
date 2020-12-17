const soma = function (nun1, num2){
    return nun1 + num2;
};

const subtracao = function (nun1, num2){
    return nun1 - num2;
};

const multiplicacao = function (nun1, num2){
    return nun1 * num2;
};

const divisao = function (nun1, num2){
    if (num2 == 0)
        return "Não é possível dividir um número por zero!";
    
    return nun1 / num2;
};

module.exports = {soma, subtracao, multiplicacao, divisao};