'use client'

import { LogoGithub, LogoLinkedin, Email } from "@carbon/icons-react";

function Link({link, children}: {link: string, children?: React.ReactNode}) {
    return (
        <li>
            <a href={link} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        </li> 
    ) 
}

export default function Footer() {
    return (
        <footer className="mt-4 p-4">
            <ul className="menu menu-horizontal rounded-box">
            
              {/* <Link src="/github-mark.svg" alt="GitHub" link="https://github.com/eugeneyuchunlin"/> */}
              <Link link="https://github.com/eugeneyuchunlin">
                    <LogoGithub size="32" />
              </Link>
              <Link link="https://www.linkedin.com/in/eugene-yuchun-lin/">
                    <LogoLinkedin size="32" />
              </Link>
              
              <Link link="mailto:lin.eugene.l.e@gmail.com">
                    <Email size="32" />
              </Link>
            </ul>
          </footer>
    )
}