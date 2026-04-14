import ExcelJS from 'exceljs'
import { format } from 'date-fns'

export class ExcelExportService {
  async exportFilesToExcel(files, clients) {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Files Únicos')

    // Configurar columnas
    worksheet.columns = [
      { header: 'Expediente', key: 'expediente', width: 15 },
      { header: 'DNI', key: 'dni', width: 12 },
      { header: 'Cliente', key: 'cliente', width: 40 },
      { header: 'Promotor', key: 'promotor', width: 25 },
      { header: 'Producto', key: 'producto', width: 20 },
      { header: 'Imp. Solicitado', key: 'impSol', width: 15 },
      { header: 'Estado', key: 'estado', width: 15 },
      { header: 'Fecha', key: 'fecha', width: 12 },
      { header: 'Completitud', key: 'completitud', width: 12 },
    ]

    // Estilo del encabezado
    worksheet.getRow(1).font = { bold: true }
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF2563EB' }
    }
    worksheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true }

    // Agregar datos
    files.forEach(file => {
      const client = clients.find(c => c.id === file.clientId)
      worksheet.addRow({
        expediente: client?.expediente || '',
        dni: client?.documentNumber || '',
        cliente: client?.fullName || '',
        promotor: file.promotor,
        producto: file.producto,
        impSol: file.impSol,
        estado: file.estado,
        fecha: file.fecha ? format(new Date(file.fecha), 'dd/MM/yyyy') : '',
        completitud: `${file.getCompletionPercentage()}%`
      })
    })

    // Aplicar bordes
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      })
    })

    return workbook
  }

  async saveToFile(workbook, filePath) {
    await workbook.xlsx.writeFile(filePath)
  }
}
