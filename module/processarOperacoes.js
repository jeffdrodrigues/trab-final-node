const operacoes = require("./operacoes");


function ProcessarOperacao(operacao, num1, num2, result, erro) {
    switch (operacao) {
        case '+':
            result = operacoes.soma(num1, num2);
            operacao = "soma";
            break;
        case '-':
            result = operacoes.subtracao(num1, num2);
            operacao = "subtração";
            break;
        case '*':
            result = operacoes.multiplicacao(num1, num2);
            operacao = "multiplicação";
            break;
        case '/':
            result = operacoes.divisao(num1, num2);
            operacao = "divisão";
            break;
        default:
            result = `Desculpe, não foi possível utilizar o operador: ${operacao}.`;
            erro = true;
    }
    return { erro, result, operacao };
}


function InterpretarOperacao(msg, operacao, num1, num2){    
    for (var i = 0; i < msg.length; i++) {        
        var caracter = msg.substring(i,i+1);

        if (EhOperador(caracter) && operacao === null && i > 0){
            operacao = caracter;
            num1 = msg.substring(0, i);
            num2 = msg.substring(i+1, msg.length);
            break;
        }
    }

    num1 = parseInt(num1 || 0);
    num2 = parseInt(num2 || 0);

    return { operacao, num1, num2 };
}


function EhOperador(caracter){
    switch (caracter) {
        case "+":
        case "-":
        case "*":
        case "/":
            return true;
        default:
            return false;
    }
}

module.exports = {ProcessarOperacao, InterpretarOperacao};