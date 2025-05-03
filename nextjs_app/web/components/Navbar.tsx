"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function NewNavbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const isAuthPage = pathname.startsWith("/auth");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as HTMLElement).closest("nav")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutsideDropdown = (event: MouseEvent) => {
      if (isDropdownOpen && dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => document.removeEventListener("mousedown", handleClickOutsideDropdown);
  }, [isDropdownOpen]);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-2" : "bg-white shadow-sm py-3"}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-[#C7A962]">
            Morocco Legal Assistant
          </Link>

          {!isAuthPage && (
            <>
              <div className="hidden md:flex items-center space-x-6">
                {!session && (
                  <>
                    <Link 
                      href="/" 
                      className={`${pathname === "/" ? "text-[#C7A962] font-medium" : "text-gray-700 hover:text-[#C7A962]"} transition-colors`}
                    >
                      Home
                    </Link>

                    {pathname === "/" ? (
                      <a
                        href="#features"
                        className="text-gray-700 hover:text-[#C7A962] transition-colors cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        About
                      </a>
                    ) : (
                      <Link href="/#features" className="text-gray-700 hover:text-[#C7A962] transition-colors">
                        About
                      </Link>
                    )}
                  </>
                )}

                {session && (
                  <>
                    <Link 
                      href="/dashboard" 
                      className={`${pathname === "/dashboard" ? "text-[#C7A962] font-medium" : "text-gray-700 hover:text-[#C7A962]"} transition-colors`}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/chat/new" 
                      className={`${pathname.startsWith("/chat") ? "text-[#C7A962] font-medium" : "text-gray-700 hover:text-[#C7A962]"} transition-colors`}
                    >
                      AI Consultant
                    </Link>
                  </>
                )}

                <div className="ml-6 relative" ref={dropdownRef}>
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-[#C7A962] border-t-transparent rounded-full animate-spin"></div>
                  ) : session ? (
                    <>
                      <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center px-3 py-1.5 rounded-md text-gray-700 hover:text-[#C7A962] hover:bg-[#FAF7EC] transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#F5EFD9] flex items-center justify-center text-[#C7A962] font-semibold mr-1.5">
                          {session.user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="mx-1">{session.user?.name?.split(" ")[0]}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                          <Link 
                            href="/profile" 
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#FAF7EC] hover:text-[#C7A962]"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Your Profile
                          </Link>
                          <button
                            onClick={() => {
                              setIsDropdownOpen(false);
                              signOut({ callbackUrl: "/" });
                            }}
                            className="flex w-full items-center text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#FAF7EC] hover:text-[#C7A962]"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign out
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href="/auth/login" className="text-gray-700 hover:text-[#C7A962] transition-colors">
                      Sign in
                    </Link>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
