'use client'
import React from 'react'
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'

type Props = {
  error: Error,
  reset: ()=> void
}

const error = ({error, reset}: Props) => {
  return (
    <div className="flex items-center justify-center h-screen ">
    <Card className="w-[420px]">
      <CardHeader className="text-center">
        <CardTitle className="lg:text-3xl text-3xl">{error.message || 'Something went wrong'}</CardTitle>
        <CardDescription>
          Please try again or contact support if problem persist
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center">
        <Button onClick={reset}>
Try again
        </Button>

          <Link className={buttonVariants({variant: "outline"})} href="/">Go back home</Link>
      </CardFooter>
    </Card>
  </div>
  )
}

export default error