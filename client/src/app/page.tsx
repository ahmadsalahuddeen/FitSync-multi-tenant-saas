import Link from 'next/link'
import { ModeToggle } from '../components/ModeToggle'
import React from 'react'


type Props = {}

const Home = (props: Props) => {
  return (
<main><h1>hi hellow wordl</h1>
<Link href='/signup'>Free Trial</Link>

</main>
  )
}

export default Home