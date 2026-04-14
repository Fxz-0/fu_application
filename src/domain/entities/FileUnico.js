export class FileUnico {
  constructor({
    id,
    clientId,
    year,
    month,
    promotor,
    supervisor,
    zone,
    sede,
    impSol,
    estado,
    fecha,
    producto,
    subProducto,
    oficina,
    estadoSGC,
    subEstadoSGC,
    estadoFileFisico,
    numeroContrato,
    comentario,
    nominaEnviado,
    documents = [],
    createdAt,
    updatedAt
  }) {
    this.id = id
    this.clientId = clientId
    this.year = year
    this.month = month
    this.promotor = promotor
    this.supervisor = supervisor
    this.zone = zone
    this.sede = sede
    this.impSol = impSol
    this.estado = estado
    this.fecha = fecha
    this.producto = producto
    this.subProducto = subProducto
    this.oficina = oficina
    this.estadoSGC = estadoSGC
    this.subEstadoSGC = subEstadoSGC
    this.estadoFileFisico = estadoFileFisico
    this.numeroContrato = numeroContrato
    this.comentario = comentario
    this.nominaEnviado = nominaEnviado
    this.documents = documents
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  getDocumentStatus(documentId) {
    const doc = this.documents.find(d => d.id === documentId)
    return doc?.status || 'INCOMPLETO'
  }

  getCompletionPercentage() {
    if (this.documents.length === 0) return 0
    const completed = this.documents.filter(d => 
      d.status === 'COMPLETO' || d.status === 'NO REQUIERE'
    ).length
    return Math.round((completed / this.documents.length) * 100)
  }

  isComplete() {
    return this.documents.every(d => 
      d.status === 'COMPLETO' || d.status === 'NO REQUIERE'
    )
  }
}
