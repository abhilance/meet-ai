import { EmptyState } from '@/components/empty-state'
import React from 'react'

export const ProcessingState = () => {
  return (
    <div className='bg-white rounded-lg px-4 py-5 flrx flrx-col gap-y-8 items-center justify-center'>
      <EmptyState image="/processing.svg"
      tittle="Meeting is Completed"
      description="This meeting was completd, a summary will appear soon"
      >
      </EmptyState>
      
    </div>
   
  )
}



