import { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { mockContracts, mockProjects } from '../lib/mock-data';
import { formatCurrency } from '../lib/utils';
import { Search, AlertTriangle, ExternalLink, ShieldCheck, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function Contracts() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContracts = mockContracts.filter(contract => 
    contract.contractor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50/50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">চুক্তিপত্র ও ঠিকাদার</h1>
        <p className="text-slate-500 mt-1 text-lg">সরকারি কাজের ঠিকাদারদের তালিকা এবং চুক্তির স্বচ্ছতা</p>
      </div>

      <Card className="mb-8 shadow-md border-slate-200">
        <CardContent className="p-6 bg-white">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="ঠিকাদারের নাম বা চুক্তি আইডি দিয়ে খুঁজুন..." 
              className="pl-10 h-12 text-base shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200 font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">চুক্তি আইডি</th>
                <th className="px-6 py-4">ঠিকাদার</th>
                <th className="px-6 py-4">সংশ্লিষ্ট প্রকল্প</th>
                <th className="px-6 py-4">চুক্তিমূল্য</th>
                <th className="px-6 py-4">স্বচ্ছতা স্কোর</th>
                <th className="px-6 py-4">ঝুঁকির সংকেত</th>
                <th className="px-6 py-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContracts.map((contract, index) => {
                const project = mockProjects.find(p => p.id === contract.projectId);
                return (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={contract.id} 
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4 font-mono text-slate-500 font-medium">{contract.id}</td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">{contract.contractor}</td>
                    <td className="px-6 py-4">
                      {project ? (
                        <Link to={`/projects/${project.id}`} className="text-teal-600 hover:text-teal-700 font-bold hover:underline line-clamp-1">
                          {project.name}
                        </Link>
                      ) : (
                        <span className="text-slate-400">অজানা প্রকল্প</span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">{formatCurrency(contract.contractAmount)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${contract.transparencyScore > 70 ? 'bg-emerald-500' : contract.transparencyScore > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${contract.transparencyScore}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-700">{contract.transparencyScore}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {contract.flags.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {contract.flags.map((flag, i) => (
                            <Badge key={i} variant="outline" className="text-[10px] bg-red-50 text-red-700 border-red-200 px-1.5 py-0.5 whitespace-nowrap">
                              <AlertTriangle className="w-3 h-3 mr-1 inline" /> {flag}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200 px-1.5 py-0.5">
                          <ShieldCheck className="w-3 h-3 mr-1 inline" /> কোনো ঝুঁকি নেই
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {project && (
                        <Link to={`/projects/${project.id}`} className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-teal-100 hover:text-teal-700 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredContracts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-slate-500 font-medium text-lg">কোনো চুক্তিপত্র পাওয়া যায়নি</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
