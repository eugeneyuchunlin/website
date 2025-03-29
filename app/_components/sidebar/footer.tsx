'use client'

function FooterLogo({src, alt}: {src: string; alt: string}) {
    return (
        <li>
            <a>
                <img src={src} alt={alt} className="h-5 w-5" />
            </a>
        </li> 
    ) 
}

export default function Footer() {
    return (
        <footer className="mt-4 p-4">
            <ul className="menu menu-horizontal rounded-box">
              <FooterLogo src="/github-mark.svg" alt="GitHub" />
              <FooterLogo src="/linkedin.svg" alt="LinkedIn" />
            </ul>
          </footer>
    )
}