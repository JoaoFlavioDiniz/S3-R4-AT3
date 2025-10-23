const express = require("express");
const app = express();
PORT = 8081;

const fs = require ("fs");

app.get("/S3-R4-AT3", (req, res)=>{

    try {
        //lendo o arquivo json
        const data = fs.readFileSync("./usuarios.json", "utf-8");
         //transformar o arquivo json em objeto js
         let usuarios = JSON.parse(data);
         const{nomeUsuario, emailUsuario} = req.query;
         if(nomeUsuario){
            usuarios = usuarios.filter(usuario => usuario.nome.toLowerCase() .includes(nomeUsuario.toLowerCase()));
         }
         
         res.status(200).json(usuarios);

        
    } catch (error) {
        console.error("Erro ao ler o arquivo json", error);
        res.status(500).json({error: " Erro interno no servidor"})
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta 8081: http://localhost:${PORT}`);
});