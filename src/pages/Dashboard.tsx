import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { mockSummaryStats, chartData, mockDistricts, mockAiInsights } from '../lib/mock-data';
import { formatCurrency, formatNumber } from '../lib/utils';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, TrendingUp, Activity, FileText, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Dashboard() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">পাবলিক ড্যাশবোর্ড</h1>
          <p className="text-slate-500 mt-1 text-lg">সরকারি প্রকল্প ও ব্যয়ের সার্বিক চিত্র</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/projects"><Button variant="outline" className="bg-white">প্রকল্পসমূহ</Button></Link>
          <Link to="/corruption-map"><Button variant="outline" className="bg-white">দুর্নীতি ম্যাপ</Button></Link>
          <Link to="/report"><Button variant="destructive">রিপোর্ট করুন</Button></Link>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="মোট বাজেট (ট্র্যাককৃত)" 
          value={formatCurrency(mockSummaryStats.totalBudget)} 
          description="চলমান সকল প্রকল্পের মোট বরাদ্দ"
          icon={<FileText className="h-6 w-6 text-indigo-500" />}
          delay={0.1}
        />
        <StatCard 
          title="মোট ব্যয়" 
          value={formatCurrency(mockSummaryStats.totalSpent)} 
          description={`${((mockSummaryStats.totalSpent / mockSummaryStats.totalBudget) * 100).toFixed(1)}% ব্যয় সম্পন্ন হয়েছে`}
          icon={<Activity className="h-6 w-6 text-teal-500" />}
          delay={0.2}
        />
        <StatCard 
          title="চলমান প্রকল্প" 
          value={formatNumber(mockSummaryStats.activeProjects)} 
          description={`${mockSummaryStats.delayedProjects} টি প্রকল্প বিলম্বিত`}
          icon={<TrendingUp className="h-6 w-6 text-blue-500" />}
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                <CardTitle>খাতভিত্তিক বাজেট ও ব্যয়</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData.budgetVsSpending} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.3}/>
                        </linearGradient>
                        <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#0d9488" stopOpacity={0.3}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontWeight: 500 }} />
                      <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `${val}k`} tick={{ fill: '#64748b' }} />
                      <Tooltip 
                        cursor={{fill: '#f8fafc'}} 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="budget" name="বাজেট" fill="url(#colorBudget)" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="spent" name="ব্যয়" fill="url(#colorSpent)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card>
                <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                  <CardTitle>নাগরিক অভিযোগের প্রবণতা</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData.reportTrends} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <defs>
                          <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Line type="monotone" dataKey="reports" name="অভিযোগ" stroke="#ef4444" strokeWidth={3} dot={{r: 4, fill: '#ef4444', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Card>
                <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                  <CardTitle>প্রকল্পের বর্তমান অবস্থা</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 flex justify-center">
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData.projectStatus}
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={85}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {chartData.projectStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Side Panels */}
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-red-200 bg-gradient-to-b from-red-50/50 to-white overflow-hidden">
              <div className="h-1 w-full bg-red-500" />
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <CardTitle className="text-red-900">ঝুঁকিপূর্ণ জেলাসমূহ</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockDistricts.filter(d => d.riskLevel === 'High').map(district => (
                    <div key={district.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
                      <div>
                        <p className="font-bold text-slate-900">{district.name}</p>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">{district.suspiciousProjects} টি সন্দেহজনক প্রকল্প</p>
                      </div>
                      <Badge variant="destructive" className="px-2 py-1 shadow-sm">{district.riskScore}/100</Badge>
                    </div>
                  ))}
                </div>
                <Link to="/corruption-map" className="block mt-5">
                  <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                    ম্যাপে বিস্তারিত দেখুন <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Card className="border-amber-200 bg-gradient-to-b from-amber-50/50 to-white overflow-hidden">
              <div className="h-1 w-full bg-amber-500" />
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <CardTitle className="text-amber-900">সাম্প্রতিক এআই অ্যালার্ট</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAiInsights.slice(0, 3).map(insight => (
                    <div key={insight.id} className="space-y-2 pb-4 border-b border-amber-100 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-sm text-slate-900">{insight.title}</p>
                        <Badge variant={insight.severity === 'High' ? 'destructive' : 'warning'} className="text-[10px] px-1.5 py-0 shadow-sm">
                          {insight.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{insight.explanation}</p>
                    </div>
                  ))}
                </div>
                <Link to="/ai-insights" className="block mt-5">
                  <Button variant="outline" className="w-full text-amber-700 border-amber-200 hover:bg-amber-50 hover:text-amber-800">
                    সকল ইনসাইটস দেখুন <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, description, icon, delay }: { title: string, value: string, description: string, icon: React.ReactNode, delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <Card className="overflow-hidden group">
        <CardContent className="p-6 relative">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
          <div className="flex items-center justify-between space-y-0 pb-4 relative z-10">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{title}</p>
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
              {icon}
            </div>
          </div>
          <div className="relative z-10">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</div>
            <p className="text-sm font-medium text-slate-500 mt-2">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
