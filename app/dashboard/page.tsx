
import { requireUser } from '@/lib/hooks'
import React from 'react'

export default async function Dashboard() {

  await requireUser()

  return (
    <div>Dashboard Page</div>
  )
}