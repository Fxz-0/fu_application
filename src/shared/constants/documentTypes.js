export const DOCUMENT_TYPES = [
  { id: 'solicitud_credito', name: 'Solicitud de Crédito', required: true },
  { id: 'aceptacion_contrato', name: 'Aceptación Contrato', required: true },
  { id: 'hoja_resumen', name: 'Hoja Resumen - HR', required: true },
  { id: 'endoso_seguro', name: 'Endoso Seguro de Desgravamen', required: true },
  { id: 'seguro_desgravamen', name: 'Seguro de Desgravamen', required: true },
  { id: 'pagare', name: 'Pagaré', required: true },
  { id: 'dps_formatos', name: 'DPS+Formatos Adicionales', required: true },
  { id: 'cronograma', name: 'Cronograma Preliminar', required: true },
  { id: 'carta_bbva', name: 'Carta Descuento por Planilla(BBVA)', required: false },
  { id: 'carta_inst', name: 'Carta Descuento por Planilla(Inst/Conv)', required: false },
  { id: 'doi', name: 'DOI Titular y/o Conyugue', required: true },
  { id: 'remesa', name: 'Remesa Aprobada', required: true },
  { id: 'boleta', name: 'Boleta de Remuneraciones', required: true },
  { id: 'recibo', name: 'Recibo de Servicios', required: false },
  { id: 'calculadoras', name: 'Calculadoras', required: true },
  { id: 'complementarios', name: 'Documentos Complementarios', required: true },
  { id: 'reporte_riesgo', name: 'Reporte de Riesgo', required: true },
  { id: 'cicd', name: 'CICD', required: true },
  { id: 'sustentos', name: 'Sustentos CD', required: true },
  { id: 'carta_poder', name: 'Carta Poder', required: false },
  { id: 'formato_apertura', name: 'Formato Apertura Cta Independ.', required: false },
]

export const DOCUMENT_STATUS = {
  INCOMPLETO: 'INCOMPLETO',
  COMPLETO: 'COMPLETO',
  NO_REQUIERE: 'NO REQUIERE',
}
