if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const tp = require('tedious-promises')
const superAgent = require('superagent')
const apiUrl = process.env.API_URL;



module.exports.formAPI =  async (req , res) => {
            
    const {nome, sobrenome, email} = req.body;
    const json = JSON.parse(JSON.stringify(req.body));
    await superAgent.post(apiUrl)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send(json)
    .then(function(response){ 
        const codigos = response.text.split("#")
        const codNome = BigInt(codigos[1]);
        const codSobrenome = BigInt(codigos[3]);
        const codEmail = BigInt(codigos[5]);
        //insertNome(nome, codNome);
        //insertSobrenome(sobrenome, codSobrenome);
        //insertEmail(email, codEmail);
    })
    .catch(function(e){
    console.log(e)
    })
    const somaT =  await somaTotal(112, 112, 112);
    const textoFinal = await selecaoFinal(28040);
    res.render('form.ejs',{textoFinal})
}

const inserirNome = async (codNome, nome)=>{
    await tp.sql("INSERT INTO tbs_nome (nome, cod) VALUES ('@nome','@codNome'); SELECT @@identity as id")
        .parameter('cod', TYPES.BigInt, codNome)
        .parameter('nome', TYPES.String, nome)
        .execute()
        .then(function(results) {
          console.log(results[0].id);
    });
}
const inserirSobrenome = async (codSobrenome, sobrenome)=>{
    await tp.sql("INSERT INTO tbs_nome (sobrenome, cod) VALUES ('@sobrenom','@codSobrenome'); SELECT @@identity as id")
        .parameter('cod', TYPES.BigInt, codSobrenome)
        .parameter('nome', TYPES.String, sobrenome)
        .execute()
        .then(function(results) {
          console.log(results[0].id);
    });
}

const inserirEmail = async (codEmail, email)=>{
    await tp.sql("INSERT INTO tbs_nome (email, cod) VALUES ('@email','@codEmail'); SELECT @@identity as id")
        .parameter('cod', TYPES.BigInt, codEmail)
        .parameter('nome', TYPES.String, email)
        .execute()
        .then(function(results) {
          console.log(results[0].id);
    });
}

const getSomaNome = async function(codNome){
    let somaNome = 0;
    await tp.sql("SELECT * FROM tbs_cod_nome WHERE id = 125")
    //.parameter('id', TYPES.BigInt, codNome)
    .execute()
    .then(function(results) {
       const cod = parseInt(results[0].cod);
       const soma = parseInt(results[0].soma);
       somaNome = cod + soma;   
       //console.log(somaNome)
    }).fail(function(err) {
     console.log(err)
    });
    
    return somaNome;
}
const getSomaSobrenome = async function(codSobrenome){
    let somaSobrenome = 0;
    await tp.sql("SELECT id, cod, soma FROM tbs_cod_sobrenome WHERE id = 125 ")
    //.parameter('cod', TYPES.BigInt, codSobrenome)
    .execute()
    .then(function(results) {
      const cod = parseInt(results[0].cod);
      const soma = parseInt(results[0].soma);
      somaSobrenome = cod + soma;

    }).fail(function(err) {
     console.log(err)
    });
    
    return somaSobrenome;
}

const getSomaEmail = async function(codEmail){
    let somaEmail = 0;
    await tp.sql("SELECT cod, soma FROM tbs_cod_email WHERE id = 125 ")
    //.parameter('cod', TYPES.BigInt, codEmail)
    .execute()
    .then(function(results) {
      const cod = parseInt(results[0].cod);
      const soma = parseInt(results[0].soma);
      somaEmail = cod + soma;
    }).fail(function(err) {
     console.log(err)
    });
    return somaEmail;
}

const somaTotal = async (codNome, codSobrenome, codEmail) =>{
    const somaN = await getSomaNome(codNome);
    const somaS = await getSomaSobrenome(codSobrenome);
    const somaE = await getSomaEmail(codEmail);
    const somaTotal = somaE + somaN + somaS;
    console.log(somaE);
    console.log(somaS);
    console.log(somaN);
    console.log(somaTotal)
    return somaTotal;
}

const selecaoFinal = async (total) =>{
    let selecionados = "";
    await tp.sql("SELECT TOP 1 * FROM tbs_animais A JOIN tbs_cores B ON B.total = A.total JOIN tbs_paises C ON A.total = C.total LEFT JOIN tbs_cores_excluidas D ON A.total = D.total  WHERE A.total = 19947")
    //.parameter('total', TYPES.BigInt, total)
    .execute()
    .then(function(results) {
        selecionados = `Animal selecionado: ${results[0].animal} ---
        Pais selecionado: ${results[0].pais}---
        Cor selecionada: ${results[0].cor}` 
        
        //console.log(selecionados)
    }).fail(function(err) {
     console.log(err)
    });
    return selecionados
}
