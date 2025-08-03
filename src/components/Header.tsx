'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';

// Define types for our navigation items
type SubItem = {
  name: string;
  href: string;
};

type NavigationItem = {
  name: string;
  href: string;
  dropdown: boolean;
  items?: SubItem[];
};

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScrollEffect = () => {
      setScrolled(window.scrollY > 10);
      
      if (activeDropdown) {
        setActiveDropdown(null);
      }
      if (menuOpen && window.scrollY > 50) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScrollEffect);
    return () => window.removeEventListener('scroll', handleScrollEffect);
  }, [activeDropdown, menuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (activeDropdown && dropdownRefs.current[activeDropdown] && 
          !dropdownRefs.current[activeDropdown]?.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const navigation: NavigationItem[] = [
    { name: 'HOME', href: '/', dropdown: false },
    { name: 'SEARCH', href: '/search', dropdown: false },
    { 
      name: 'MEDIA', 
      href: '#', 
      dropdown: true,
      items: [
        { name: 'NFT', href: '/nft' },
        { name: 'MINT', href: '/mint' },
        { name: 'DOCU', href: '/docu' },
        { name: 'PUNKS', href: '/pfp' },
        { name: 'GALLERY', href: '/gallery' },
        { name: 'COLLECT', href: '/collections' },
        { name: 'ONCHAIN', href: '/onchain' },
      ]
    },
    { 
      name: 'TOOLS', 
      href: '#', 
      dropdown: true,
      items: [
        { name: 'ALTCOINS', href: '/altcoins' },
        { name: 'MAX PAIN', href: '/maxpain' },
        { name: 'CRYPTO', href: '/crypto' },
        { name: 'STRIFE', href: '/strf' },
        { name: 'STRIKE', href: '/strike' },
        { name: 'LIVING', href: '/col' },
        { name: 'CURSOR', href: '/cursor' },
      ]
    },
    { 
      name: 'PORTFOLIO', 
      href: '#', 
      dropdown: true,
      items: [
        { name: 'BTC', href: '/platforms/msty/bitcoin' },
        { name: 'MSTR', href: '/platforms/msty/mstr' },
        { name: 'TESLA', href: '/tesla' },
        { name: 'STOCKS', href: '/stocks' },
        { name: 'ASSETS', href: '/assets' },
        { name: 'OPTIONS', href: '/options' },
        { name: 'BITBONDS', href: '/bitbonds' },
      ]
    },
    { 
      name: 'LIFESTYLE', 
      href: '#', 
      dropdown: true,
      items: [
        { name: 'POOL', href: '/pool' },
        { name: 'PLAY', href: '/train' },
        { name: 'HOME', href: '/smarthome' },
        { name: 'TAXI', href: '/robotaxi' },
        { name: 'SOLAR', href: '/ecoflow' },
        { name: 'THINK', href: '/naval' },
        { name: 'BUIDL', href: '/time' },
      ]
    },
    { 
      name: 'ABOUT', 
      href: '#', 
      dropdown: true,
      items: [
        { name: 'HOW', href: '/ai' },
        { name: 'WHO', href: '/bio' },
        { name: 'WHY', href: '/about' },
        { name: 'OCP', href: '/fairmint' },
        { name: 'FIRE', href: '/fire' },
        { name: 'ZERO', href: '/zero' },
        { name: 'CHAT', href: '/voice' },
      ]
    },
  ];

  // Check if the current path is within a dropdown group
  const isActiveGroup = (items: SubItem[] | undefined) => {
    if (!items) return false;
    return items.some(item => pathname === item.href);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-black/90 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-yellow-500/20" 
          : "bg-black/70 backdrop-blur-md"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/10 via-transparent to-yellow-900/10 opacity-50"></div>
      <div className="relative">
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[1px]" 
          style={{ 
            background: "linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.2), transparent)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: scrolled ? 1 : 0.3 }}
          transition={{ duration: 0.6 }}
        />
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-center h-16">
            {/* Desktop nav - centered layout */}
            <div className="hidden md:flex items-center justify-between w-full">
              {/* Logo on the left */}
              <Link href="/" className="flex items-center space-x-2 min-w-0 group">
                <div className="relative">
                  <Image
                    src="/IKIGAI_LABS_logo.svg"
                    alt="IKIGAI Labs Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 flex-shrink-0 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="relative overflow-hidden">
                  <motion.span 
                    className="text-yellow-400 font-bold text-xl truncate block"
                    whileHover={{
                      filter: "brightness(1.2)",
                      textShadow: "0 0 8px rgba(234, 179, 8, 0.7)"
                    }}
                  >
                    LIVETHELIFETV
                  </motion.span>
                  <motion.div 
                    className="h-[2px] bg-yellow-500/60 absolute bottom-0 left-0 right-0"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </Link>
              
              {/* Navigation items - centered */}
              <div className="flex items-center space-x-1 lg:space-x-2">
                {navigation.map((item) => (
                <div 
                  key={item.name} 
                  className="relative" 
                  ref={el => { dropdownRefs.current[item.name] = el; }}
                >
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={cn(
                          "relative flex items-center gap-1 py-4 px-2 text-sm lg:text-base font-bold transition-colors overflow-hidden group",
                          (activeDropdown === item.name || isActiveGroup(item.items)) 
                            ? "text-yellow-400" 
                            : "text-white/80 hover:text-white"
                        )}
                      >
                        <span className="relative z-10">{item.name}</span>
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform duration-300 relative z-10", 
                          activeDropdown === item.name ? "rotate-180" : ""
                        )} />
                        
                        {/* Hover effect */}
                        <motion.div 
                          className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100"
                          style={{ 
                            borderRadius: '4px',
                            transition: 'opacity 0.3s ease'
                          }}
                        />
                      </button>
                      
                      {/* Dropdown menu */}
                      <AnimatePresence>
                        {activeDropdown === item.name && item.items && (
                          <motion.div
                            initial={{ opacity: 0, y: -5, scaleY: 0.95 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, y: -5, scaleY: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-1 py-2 bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-xl border border-yellow-500/20 rounded-md shadow-xl min-w-[200px] z-50 overflow-hidden"
                            style={{ transformOrigin: 'top' }}
                          >
                            <motion.div 
                              className="absolute top-0 left-0 right-0 h-[1px]"
                              style={{ background: 'linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.3), transparent)' }}
                            />
                            <motion.div 
                              className="absolute bottom-0 left-0 right-0 h-[1px]"
                              style={{ background: 'linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.1), transparent)' }}
                            />
                            
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={cn(
                                  "flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 relative overflow-hidden group",
                                  pathname === subItem.href 
                                    ? "text-yellow-400 bg-yellow-500/10" 
                                    : "text-white/70 hover:text-white hover:bg-white/5"
                                )}
                                onClick={() => setActiveDropdown(null)}
                              >
                                {pathname === subItem.href && (
                                  <motion.div
                                    layoutId="activeDropdownItem"
                                    className="absolute left-0 w-1 top-0 bottom-0 bg-yellow-500"
                                    transition={{ type: "spring" as const, stiffness: 500, damping: 30 }}
                                  />
                                )}
                                <span className="relative z-10">{subItem.name}</span>
                                
                                {/* Hover gradient */}
                                <motion.div 
                                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                  style={{
                                    background: 'linear-gradient(90deg, rgba(234, 179, 8, 0.05), transparent)',
                                  }}
                                />
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "relative py-4 px-2 text-sm lg:text-base font-bold transition-colors overflow-hidden group",
                        pathname === item.href ? "text-yellow-400" : "text-white/80 hover:text-white"
                      )}
                    >
                      <span className="relative z-10">{item.name}</span>
                      
                      {/* Hover effect */}
                      <motion.div 
                        className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100"
                        style={{ 
                          borderRadius: '4px',
                          transition: 'opacity 0.3s ease'
                        }}
                      />
                      
                      {pathname === item.href && (
                        <motion.div
                          layoutId="activeNavTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500/40 via-yellow-500 to-yellow-500/40"
                          transition={{ type: "spring" as const, stiffness: 500, damping: 30 }}
                        />
                      )}
                    </Link>
                  )}
                </div>
                ))}
              </div>
              
              {/* Search icon on the right */}
              <div className="flex items-center">
                <Link
                  href="/search"
                  className="flex items-center justify-center p-2 rounded-full text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 relative overflow-hidden group"
                  aria-label="Search"
                >
                  <motion.div 
                    className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 rounded-full" 
                    style={{ transition: 'opacity 0.3s ease' }}
                  />
                  <Search className="w-5 h-5 relative z-10" />
                </Link>
              </div>
            </div>
            
            {/* Mobile view with logo and hamburger */}
            <div className="md:hidden flex items-center justify-between w-full">
              <Link href="/" className="flex items-center space-x-2 min-w-0 group">
                <div className="relative">
                  <Image
                    src="/IKIGAI_LABS_logo.svg"
                    alt="IKIGAI Labs Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 flex-shrink-0 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="relative overflow-hidden">
                  <motion.span 
                    className="text-yellow-400 font-bold text-xl truncate block"
                    whileHover={{
                      filter: "brightness(1.2)",
                      textShadow: "0 0 8px rgba(234, 179, 8, 0.7)"
                    }}
                  >
                    LIVETHELIFETV
                  </motion.span>
                  <motion.div 
                    className="h-[2px] bg-yellow-500/60 absolute bottom-0 left-0 right-0"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </Link>
              
              {/* Mobile search and hamburger */}
              <div className="flex items-center space-x-2">
                <Link
                  href="/search"
                  className="flex items-center justify-center p-2 rounded-full text-yellow-400 hover:bg-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 relative overflow-hidden group"
                  aria-label="Search"
                >
                  <motion.div 
                    className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 rounded-full" 
                    style={{ transition: 'opacity 0.3s ease' }}
                  />
                  <Search className="w-5 h-5 relative z-10" />
                </Link>
                
                <button
                className="flex items-center justify-center p-2 rounded-full text-yellow-400 hover:bg-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 relative overflow-hidden group"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((open) => !open)}
              >
                {/* Button hover effect */}
                <motion.div 
                  className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 rounded-full" 
                  style={{ transition: 'opacity 0.3s ease' }}
                />
                
                <motion.svg 
                  animate={menuOpen ? "open" : "closed"}
                  className="w-7 h-7 relative z-10" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                >
                  {menuOpen ? (
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3 }}
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  ) : (
                    <motion.path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M4 6h16M4 12h16M4 18h16" 
                    />
                  )}
                </motion.svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile menu dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-2 bg-black/95 backdrop-blur-xl rounded-md shadow-lg shadow-black/20 border border-yellow-500/20 overflow-hidden"
              >
                <div className="flex flex-col py-2">
                  {/* Search option for mobile */}
                  <Link
                    href="/search"
                    className={cn(
                      "relative flex items-center px-4 py-3 text-base font-bold transition-colors group",
                      pathname === '/search' ? "text-yellow-400 bg-yellow-500/5" : "text-white/70 hover:text-white"
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    <Search className="w-5 h-5 mr-3" />
                    SEARCH
                    {pathname === '/search' && (
                      <motion.div
                        layoutId="activeMobileSearchTab"
                        className="absolute left-0 w-[3px] top-0 bottom-0 bg-yellow-500"
                        transition={{ type: "spring" as const, stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                  
                  {navigation.map((item) => (
                    <div key={item.name} className="relative">
                      {item.dropdown ? (
                        <>
                          <button
                            onClick={() => toggleDropdown(item.name)}
                            className={cn(
                              "flex items-center justify-between w-full px-4 py-3 text-base font-bold transition-colors group",
                              (activeDropdown === item.name || isActiveGroup(item.items)) 
                                ? "text-yellow-400 bg-yellow-500/5" 
                                : "text-white/70 hover:text-white"
                            )}
                          >
                            <span>{item.name}</span>
                            <ChevronRight className={cn(
                              "h-4 w-4 transition-transform duration-300", 
                              activeDropdown === item.name ? "rotate-90" : ""
                            )} />
                            
                            {/* Mobile dropdown item highlight */}
                            <motion.div 
                              className="absolute left-0 top-0 bottom-0 w-[3px] bg-yellow-500/60"
                              initial={{ scaleY: 0 }}
                              animate={{ 
                                scaleY: (activeDropdown === item.name || isActiveGroup(item.items)) ? 1 : 0
                              }}
                              style={{ transformOrigin: 'top' }}
                              transition={{ duration: 0.2 }}
                            />
                          </button>
                          
                          <AnimatePresence>
                            {activeDropdown === item.name && item.items && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="border-l border-yellow-500/30 ml-4 overflow-hidden"
                                style={{ background: 'linear-gradient(to right, rgba(234, 179, 8, 0.03), transparent)' }}
                              >
                                {item.items.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    className={cn(
                                      "flex items-center px-6 py-2 text-sm font-medium transition-colors relative group",
                                      pathname === subItem.href 
                                        ? "text-yellow-400" 
                                        : "text-white/60 hover:text-white"
                                    )}
                                    onClick={() => {
                                      setActiveDropdown(null);
                                      setMenuOpen(false);
                                    }}
                                  >
                                    {pathname === subItem.href && (
                                      <motion.div 
                                        className="absolute left-0 w-1 top-0 bottom-0 bg-yellow-400"
                                        layoutId="mobileSubItem"
                                        transition={{ type: "spring" as const, stiffness: 500, damping: 30 }}
                                      />
                                    )}
                                    {subItem.name}
                                    
                                    {/* Item hover effect */}
                                    <motion.div 
                                      className="absolute right-0 h-full w-0 bg-gradient-to-l from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100"
                                      animate={{ width: pathname === subItem.href ? '100%' : '30%' }}
                                      transition={{ duration: 0.3 }}
                                    />
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "relative flex px-4 py-3 text-base font-bold transition-colors",
                            pathname === item.href ? "text-yellow-400 bg-yellow-500/5" : "text-white/70 hover:text-white"
                          )}
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.name}
                          {pathname === item.href && (
                            <motion.div
                              layoutId="activeMobileNavTab"
                              className="absolute left-0 w-[3px] top-0 bottom-0 bg-yellow-500"
                              transition={{ type: "spring" as const, stiffness: 500, damping: 30 }}
                            />
                          )}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </motion.header>
  );
} 