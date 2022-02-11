const fs = require('fs');
function allGames() {
    let dataBase = require("../gamesdatabase.json");
    return dataBase;
}

function addGame(adding) {
    let dataBase = "./gamesdatabase.json";
    let consult = require("../gamesdatabase.json");
    adding.id = consult[consult.length - 1].id + 1;
    console.log(adding);
    try {
        console.log("Escrevendo no arquivo");
        fs.readFile(dataBase, 'utf-8', (err, data) => {
            if (err) throw err;
            let info = JSON.parse(data || "[]");
            info.push(adding);

            let string = JSON.stringify(info, null, 6);
            console.log("Adicionando isso -> ", string);
            fs.writeFile(dataBase, string, (err) => {
                if (err) throw err;
                console.log('Arquivo salvo!');
            });
        });
        return 1;
    } catch { (e) => console.log("Teve um erro aí ", e) };
}

module.exports = {allGames, addGame}