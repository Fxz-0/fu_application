import React from 'react'
import { cn } from '@shared/utils/cn'

const statusStyles = {
  INCOMPLETO: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  COMPLETO: 'bg-green-100 text-green-800 border-green-200',
  'NO REQUIERE': 'bg-blue-100 text-blue-800 border-blue-200',
  'SUB PROD.': 'bg-purple-100 text-purple-800 border-purple-200',
}

export default function StatusBadge({ status, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
        statusStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200',
        className
      )}
    >
      {status}
    </span>
  )
}