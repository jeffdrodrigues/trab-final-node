const { Console } = require("console");
const express = require("express");
const http = require("http");
const { parse } = require("path");
const WebSocket = require("ws");
const procOperacoes = require("./module/processarOperacoes");
const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('Serviço está ativo!');
});

//Inicializa um servidor HTTP orquestrado pelo express
const server = http.createServer(app);

//Inicializa um instancia de servidor websocket a partir do servidor http
const wss = new WebSocket.Server({ server });

// Função responsável por manusear a conexão websocket
wss.on("connection", (ws) => {
  // Função que trata as mensagens recebidas pelo servidor
  ws.on("message", (message) => {
    console.log("Mensagem recebida: ", message);
    ws.send(ProcessarResposta(message));
  });
});


function ProcessarResposta(msg){
    var operacao = null;
    var num1;
    var num2;
    var result = 0;
    var erro = false;

    ({ operacao, num1, num2 } = procOperacoes.InterpretarOperacao(msg, operacao, num1, num2));
    ({ erro, result, operacao } = procOperacoes.ProcessarOperacao(operacao, num1, num2, result, erro));

    if (erro)
        return result;
    else
        return (`O resultado da ${operacao} é: ${result}`);
}

//Inicia o servidor
server.listen(port, () => {
  console.log(`Servidor ativo na porta: ${port}`);
});
