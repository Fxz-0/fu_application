import React, { useState } from 'react'
import ClientSearch from '../components/client/ClientSearch'
import FileUnicoForm from '../components/file/FileUnicoForm'
import DocumentValidation from '../components/file/DocumentValidation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/common/Tabs'

export default function FileUnicoPage() {
  const [selectedClient, setSelectedClient] = useState(null)
  const [currentFile, setCurrentFile] = useState(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">File Único</h2>
      </div>

      <Tabs defaultValue="client" className="w-full">
        <TabsList>
          <TabsTrigger value="client">Datos del Cliente</TabsTrigger>
          <TabsTrigger value="sale" disabled={!selectedClient}>
            Datos de Venta
          </TabsTrigger>
          <TabsTrigger value="documents" disabled={!currentFile}>
            Validación de Documentos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="client" className="mt-6">
          <ClientSearch onClientSelect={setSelectedClient} />
        </TabsContent>

        <TabsContent value="sale" className="mt-6">
          <FileUnicoForm 
            client={selectedClient} 
            onFileCreated={setCurrentFile}
          />
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <DocumentValidation fileUnico={currentFile} />
        </TabsContent>
      </Tabs>
    </div>
  )
}