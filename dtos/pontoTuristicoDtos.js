const Joi = require('joi');
// DTO para validar dados de requisição (criação/atualização)
const pontoReqDtos = Joi.object({
  nomePonto: Joi.string().min(3).required(),
  descPonto: Joi.string().allow('').optional(),
  cep: Joi.string().optional(),
  endereco: Joi.string().optional(),
  numero: Joi.string().optional(),
  complemento: Joi.string().optional(),
  bairro: Joi.string().optional(),
  cidade: Joi.string().optional(),
  estado: Joi.string().optional(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  categoria: Joi.string().required(),
  horarioFuncionamento: Joi.string().allow('').optional(),
  custoEntrada: Joi.number().optional(),
  acessibilidadeInfo: Joi.string().allow('').optional(),
  aprovado: Joi.boolean().default(false)
});

// DTO para formatar a resposta, por exemplo, ocultar campos que não quer expor
const pontoResDtos = (ponto) => {
  return {
    id: ponto.id,
    nomePonto: ponto.nomePonto,
    descricao: ponto.descPonto,
    enderecoCompleto: `${ponto.endereco || ''}, ${ponto.numero || ''} ${ponto.complemento || ''}`.trim(),
    bairro: ponto.bairro,
    cidade: ponto.cidade,
    estado: ponto.estado,
    cep: ponto.cep,
    coordenadas: {
      latitude: ponto.latitude,
      longitude: ponto.longitude
    },
    categoria: ponto.categoria,
    horarioFuncionamento: ponto.horarioFuncionamento,
    custoEntrada: ponto.custoEntrada,
    acessibilidadeInfo: ponto.acessibilidadeInfo,
    aprovado: ponto.aprovado,
    criadoEm: ponto.createdAt,
    atualizadoEm: ponto.updatedAt
  };
};

module.exports = {
  pontoReqDtos,
  pontoResDtos,
};
