import BrandManagement from '@/components/BrandManagement'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'

interface Props {}
interface BrandPageProps {
    params:{
        brandId: string
    }
}
const page = ({params}: BrandPageProps) => {
    const {brandId} = params
    
  return (
    <MaxWidthWrapper>
       <BrandManagement brandId={brandId}/>
    </MaxWidthWrapper>
  )
}

export default page