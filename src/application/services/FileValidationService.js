import { DOCUMENT_TYPES } from '@shared/constants/documentTypes'

export class FileValidationService {
  constructor() {
    this.requiredDocuments = DOCUMENT_TYPES
  }

  validateFile(fileUnico) {
    const errors = []
    const warnings = []

    // Validar datos básicos
    if (!fileUnico.promotor) {
      errors.push('El promotor es obligatorio')
    }

    if (!fileUnico.producto) {
      errors.push('El producto es obligatorio')
    }

    if (!fileUnico.impSol || fileUnico.impSol <= 0) {
      errors.push('El importe solicitado debe ser mayor a 0')
    }

    // Validar documentos
    const missingDocs = this.getMissingDocuments(fileUnico.documents)
    if (missingDocs.length > 0) {
      warnings.push(`Documentos faltantes: ${missingDocs.join(', ')}`)
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      completionPercentage: fileUnico.getCompletionPercentage()
    }
  }

  getMissingDocuments(documents) {
    const uploadedTypes = documents
      .filter(d => d.status === 'COMPLETO')
      .map(d => d.documentType)

    return this.requiredDocuments
      .filter(req => !uploadedTypes.includes(req.id))
      .map(req => req.name)
  }

  canSubmit(fileUnico) {
    const validation = this.validateFile(fileUnico)
    return validation.isValid && validation.completionPercentage === 100
  }
}
