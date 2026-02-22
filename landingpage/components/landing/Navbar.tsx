"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "/#home", label: "Home" },
    { href: "/#features", label: "Features" },
    { href: "/#about", label: "About" },
    { href: "/#team", label: "Team" },
    { href: "/#testimonial", label: "Testimonial" },
    { href: "/blog", label: "Blog" },
  ]

  const pagesLinks = [
    { href: "/docs", label: "Docs" },
    { href: "/support", label: "Support" },
    { href: "/error", label: "Error 404" },
  ]

  return (
    <header className="fixed left-0 top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto flex w-full flex-wrap lg:flex-nowrap lg:items-center lg:justify-between py-4">
        {/* Logo */}
        <div className="relative shrink-0 pr-4 lg:w-45">
          <Link 
            href="/#home" 
            className="inline-flex items-center gap-2"
          >
            <Image
              alt="logo"
              width={180}
              height={40}
              className="hidden dark:block"
              src="/images/logo/logo-dark.svg"
            />
            <Image
              alt="logo"
              width={180}
              height={40}
              className="dark:hidden"
              src="/images/logo/logo-light.svg"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className={`menu-wrapper fixed left-0 top-0 z-50 h-screen w-full justify-center bg-white p-5 lg:visible lg:static lg:flex lg:h-auto lg:flex-1 lg:justify-center lg:bg-transparent lg:p-0 lg:opacity-100 dark:bg-slate-900 dark:lg:bg-transparent ${isMobileMenuOpen ? 'flex' : 'hidden lg:flex'}`}>
          <div className="self-center">
            <nav>
              <ul className="flex flex-col items-center justify-center space-y-5 text-center lg:flex-row lg:justify-center lg:space-x-6 lg:space-y-0 xl:space-x-10">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-medium text-slate-600 hover:text-blue-500 inline-flex items-center justify-center text-center text-lg dark:text-slate-300 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                
                {/* Pages Dropdown */}
                <li className="group relative">
                  <button 
                    className="font-medium text-slate-600 hover:text-blue-500 inline-flex items-center justify-center text-start text-lg dark:text-slate-300 dark:hover:text-white transition-colors"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                  >
                    More
                    <span className="pl-2">
                      <svg 
                        width="14" 
                        height="8" 
                        viewBox="0 0 14 8" 
                        className={`fill-current transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      >
                        <path d="M6.54564 5.09128L11.6369 0L13.0913 1.45436L6.54564 8L0 1.45436L1.45436 0L6.54564 5.09128Z" />
                      </svg>
                    </span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <ul 
                    className={`lg:absolute lg:top-[200%] lg:left-0 lg:w-52 lg:rounded-lg lg:border lg:border-slate-200 lg:bg-white lg:shadow-lg lg:py-5 lg:px-0 dark:lg:border-slate-700 dark:lg:bg-slate-800 transition-all duration-200 ${isDropdownOpen ? 'block lg:visible lg:opacity-100' : 'hidden lg:invisible lg:opacity-0'} space-y-1 pt-6 lg:pt-5 text-left`}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    {pagesLinks.map((link, index) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`block px-8 py-2.5 font-medium text-lg transition-colors text-left ${
                            index === 0 
                              ? 'text-blue-500 dark:text-blue-400' 
                              : 'text-slate-600 hover:text-blue-500 dark:text-slate-300 dark:hover:text-white'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="absolute right-5 top-1/2 z-50 flex -translate-y-1/2 items-center lg:static lg:translate-y-0 lg:w-45 lg:justify-end shrink-0">

          {/* Theme Toggle */}
          {/*
          <button 
            className="text-slate-600 dark:text-slate-300 flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {/* Moon icon (light mode) */}
            {/* <svg viewBox="0 0 23 23" className="h-5 w-5 stroke-current dark:hidden" fill="none">
              <path d="M9.55078 1.5C5.80078 1.5 1.30078 5.25 1.30078 11.25C1.30078 17.25 5.80078 21.75 11.8008 21.75C17.8008 21.75 21.5508 17.25 21.5508 13.5C13.3008 18.75 4.30078 9.75 9.55078 1.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg> */}
            {/* Sun icon (dark mode) */}
            {/* <svg viewBox="0 0 25 24" className="hidden h-5 w-5 dark:block" fill="currentColor">
              <path d="M12.0508 16.5C10.8573 16.5 9.71271 16.0259 8.8688 15.182C8.02489 14.3381 7.55078 13.1935 7.55078 12C7.55078 10.8065 8.02489 9.66193 8.8688 8.81802C9.71271 7.97411 10.8573 7.5 12.0508 7.5C13.2443 7.5 14.3888 7.97411 15.2328 8.81802C16.0767 9.66193 16.5508 10.8065 16.5508 12C16.5508 13.1935 16.0767 14.3381 15.2328 15.182C14.3888 16.0259 13.2443 16.5 12.0508 16.5ZM12.0508 18C13.6421 18 15.1682 17.3679 16.2934 16.2426C17.4186 15.1174 18.0508 13.5913 18.0508 12C18.0508 10.4087 17.4186 8.88258 16.2934 7.75736C15.1682 6.63214 13.6421 6 12.0508 6C10.4595 6 8.93336 6.63214 7.80814 7.75736C6.68292 8.88258 6.05078 10.4087 6.05078 12C6.05078 13.5913 6.68292 15.1174 7.80814 16.2426C8.93336 17.3679 10.4595 18 12.0508 18ZM12.0508 0C12.2497 0 12.4405 0.0790176 12.5811 0.21967C12.7218 0.360322 12.8008 0.551088 12.8008 0.75V3.75C12.8008 3.94891 12.7218 4.13968 12.5811 4.28033C12.4405 4.42098 12.2497 4.5 12.0508 4.5C11.8519 4.5 11.6611 4.42098 11.5205 4.28033C11.3798 4.13968 11.3008 3.94891 11.3008 3.75V0.75C11.3008 0.551088 11.3798 0.360322 11.5205 0.21967C11.6611 0.0790176 11.8519 0 12.0508 0V0ZM12.0508 19.5C12.2497 19.5 12.4405 19.579 12.5811 19.7197C12.7218 19.8603 12.8008 20.0511 12.8008 20.25V23.25C12.8008 23.4489 12.7218 23.6397 12.5811 23.7803C12.4405 23.921 12.2497 24 12.0508 24C11.8519 24 11.6611 23.921 11.5205 23.7803C11.3798 23.6397 11.3008 23.4489 11.3008 23.25V20.25C11.3008 20.0511 11.3798 19.8603 11.5205 19.7197C11.6611 19.579 11.8519 19.5 12.0508 19.5ZM24.0508 12C24.0508 12.1989 23.9718 12.3897 23.8311 12.5303C23.6905 12.671 23.4997 12.75 23.3008 12.75H20.3008C20.1019 12.75 19.9111 12.671 19.7705 12.5303C19.6298 12.3897 19.5508 12.1989 19.5508 12C19.5508 11.8011 19.6298 11.6103 19.7705 11.4697C19.9111 11.329 20.1019 11.25 20.3008 11.25H23.3008C23.4997 11.25 23.6905 11.329 23.8311 11.4697C23.9718 11.6103 24.0508 11.8011 24.0508 12ZM4.55078 12C4.55078 12.1989 4.47176 12.3897 4.33111 12.5303C4.19046 12.671 3.99969 12.75 3.80078 12.75H0.800781C0.601869 12.75 0.411103 12.671 0.270451 12.5303C0.129799 12.3897 0.0507813 12.1989 0.0507812 12C0.0507813 11.8011 0.129799 11.6103 0.270451 11.4697C0.411103 11.329 0.601869 11.25 0.800781 11.25H3.80078C3.99969 11.25 4.19046 11.329 4.33111 11.4697C4.47176 11.6103 4.55078 11.8011 4.55078 12Z" />
            </svg>
          </button> */}

          <div className="flex items-center space-x-4">
            {/* Sign In Button */}
            <Link 
              href="/admin" 
              className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap rounded-md px-4 py-2 lg:px-6 lg:py-2.5 text-center text-white text-sm lg:text-base font-medium transition-colors"
            >
              Sign In
            </Link>
            
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="text-slate-600 dark:text-slate-300 relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" className="fill-current">
                <path d="M16.5 5.5L5.5 16.5M5.5 5.5L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" className="fill-current">
                <path d="M2.75 3.66666H19.25V5.49999H2.75V3.66666ZM2.75 10.0833H19.25V11.9167H2.75V10.0833ZM2.75 16.5H19.25V18.3333H2.75V16.5Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar