'use client';

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react'

const PersonalInformation = () => {

  const { user } = useUser()

  if (!user) {
    return <div className='flex h-screen items-center justify-center'>
      <h1 className='heading-1'>Please login first</h1>
      <Button type='button' asChild>
        <Link href={'/sign-in'}>Go back to login</Link>
      </Button>
    </div>
  }

  const fullName = user?.fullName
  const email = user?.emailAddresses.map((e) => e.emailAddress)

  return (
    <div>
      <h2 className='heading-2'>{fullName}</h2>
      <p>Email: {email}</p>
    </div>
  )
}

export default PersonalInformation