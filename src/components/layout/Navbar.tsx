import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'হোম', path: '/' },
  { name: 'ড্যাশবোর্ড', path: '/dashboard' },
  { name: 'প্রকল্পসমূহ', path: '/projects' },
  { name: 'দুর্নীতি ম্যাপ', path: '/corruption-map' },
  { name: 'চুক্তিপত্র', path: '/contracts' },
  { name: 'এআই ইনসাইটস', path: '/ai-insights' },
  { name: 'আমাদের সম্পর্কে', path: '/about' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-teal-600" />
              <span className="text-xl font-bold tracking-tight text-slate-900">OGACN</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-slate-900",
                    location.pathname === link.path ? "bg-slate-100 text-teal-700" : "text-slate-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:block">
            <Link to="/report">
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                অভিযোগ জমা দিন
              </Button>
            </Link>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
          >
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 bg-white">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2 text-base font-medium",
                    location.pathname === link.path ? "bg-slate-100 text-teal-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 px-3">
                <Link to="/report" onClick={() => setIsOpen(false)}>
                  <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700">
                    অভিযোগ জমা দিন
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
