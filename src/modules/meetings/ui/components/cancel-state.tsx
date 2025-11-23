import { EmptyState } from '@/components/empty-state'
import React from 'react'

export const CancelledState = () => {
  return (
    <div className='bg-white rounded-lg px-4 py-5 flrx flrx-col gap-y-8 items-center justify-center'>
      <EmptyState image="/cancelled.svg"
      tittle="Meeting cancelled"
      description="This meeting was cancelled"
      >
      </EmptyState>
      
    </div>
   
  )
}



