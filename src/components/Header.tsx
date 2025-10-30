"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, BookOpen, Users, FileText, Info } from "lucide-react";
import { Button } from "@/src/components/ui/button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Events", href: "/events" },
  { 
    name: "Resources", 
    items: [
      { name: "Devotions", href: "/devotions", icon: BookOpen },
      { name: "Audio Messages", href: "/audio-messages", icon: FileText },
      { name: "Book Reviews", href: "/book-reviews", icon: BookOpen },
    ]
  },
  { 
    name: "Community", 
    items: [
      { name: "Groups", href: "/groups", icon: Users },
      { name: "Departments", href: "/departments", icon: Users },
      { name: "Projects", href: "/projects", icon: Users },
      { name: "Weekly Reports", href: "/weekly-reports", icon: FileText },
    ]
  },
  { 
    name: "About", 
    items: [
      { name: "About Us", href: "/about", icon: Info },
      { name: "Leadership", href: "/leadership", icon: Users },
    ]
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center" data-aos="fade-right">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Growth Group
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item, index) => {
              if (item.href) {
                // Regular link
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                    data-aos="fade-down"
                    data-aos-delay={index * 50}
                  >
                    {item.name}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                  </Link>
                );
              } else {
                // Dropdown
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                      data-aos="fade-down"
                      data-aos-delay={index * 50}
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    
                    {openDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                          >
                            <subItem.icon className="h-4 w-4" />
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden" data-aos="fade-left">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden" data-aos="fade-down">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigation.map((item, index) => {
                if (item.href) {
                  // Regular link
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                      data-aos="fade-right"
                      data-aos-delay={index * 50}
                    >
                      {item.name}
                    </Link>
                  );
                } else {
                  // Dropdown section
                  return (
                    <div key={item.name} className="space-y-1">
                      <div className="px-3 py-2 text-base font-semibold text-gray-900 border-b border-gray-200">
                        {item.name}
                      </div>
                      {item.items?.map((subItem, subIndex) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="flex items-center gap-3 text-gray-600 hover:text-blue-600 px-6 py-2 text-sm transition-colors duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                          data-aos="fade-right"
                          data-aos-delay={(index * 50) + (subIndex * 25)}
                        >
                          <subItem.icon className="h-4 w-4" />
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  );
                }
              })}
              <div className="pt-4">
                <Button asChild className="w-full">
                  <Link href="/join" onClick={() => setMobileMenuOpen(false)}>
                    Join a Group
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
