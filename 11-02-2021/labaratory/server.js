const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(8080);

app.use(express.static('public'));



///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// ДАННЫЕ ИГРЫ //////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

let games = []
let sockets = {}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// ОСНОВНАЯ ЛОГИКА //////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

io.on('connection', (socket) => {

    sockets[socket.id] = socket

    // Попробуем найти незавершенную игру по игроку
    let game = getProcessingGameByPlayerId(socket.id);

    // Если игра найдена, значит проверить на завершение игры
    if(game){
        isFinishGame(game)
    }

    // Если незавершенная игра не найдена, то пробуем найти "Ожидающую игрока" игру
    if(!game){
        game = getOpenedGameBy(socket.id)
    }

    // Если ожидающая игра не найдена, то создаем новую игру
    if(!game){
        let player = newPlayer(socket.id, 1);
        game = newGame(player);
        games.push(game);
    }

    // Определить чей ход
    game.move = getMove(game)
    giveGame(game)

    socket.on('step', function (data) {
        game = data.game
        isFinishGame(game)
        game.move = getMove(game)
        giveGame(game)
    });
    console.log("Количество игр: " + games.length )


});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ ///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// найти незавершенную игру по игроку
function getProcessingGameByPlayerId(playerId){
    let result = null;
    games.forEach((game) => {
        if(game.status === 'processing'){
            game.players.forEach((player) => {
                if(player.id === playerId){
                    result = game;
                }
            })
        }
    })
    return result;
}
// найти ожидающую игрока игру
function getOpenedGameBy(playerId){
    let result = null;
    games.forEach((game) => {
        if(game.status === 'open'){
            result = game
        }
    })
    if(result !== null){
        result.players.push(newPlayer(playerId, 2))
        result.status = 'processing'
    }
    return result
}

// Создать новую игру по игроку
function newGame(player){
    return {
        id: +new Date(),
        status: 'open', // open - игра ожидает игрока, processing - игра идет, finish - Игра закончена
        data: [null,null,null,null,null,null,null,null,null],
        players: [player],
        move: false,
    }
}

// Создать нового игрока
function newPlayer(socketId, playerType){
    return {
        id: socketId,
        name: 'Игрок_' + +new Date(),
        playerType,
    }
}


// Отдать клиентам игру
function giveGame(game){
    game.players.forEach((player) => {
        game.player = getPlayerBySocketId(game, player.id)
        sockets[player.id].emit('give_game', { game });
    })
}

// Проверка на завершение игры
function isFinishGame(game){
    function inspectionByPlayerType(d, pt){
        if(
            (d[0] === pt && d[1] === pt && d[2] === pt) ||
            (d[3] === pt && d[4] === pt && d[5] === pt) ||
            (d[6] === pt && d[7] === pt && d[8] === pt) ||
            (d[0] === pt && d[3] === pt && d[6] === pt) ||
            (d[1] === pt && d[4] === pt && d[7] === pt) ||
            (d[2] === pt && d[5] === pt && d[8] === pt) ||
            (d[0] === pt && d[4] === pt && d[8] === pt) ||
            (d[2] === pt && d[4] === pt && d[6] === pt)
        ){
            return true
        }else{
            return false
        }
    }
    const d = game.data
    const finishByPlayerTypeOne = inspectionByPlayerType(d, 1);
    const finishByPlayerTypeTwo = inspectionByPlayerType(d, 2);

    if(finishByPlayerTypeOne || finishByPlayerTypeTwo){
        game.status = 'finish'
    }
}

// Чей ход
function getMove(game){
    if(game.data.filter( e => e != null).length % 2 === 0){
        return 1
    }else{
        return 2
    }
}

// Найти игрока
function getPlayerBySocketId(game, socketId){
    let result = null
    game.players.forEach((player) => {
        if(player.id === socketId){
            result = player
        }
    })
    return result
}
