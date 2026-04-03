import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-teal-500" />
              <span className="text-2xl font-bold tracking-tight text-white">OGACN</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-md">
              Open Governance & Anti-Corruption Network. জনগণের জন্য স্বচ্ছতা, জবাবদিহিতা ও তথ্যভিত্তিক নজরদারি নিশ্চিত করার একটি উন্মুক্ত প্ল্যাটফর্ম।
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">গুরুত্বপূর্ণ লিংক</h3>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-sm hover:text-teal-400 transition-colors">ড্যাশবোর্ড</Link></li>
              <li><Link to="/projects" className="text-sm hover:text-teal-400 transition-colors">প্রকল্পসমূহ</Link></li>
              <li><Link to="/corruption-map" className="text-sm hover:text-teal-400 transition-colors">দুর্নীতি ম্যাপ</Link></li>
              <li><Link to="/contracts" className="text-sm hover:text-teal-400 transition-colors">চুক্তিপত্র</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">যোগাযোগ ও রিপোর্ট</h3>
            <ul className="space-y-2">
              <li><Link to="/report" className="text-sm text-red-400 hover:text-red-300 transition-colors font-medium">অভিযোগ জমা দিন</Link></li>
              <li><Link to="/ai-insights" className="text-sm hover:text-teal-400 transition-colors">এআই ইনসাইটস</Link></li>
              <li><Link to="/about" className="text-sm hover:text-teal-400 transition-colors">আমাদের সম্পর্কে</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} OGACN Prototype. This is a demo application.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <span className="text-xs text-slate-500">Privacy Policy</span>
            <span className="text-xs text-slate-500">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
