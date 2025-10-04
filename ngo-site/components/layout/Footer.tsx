import Container from "~/components/ui/Container";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-muted/40">
      <Container className="py-10 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2 font-bold text-primary mb-3">
            <span className="inline-block w-7 h-7 rounded-full bg-primary" />
            TSD
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-sm">
            Empowering young people through holistic development in health, education, livelihoods, and civic engagement.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold mb-2">Explore</h5>
            <ul className="space-y-2">
              <li><Link href="/who-we-are" className="hover:text-primary">Who we are</Link></li>
              <li><Link href="/news" className="hover:text-primary">News</Link></li>
              <li><Link href="/gallery" className="hover:text-primary">Gallery</Link></li>
              <li><Link href="/volunteer" className="hover:text-primary">Volunteer</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Legal</h5>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-primary">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-2">Contact</h5>
          <p className="text-gray-600 dark:text-gray-300">Addis Ababa, Ethiopia</p>
          <p className="text-gray-600 dark:text-gray-300">info@example.org</p>
          <div className="flex gap-3 mt-3">
            <span className="w-8 h-8 bg-primary/10 text-primary grid place-items-center rounded-full">f</span>
            <span className="w-8 h-8 bg-primary/10 text-primary grid place-items-center rounded-full">x</span>
            <span className="w-8 h-8 bg-primary/10 text-primary grid place-items-center rounded-full">in</span>
          </div>
        </div>
      </Container>

      <div className="border-t border-border py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} TSD. All rights reserved.
      </div>
    </footer>
  );
}