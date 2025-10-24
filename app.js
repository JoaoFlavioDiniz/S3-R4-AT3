const express = require("express");
const app = express();
PORT = 8081;

const fs = require ("fs");

app.get("/S3-R4-AT4", (req, res)=>{

    try {
        //lendo o arquivo json
        const data = fs.readFileSync("./eventos.json", "utf-8");
         //transformar o arquivo json em objeto js
         let eventos = JSON.parse(data);
         const{nomeEvento, dataEvento, dataInicial, dataFinal} = req.query;
         if(nomeEvento){
            eventos = eventos.filter(evento => evento.nome.toLowerCase() .includes(nomeEvento.toLowerCase()));
         }
         if(dataEvento){
            if(dataEvento == "" || dataEvento <= (dataFinal)){
           return res.status(404).send(`Data incorreta`);
         }
            eventos = eventos.filter(evento => evento.data >= dataEvento);
         }
         
         if(dataFinal){
            if(dataFinal == "" || isNaN(dataFinal)){
           return res.status(404).send(`Data incorreta`);
         }
            eventos = eventos.filter(evento => evento.data >= dataFinal);
         }

         res.status(200).json(eventos);

        
    } catch (error) {
        console.error("Erro ao ler o arquivo json", error);
        res.status(500).json({error: " Erro interno no servidor"});
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta 8081: http://localhost:${PORT}`);
});