import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-[#00e5ff30] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="protocol-title text-xl">SAMBHA</span>
            </Link>
            <p className="text-[#00e5ffb3] text-sm">
              SAMBHA is a cutting-edge AI protocol designed to enhance software development workflows by providing advanced code translation, documentation generation, code review, and PR template creation capabilities. Built for developers, by developers.
            </p>
          </div>

          <div>
            <h3 className="text-[#00e5ff] font-bold mb-4">NAVIGATION</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/translation" className="nav-link">
                  &gt; TRANSLATION
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="nav-link">
                  &gt; DOCUMENTATION
                </Link>
              </li>
              <li>
                <Link href="/code-review" className="nav-link">
                  &gt; CODE REVIEW
                </Link>
              </li>
              <li>
                <Link href="/pr-template" className="nav-link">
                  &gt; PR TEMPLATE
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#00e5ff] font-bold mb-4">COMMUNITY</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://supernovabusiness.in/about" target="_blank" className="nav-link">
                  &gt; ABOUT
                </Link>
              </li>
              <li>
                <Link href="https://linkedin.com/in/mainak-chaudhuri-127898176/" target="_blank" className="nav-link">
                  &gt; LINKEDIN
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/the_supernova_business/" target="_blank" className="nav-link">
                  &gt; INSTAGRAM
                </Link>
              </li>
              <li>
                <Link href="https://supernovabusiness.in/contacts" target="_blank" className="nav-link">
                  &gt; CONTACT
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#00e5ff] font-bold mb-4">SUPPORT</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="nav-link">
                  &gt; FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="nav-link">
                  &gt; CONSULTANCY
                </Link>
              </li>
              <li>
                <Link href="#" className="nav-link">
                  &gt; BUG REPORTS
                </Link>
              </li>
              <li>
                <Link href="#" className="nav-link">
                  &gt; PRIVACY POLICY
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#00e5ff30] mt-12 pt-8 text-center text-sm text-[#00e5ff80]">
          <p>&copy; 2025 SAMBHA. ALL RIGHTS RESERVED.</p>
          <p className="mt-2 text-xs">CREATED BY: SUPERNOVA</p>
        </div>
      </div>
    </footer>
  )
}
