import React, { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, AlertCircle, Upload, Eye } from 'lucide-react'
import { cn } from '@shared/utils/cn'
import Button from '../common/Button'
import StatusBadge from '../common/StatusBadge'

const DOCUMENT_LIST = [
  { id: 1, name: 'Solicitud de Crédito', required: true },
  { id: 2, name: 'Aceptación Contrato', required: true },
  { id: 3, name: 'Hoja Resumen - HR', required: true },
  { id: 4, name: 'Endoso Seguro de Desgravamen', required: true },
  { id: 5, name: 'Seguro de Desgravamen', required: true },
  { id: 6, name: 'Pagaré', required: true },
  { id: 7, name: 'DPS+Formatos Adicionales', required: true },
  { id: 8, name: 'Cronograma Preliminar', required: true },
  { id: 9, name: 'Carta Descuento por Planilla(BBVA)', required: false },
  { id: 10, name: 'Carta Descuento por Planilla(Inst/Conv)', required: false },
  { id: 11, name: 'DOI Titular y/o Conyugue', required: true },
  { id: 12, name: 'Remesa Aprobada', required: true },
  { id: 13, name: 'Boleta de Remuneraciones', required: true },
  { id: 14, name: 'Recibo de Servicios', required: false },
  { id: 15, name: 'Calculadoras', required: true },
  { id: 16, name: 'Documentos Complementarios', required: true },
  { id: 17, name: 'Reporte de Riesgo', required: true },
  { id: 18, name: 'CICD', required: true },
  { id: 19, name: 'Sustentos CD', required: true },
  { id: 20, name: 'Carta Poder', required: false },
  { id: 21, name: 'Formato Apertura Cta Independ.', required: false },
]

export default function DocumentValidation({ fileUnico }) {
  const [documents, setDocuments] = useState([])
  const [uploadingDoc, setUploadingDoc] = useState(null)

  useEffect(() => {
    if (fileUnico) {
      loadDocuments()
    }
  }, [fileUnico])

  const loadDocuments = async () => {
    const result = await window.electronAPI.getDocuments(fileUnico.id)
    if (result.success) {
      setDocuments(result.data)
    }
  }

  const handleUpload = async (docId) => {
    setUploadingDoc(docId)
    // Simulate upload
    setTimeout(() => {
      setUploadingDoc(null)
      // Update document status
    }, 2000)
  }

  const handleStatusChange = async (docId, newStatus) => {
    const result = await window.electronAPI.updateDocumentStatus(docId, newStatus)
    if (result.success) {
      loadDocuments()
    }
  }

  const getDocumentStatus = (docId) => {
    const doc = documents.find(d => d.documentType === docId)
    return doc?.status || 'INCOMPLETO'
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETO':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case 'NO REQUIERE':
        return <CheckCircle2 className="w-5 h-5 text-blue-500" />
      default:
        return <XCircle className="w-5 h-5 text-yellow-500" />
    }
  }

  const completionPercentage = () => {
    const completed = DOCUMENT_LIST.filter(doc => {
      const status = getDocumentStatus(doc.id)
      return status === 'COMPLETO' || status === 'NO REQUIERE'
    }).length
    return Math.round((completed / DOCUMENT_LIST.length) * 100)
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Progreso de Validación
          </h3>
          <span className="text-2xl font-bold text-primary-600">
            {completionPercentage()}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-primary-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage()}%` }}
          />
        </div>
      </div>

      {/* Document List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Validación del File Físico
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {DOCUMENT_LIST.map((doc) => {
            const status = getDocumentStatus(doc.id)
            const isUploading = uploadingDoc === doc.id

            return (
              <div
                key={doc.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center justify-center w-8">
                      {getStatusIcon(status)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          {String(doc.id).padStart(2, '0')}.
                        </span>
                        <span className="text-sm text-gray-900">
                          {doc.name}
                        </span>
                        {!doc.required && (
                          <span className="text-xs text-gray-500 italic">
                            (Opcional)
                          </span>
                        )}
                      </div>
                    </div>

                    <StatusBadge status={status} />
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <select
                      value={status}
                      onChange={(e) => handleStatusChange(doc.id, e.target.value)}
                      className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="INCOMPLETO">Incompleto</option>
                      <option value="COMPLETO">Completo</option>
                      <option value="NO REQUIERE">No Requiere</option>
                    </select>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpload(doc.id)}
                      disabled={isUploading}
                    >
                      <Upload className="w-4 h-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={status !== 'COMPLETO'}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">
          Guardar Borrador
        </Button>
        <Button disabled={completionPercentage() < 100}>
          Enviar File Único
        </Button>
      </div>
    </div>
  )
}
