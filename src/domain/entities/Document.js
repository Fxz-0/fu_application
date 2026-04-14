export class Document {
  constructor({
    id,
    fileUnicoId,
    documentType,
    name,
    status,
    uploadedAt,
    filePath,
    observations
  }) {
    this.id = id
    this.fileUnicoId = fileUnicoId
    this.documentType = documentType
    this.name = name
    this.status = status // INCOMPLETO, COMPLETO, NO REQUIERE
    this.uploadedAt = uploadedAt
    this.filePath = filePath
    this.observations = observations
  }

  isRequired() {
    return this.status !== 'NO REQUIERE'
  }

  isComplete() {
    return this.status === 'COMPLETO' || this.status === 'NO REQUIERE'
  }
}
