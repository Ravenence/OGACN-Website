import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { mockAiInsights, mockDistricts } from '../lib/mock-data';
import { BrainCircuit, TrendingUp, Activity, Search, MapPin, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function AiInsights() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50/50 min-h-screen">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 rounded-[2rem] p-8 md:p-12 text-white mb-12 relative overflow-hidden shadow-2xl shadow-indigo-900/20"
      >
        {/* Glowing Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10 pointer-events-none">
          <BrainCircuit className="w-80 h-80" />
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-900/50 border border-indigo-500/30 text-indigo-300 text-sm font-bold mb-8 backdrop-blur-md shadow-inner">
            <Activity className="w-4 h-4 animate-pulse" /> এআই-চালিত বিশ্লেষণ (সিমুলেটেড)
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            ডেটা থেকে <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">দুর্নীতির পূর্বাভাস</span>
          </h1>
          <p className="text-indigo-100/80 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl font-medium">
            আমাদের সিস্টেম হাজার হাজার সরকারি ডেটা পয়েন্ট বিশ্লেষণ করে অস্বাভাবিক ব্যয়, ধীরগতি এবং দুর্নীতির সম্ভাব্য হটস্পটগুলো স্বয়ংক্রিয়ভাবে চিহ্নিত করে।
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-300 bg-indigo-950/50 px-3 py-2 rounded-lg border border-indigo-800/50">
            <ShieldAlert className="w-4 h-4" />
            * এটি একটি ডেমো পেজ। এখানে প্রদর্শিত ইনসাইটগুলো মক ডেটা ভিত্তিক।
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Insights List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900">সর্বশেষ এআই অ্যালার্ট</h2>
            <Badge variant="outline" className="bg-white">৩ টি নতুন অ্যালার্ট</Badge>
          </div>
          
          {mockAiInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 group">
                <div className={`h-1.5 w-full ${insight.severity === 'High' ? 'bg-gradient-to-r from-red-500 to-rose-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`} />
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Badge variant={insight.severity === 'High' ? 'destructive' : 'warning'} className="px-3 py-1 shadow-sm">
                          {insight.severity} Risk
                        </Badge>
                        <span className="text-sm font-bold text-slate-500 flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md">
                          <MapPin className="w-3.5 h-3.5" /> {insight.district}
                        </span>
                      </div>
                      <h3 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors">{insight.title}</h3>
                      <p className="text-slate-600 mb-6 leading-relaxed text-lg">{insight.explanation}</p>
                      
                      {insight.relatedProjectId && (
                        <Link to={`/projects/${insight.relatedProjectId}`}>
                          <Button variant="outline" className="text-indigo-700 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 shadow-sm">
                            <Search className="w-4 h-4 mr-2" /> সংশ্লিষ্ট প্রকল্প দেখুন
                          </Button>
                        </Link>
                      )}
                    </div>
                    
                    <div className="md:w-56 shrink-0 bg-slate-50/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-slate-100 shadow-inner">
                      <div className="relative w-24 h-24 flex items-center justify-center mb-4">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-slate-200"
                            strokeWidth="3"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <motion.path
                            initial={{ strokeDasharray: "0, 100" }}
                            animate={{ strokeDasharray: `${insight.confidence}, 100` }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                            className={insight.severity === 'High' ? 'text-red-500' : 'text-amber-500'}
                            strokeWidth="3"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-2xl font-extrabold text-slate-900">{insight.confidence}%</span>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">এআই কনফিডেন্স</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card className="shadow-lg border-slate-200">
              <CardHeader className="bg-slate-50/80 border-b border-slate-100 pb-4">
                <CardTitle className="flex items-center gap-2 text-xl font-extrabold">
                  <TrendingUp className="w-5 h-5 text-indigo-600" /> শীর্ষ হটস্পট জেলা
                </CardTitle>
                <CardDescription className="font-medium">অ্যালগরিদম দ্বারা চিহ্নিত ঝুঁকিপূর্ণ এলাকা</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {mockDistricts.filter(d => d.riskLevel === 'High').map((district, i) => (
                    <div key={district.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-extrabold text-lg shadow-inner">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-900 text-lg">{district.name}</p>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">{district.suspiciousProjects} টি সন্দেহজনক প্রকল্প</p>
                      </div>
                      <div className="text-right bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
                        <p className="font-extrabold text-red-600 text-lg">{district.riskScore}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">স্কোর</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/corruption-map" className="block mt-6">
                  <Button variant="outline" className="w-full h-12 font-bold shadow-sm">ম্যাপে বিস্তারিত দেখুন</Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-slate-900 text-slate-100 border-transparent shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[50px]" />
              <CardContent className="p-8 relative z-10">
                <h3 className="text-xl font-extrabold text-white mb-6 flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-indigo-400" /> কীভাবে এই ইনসাইট তৈরি হয়?
                </h3>
                <ul className="space-y-4 text-sm font-medium text-slate-300">
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(129,140,248,0.8)]" /> 
                    <span className="leading-relaxed">বাজেট ও ব্যয়ের অসামঞ্জস্যতা বিশ্লেষণ</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(129,140,248,0.8)]" /> 
                    <span className="leading-relaxed">কাজের ধীরগতি ও সময়সীমা অতিক্রম</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(129,140,248,0.8)]" /> 
                    <span className="leading-relaxed">নাগরিক অভিযোগের পরিমাণ ও ধরন</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(129,140,248,0.8)]" /> 
                    <span className="leading-relaxed">ঠিকাদারদের অতীত রেকর্ড ও টেন্ডার ডেটা</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
