import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Progress } from '../components/ui/Progress';
import { mockProjects, mockContracts, mockAiInsights } from '../lib/mock-data';
import { formatCurrency } from '../lib/utils';
import { AlertTriangle, MapPin, Building, Calendar, FileText, Activity, ArrowLeft, Users } from 'lucide-react';
import { motion } from 'motion/react';

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const project = mockProjects.find(p => p.id === id) || mockProjects[0];
  const contract = mockContracts.find(c => c.projectId === project.id);
  const insights = mockAiInsights.filter(ai => ai.relatedProjectId === project.id);

  const isHighlySuspicious = project.spent > project.budget * 0.7 && project.progress < 50;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50/50 min-h-screen">
      <Link to="/projects" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 mb-6 transition-colors bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm hover:shadow-md">
        <ArrowLeft className="h-4 w-4 mr-2" /> প্রকল্প তালিকায় ফিরে যান
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="px-3 py-1 text-sm">{project.sector}</Badge>
              <StatusBadge status={project.status} />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">{project.name}</h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">{project.description}</p>
          </motion.div>

          {isHighlySuspicious && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
                <div className="bg-red-100 p-2 rounded-full shrink-0">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-red-900 mb-1">সতর্কতা: অস্বাভাবিক ব্যয় ও ধীরগতি</h3>
                  <p className="text-red-800 font-medium leading-relaxed">
                    এই প্রকল্পে বাজেটের <span className="font-bold">{Math.round((project.spent / project.budget) * 100)}%</span> ব্যয় সম্পন্ন হয়েছে, কিন্তু কাজের অগ্রগতি মাত্র <span className="font-bold">{project.progress}%</span>। এটি একটি গুরুতর অসঙ্গতি নির্দেশ করে।
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <InfoCard icon={<MapPin className="h-5 w-5" />} label="জেলা" value={project.district} />
            <InfoCard icon={<Building className="h-5 w-5" />} label="বিভাগ" value={project.department} />
            <InfoCard icon={<Calendar className="h-5 w-5" />} label="সময়সীমা" value={project.deadline} />
            <InfoCard icon={<Activity className="h-5 w-5" />} label="ঝুঁকি স্কোর" value={`${project.riskScore}/100`} valueClass={project.riskScore > 70 ? 'text-red-600' : ''} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="shadow-md border-slate-200">
              <CardHeader className="bg-slate-50/80 border-b border-slate-100 pb-4">
                <CardTitle className="text-xl font-extrabold">আর্থিক ও কাজের অগ্রগতি</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 pt-6">
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-slate-600 font-bold uppercase tracking-wider">বাজেট ব্যয় ({Math.round((project.spent / project.budget) * 100)}%)</span>
                    <span className="font-extrabold text-slate-900">{formatCurrency(project.spent)} <span className="text-slate-400 font-medium">/ {formatCurrency(project.budget)}</span></span>
                  </div>
                  <Progress value={(project.spent / project.budget) * 100} indicatorColor="bg-amber-500" className="h-4" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-slate-600 font-bold uppercase tracking-wider">কাজের অগ্রগতি ({project.progress}%)</span>
                    <span className="font-extrabold text-slate-900">{project.progress}% সম্পন্ন</span>
                  </div>
                  <Progress value={project.progress} indicatorColor="bg-teal-500" className="h-4" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {insights.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="border-indigo-200 shadow-md overflow-hidden">
                <div className="h-1.5 w-full bg-indigo-500" />
                <CardHeader className="bg-indigo-50/50 border-b border-indigo-100 pb-4">
                  <CardTitle className="text-indigo-900 flex items-center gap-2 text-xl font-extrabold">
                    <Activity className="h-6 w-6" /> এআই ইনসাইটস
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-indigo-50">
                    {insights.map(insight => (
                      <div key={insight.id} className="p-6 bg-white hover:bg-slate-50 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-extrabold text-lg text-slate-900">{insight.title}</h4>
                          <Badge variant={insight.severity === 'High' ? 'destructive' : 'warning'} className="shadow-sm">
                            {insight.confidence}% নিশ্চিত
                          </Badge>
                        </div>
                        <p className="text-slate-600 font-medium leading-relaxed">{insight.explanation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="shadow-md border-slate-200">
              <CardContent className="p-6">
                <h3 className="font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal-600" /> নাগরিক সম্পৃক্ততা
                </h3>
                <div className="text-center p-6 bg-slate-50 rounded-xl mb-6 border border-slate-100">
                  <p className="text-4xl font-extrabold text-slate-900 mb-1">{project.complaints}</p>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">মোট অভিযোগ</p>
                </div>
                <Link to="/report">
                  <Button variant="destructive" className="w-full h-12 text-base shadow-md">এই প্রকল্পের বিরুদ্ধে অভিযোগ দিন</Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {contract && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="shadow-md border-slate-200">
                <CardHeader className="bg-slate-50/80 border-b border-slate-100 pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-extrabold">
                    <FileText className="h-5 w-5 text-blue-600" /> চুক্তিপত্রের তথ্য
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 pt-6">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">ঠিকাদার</p>
                    <p className="font-extrabold text-slate-900">{contract.contractor}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">চুক্তিমূল্য</p>
                    <p className="font-extrabold text-slate-900">{formatCurrency(contract.contractAmount)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">স্বচ্ছতা স্কোর</p>
                    <div className="flex items-center gap-3">
                      <Progress value={contract.transparencyScore} className="flex-1 h-3" />
                      <span className="text-sm font-extrabold text-slate-900 bg-slate-100 px-2 py-1 rounded-md">{contract.transparencyScore}/100</span>
                    </div>
                  </div>
                  {contract.flags.length > 0 && (
                    <div className="pt-3 border-t border-slate-100">
                      <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">ঝুঁকির সংকেত</p>
                      <div className="flex flex-wrap gap-2">
                        {contract.flags.map((flag, i) => (
                          <Badge key={i} variant="outline" className="text-[11px] bg-red-50 text-red-700 border-red-200 px-2 py-1">
                            <AlertTriangle className="w-3 h-3 mr-1 inline" /> {flag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <Link to="/contracts" className="block pt-4">
                    <Button variant="outline" className="w-full h-11 font-bold shadow-sm">সকল চুক্তি দেখুন</Button>
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

function InfoCard({ icon, label, value, valueClass = "" }: { icon: React.ReactNode, label: string, value: string, valueClass?: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 text-slate-500 mb-3">
        <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
          {icon}
        </div>
        <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
      </div>
      <p className={`font-extrabold text-lg text-slate-900 truncate ${valueClass}`}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'On Track': return <Badge variant="success" className="px-3 py-1 shadow-sm">অন ট্র্যাক</Badge>;
    case 'Delayed': return <Badge variant="warning" className="px-3 py-1 shadow-sm">বিলম্বিত</Badge>;
    case 'At Risk': return <Badge variant="destructive" className="px-3 py-1 shadow-sm">ঝুঁকিপূর্ণ</Badge>;
    case 'Completed': return <Badge variant="default" className="px-3 py-1 bg-blue-100 text-blue-800 border-blue-200 shadow-sm">সম্পন্ন</Badge>;
    default: return <Badge>{status}</Badge>;
  }
}
