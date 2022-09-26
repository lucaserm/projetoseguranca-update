const client = require('../../server');
const Advertencia = require('../models/AdvertenciasModel');

function Registro(body){
  this.body = body;
}

Registro.save = async(body) => {
  try {
    let dia_hora_saida = `${body.dia_liberacao} 00:00:00`;
    await client.query('INSERT INTO Registros(dia_hora_saida, dia_liberacao, descricao, id_estudantes) VALUES($1, $2, $3, $4)', [dia_hora_saida,body.dia_liberacao, body.descricao, body.id_estudantes]);
  } catch (e) {
    console.log(`Houve um erro ${e}`)
  }
}

Registro.update = async(body) => {
  try {
    if(body.id > 0){
      await client.query('UPDATE registros SET dia_hora_saida = CURRENT_TIMESTAMP WHERE id = $1', [body.id]);
    }else{
      let texto = 'Tentativa de Saída em Horário de Aula.'
      return Advertencia.save({descricao: texto, id_estudantes: body.id_estudantes});
    }
  } catch (e) {
    console.log(`Houve um erro ${e}`)
  }
}

Registro.buscaRegistros = async() => {
  try {
    const registros = await client.query('SELECT registros.id, nome_estudante, ra, foto, descricao, dia_liberacao FROM registros, estudantes WHERE id_estudantes = estudantes.id ORDER BY id');
    const hoje = new Date();
    let data = hoje.toISOString().substring(0,10);
    let reg = [registros.rows, data]
    return reg;
  } catch (e) {
    console.log(`Houve um erro ${e}`)
  }
}

module.exports = Registro;