import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Addresses = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <h2 className='heading-2'>Addresses</h2>
        <Button type='button' variant={'ghost'} className='underline underline-offset-4' asChild>
          <Link href={'/profile/addresses'}>
            my addresses
          </Link>
        </Button>
      </div>

    </div>
  )
}

export default Addresses