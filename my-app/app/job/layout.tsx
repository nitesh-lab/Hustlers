import Tab from '@/components/job/Tab'
import React, { ReactNode } from 'react'

export default  function layout({children}:{children:ReactNode}) {
  return (
    <>
    <Tab state={1} />
    {children}
    </>
  )
}

