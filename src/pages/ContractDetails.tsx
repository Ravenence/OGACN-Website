import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Progress } from '../components/ui/Progress';
import { mockContracts, mockProjects } from '../lib/mock-data';
import { formatCurrency } from '../lib/utils';
import { ArrowLeft, FileText, AlertTriangle, ShieldCheck, Building, Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export function ContractDetails() {
  const { id } = useParams<{ id: string }>();
  const contract = mockContracts.find(c => c.id === id) || mockContracts[0];
  const project = mockProjects.find(p => p.id === contract.projectId);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50/50 min-h-screen">
      <Link to="/contracts" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 mb-6 transition-colors bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm hover:shadow-md">
        <ArrowLeft className="h-4 w-4 mr-2" /> চুক্তিপত্র তালিকায় ফিরে যান
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="px-3 py-1 text-sm font-mono bg-slate-100">ID: {contract.id}</Badge>
              <Badge variant={contract.status === 'Active' ? 'success' : 'default'} className="px-3 py-1 text-sm shadow-sm">
                {contract.status === 'Active' ? 'সক্রিয়' : contract.status}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" /> চুক্তিপত্রের বিস্তারিত
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              ঠিকাদার ও সরকারি কাজের চুক্তির স্বচ্ছতা এবং আর্থিক বিবরণী।
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="shadow-sm border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-50 p-2 rounded-lg"><Building className="h-5 w-5 text-blue-600" /></div>
                  <h3 className="font-bold text-slate-500 uppercase tracking-wider text-sm">ঠিকাদার প্রতিষ্ঠান</h3>
                </div>
                <p className="text-2xl font-extrabold text-slate-900">{contract.contractor}</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-50 p-2 rounded-lg"><FileText className="h-5 w-5 text-emerald-600" /></div>
                  <h3 className="font-bold text-slate-500 uppercase tracking-wider text-sm">চুক্তিমূল্য</h3>
                </div>
                <p className="text-2xl font-extrabold text-slate-900">{formatCurrency(contract.contractAmount)}</p>
              </CardContent>
            </Card>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="shadow-md border-slate-200">
              <CardHeader className="bg-slate-50/80 border-b border-slate-100 pb-4">
                <CardTitle className="text-xl font-extrabold">স্বচ্ছতা ও ঝুঁকি বিশ্লেষণ</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">স্বচ্ছতা স্কোর</p>
                      <p className="text-3xl font-extrabold text-slate-900">{contract.transparencyScore}<span className="text-lg text-slate-400">/100</span></p>
                    </div>
                    <Badge variant={contract.transparencyScore > 70 ? 'success' : contract.transparencyScore > 40 ? 'warning' : 'destructive'} className="px-3 py-1 text-sm shadow-sm">
                      {contract.transparencyScore > 70 ? 'উচ্চ স্বচ্ছতা' : contract.transparencyScore > 40 ? 'মাঝারি স্বচ্ছতা' : 'নিম্ন স্বচ্ছতা'}
                    </Badge>
                  </div>
                  <Progress 
                    value={contract.transparencyScore} 
                    indicatorColor={contract.transparencyScore > 70 ? 'bg-emerald-500' : contract.transparencyScore > 40 ? 'bg-amber-500' : 'bg-red-500'} 
                    className="h-3" 
                  />
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-4">ঝুঁকির সংকেত (Flags)</h4>
                  {contract.flags.length > 0 ? (
                    <div className="space-y-3">
                      {contract.flags.map((flag, i) => (
                        <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-100 p-4 rounded-xl">
                          <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                          <p className="text-red-900 font-medium">{flag}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                      <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                      <p className="text-emerald-900 font-medium">এই চুক্তিতে কোনো উল্লেখযোগ্য ঝুঁকির সংকেত পাওয়া যায়নি।</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="lg:w-80 space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card className="shadow-md border-slate-200">
              <CardHeader className="bg-slate-50/80 border-b border-slate-100 pb-4">
                <CardTitle className="text-lg font-extrabold">সময়সীমা</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">শুরুর তারিখ</p>
                    <p className="font-bold text-slate-900">{contract.startDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">শেষের তারিখ</p>
                    <p className="font-bold text-slate-900">{contract.endDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {project && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="shadow-md border-slate-200 bg-gradient-to-b from-teal-50/50 to-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-extrabold text-teal-900">সংশ্লিষ্ট প্রকল্প</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <h4 className="font-bold text-slate-900 mb-2 line-clamp-2">{project.name}</h4>
                  <p className="text-sm text-slate-600 mb-4">{project.district} • {project.sector}</p>
                  <Link to={`/projects/${project.id}`}>
                    <Button className="w-full shadow-sm" variant="default">
                      প্রকল্প বিস্তারিত <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
