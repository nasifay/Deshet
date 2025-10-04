import Link from "next/link";
import Button from "~/components/ui/Button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              Tamra for Social Development
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/programs" className="text-gray-700 hover:text-primary transition-colors">
              Programs
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button intent="primary" size="sm">
              Donate
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}