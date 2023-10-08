import Link from "next/link";
import Container from "../ui/container";


const routes = [
  {
    href: '/login',
    label: "Login"
  }
]

function Header() {

  return (

    <header className="sm:flex sm:justify-between py-3 px-4 border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
         
          {/* store name */}
          <div className="flex items-center" >
            <Link href='/ ' className="ml-4 lg:ml-0">
              <h1 className="text-xl font-mono font-semibold">FITsync</h1>
              </Link>
          </div>

          {/* NavMenu */}
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">

          </nav>


        </div>
      </Container>
    </header>
  );
}

export default Header;
