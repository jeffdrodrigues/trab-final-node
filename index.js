const operacoes = require("./module/operacoes");
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor ativo na porta: ${port}`);
  })

app.get('/', (req, res) => {
  res.send('Serviço está ativo!');
})

app.get('/operacao/:operacao/:num1/:num2', (req, res) => {
    const num1 = parseInt(req.params.num1 || 0);
    const num2 = parseInt(req.params.num2 || 0);
    const operacao = req.params.operacao;
    var result = 0;
    var erro = false;

    ({ erro, result } = ProcessarOperacao(operacao, num1, num2, result, erro));

    if (erro)
        res.send(result);
    else
        res.send(`O resultado da ${operacao} é: ${result}`);
  })

  app.post("/operacao", (req, res) => {
    const num1 = parseInt(req.query.num1 || 0);
    const num2 = parseInt(req.query.num2 || 0);
    const operacao = req.query.operacao;
    var result = 0;
    var erro = false;

    ({ erro, result } = ProcessarOperacao(operacao, num1, num2, result, erro));

    if (erro)
        res.send(result);
    else
        res.send(`O resultado da ${operacao} é: ${result}`);
})

function ProcessarOperacao(operacao, num1, num2, result, erro) {
    switch (operacao) {
        case 'soma':
            result = operacoes.soma(num1, num2);
            break;
        case 'subtração':
            result = operacoes.subtracao(num1, num2);
            break;
        case 'multiplicação':
            result = operacoes.multiplicacao(num1, num2);
            break;
        case 'divisão':
            result = operacoes.divisao(num1, num2);
            break;
        default:
            result = `Desculpe, não foi possível utilizar o operador: ${operacao}.`;
            var erro = true;
    }
    return { erro, result };
}
