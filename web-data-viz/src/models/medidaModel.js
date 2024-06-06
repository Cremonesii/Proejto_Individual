var database = require("../database/config");

function grafico_quiz(idUsuario) {

    var instrucaoSql = `
select acerto, erro from score where idScore = (select max(idScore) from score where fkUsuario = '${idUsuario}');`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    grafico_quiz
}
