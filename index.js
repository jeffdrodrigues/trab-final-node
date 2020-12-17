const { Console } = require("console");
const express = require("express");
const http = require("http");
const { parse } = require("path");
const WebSocket = require("ws");
const procOperacoes = require("./module/processarOperacoes");

const app = express();
/*
app.get("/", function (req, res) {
  res.send("Hello World");
});
*/
app.use("/", express.static("./site"));

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
server.listen(process.env.PORT || 9898, () => {
  console.log("Servidor conectado na porta:", server.address().port);
});
