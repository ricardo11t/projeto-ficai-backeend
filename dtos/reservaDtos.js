const reservaDTO = {
  // Validação e preparação dos dados da requisição (ReqDTO)
  parseRequest: (data) => {
    const {
      dataCheckin,
      dataCheckout,
      numeroHospedes,
      precoTotalReserva,
      observacoes,
      statusReserva,
    } = data;

    if (!dataCheckin || !dataCheckout) {
      throw new Error('Datas de check-in e check-out são obrigatórias.');
    }

    if (!numeroHospedes || numeroHospedes <= 0) {
      throw new Error('Número de hóspedes deve ser maior que zero.');
    }

    if (!precoTotalReserva || precoTotalReserva <= 0) {
      throw new Error('Preço total da reserva deve ser válido.');
    }

    return {
      dataCheckin,
      dataCheckout,
      numeroHospedes,
      precoTotalReserva,
      observacoes: observacoes || null,
      statusReserva: statusReserva || 'pendente',
    };
  },

  // Formatação dos dados para resposta (ResDTO)
  toResponse: (reserva) => {
    return {
      id: reserva.id,
      dataCheckin: reserva.dataCheckin,
      dataCheckout: reserva.dataCheckout,
      numeroHospedes: reserva.numeroHospedes,
      precoTotalReserva: reserva.precoTotalReserva,
      observacoes: reserva.observacoes,
      statusReserva: reserva.statusReserva,
      criadoEm: reserva.createdAt,
      atualizadoEm: reserva.updatedAt
    };
  },

  // Formatação para listas de reservas
  toListResponse: (reservas) => reservas.map(reservaDTO.toResponse)
};

module.exports = reservaDTO;
