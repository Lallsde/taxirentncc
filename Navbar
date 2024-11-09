import React from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-[#FF7F27] text-2xl font-bold">
          TaxiRentNcc
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="text-white hover:text-[#FF7F27]">
            Home
          </Link>
          <Link href="/abbonamenti" className="text-white hover:text-[#FF7F27]">
            Abbonamenti
          </Link>
          <Link href="/prenotazioni" className="text-white hover:text-[#FF7F27]">
            Prenotazioni
          </Link>
          <Link href="/contatti" className="text-white hover:text-[#FF7F27]">
            Contatti
          </Link>
        </div>
        <Button className="md:hidden bg-[#FF7F27] text-white">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
