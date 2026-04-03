import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { mockDistricts, mockProjects, mockReports } from '../lib/mock-data';
import { MapPin, AlertTriangle, TrendingUp, TrendingDown, Minus, ArrowLeft, FolderSearch, FileText } from 'lucide-react';
import { motion } from 'motion/react';

export function DistrictDetails() {
  const { id } = useParams<{ id: string }>();
  const district = mockDistricts.find(d => d.id === id) || mockDistricts[0];
  const districtProjects = mockProjects.filter(p => p.district === district.name);
  const districtReports = mockReports.filter(r => r.district === district.name);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50/50 min-h-screen">
      <Link to="/corruption-map" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 mb-6 transition-colors bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm hover:shadow-md">
        <ArrowLeft className="h-4 w-4 mr-2" /> দুর্নীতি ম্যাপে ফিরে যান
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={
                district.riskLevel === 'High' ? 'destructive' : 
                district.riskLevel === 'Medium' ? 'warning' : 'success'
              } className="px-3 py-1 text-sm shadow-sm">
                {district.riskLevel} Risk
              </Badge>
              <div className="flex items-center gap-1 text-sm font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                স্কোর: <span className="text-slate-900">{district.riskScore}/100</span>
                {district.trend === 'up' && <TrendingUp className="h-4 w-4 text-red-500 ml-1" />}
                {district.trend === 'down' && <TrendingDown className="h-4 w-4 text-emerald-500 ml-1" />}
                {district.trend === 'stable' && <Minus className="h-4 w-4 text-slate-400 ml-1" />}
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 flex items-center gap-3">
              <MapPin className="h-8 w-8 text-indigo-600" /> {district.name} জেলা
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              এই জেলার সার্বিক দুর্নীতির ঝুঁকি, চলমান প্রকল্প এবং নাগরিক অভিযোগের বিস্তারিত চিত্র।
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <InfoCard label="মোট প্রকল্প" value={districtProjects.length.toString()} />
            <InfoCard label="মোট অভিযোগ" value={district.reportCount.toString()} />
            <InfoCard label="সন্দেহজনক প্রকল্প" value={district.suspiciousProjects.toString()} valueClass="text-red-600" />
            <InfoCard label="শীর্ষ ঝুঁকিপূর্ণ খাত" value={district.topSector} />
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="shadow-md border-slate-200">
              <CardHeader className="bg-slate-50/80 border-b border-slate-100 pb-4">
                <CardTitle className="text-xl font-extrabold flex items-center gap-2">
                  <FolderSearch className="h-5 w-5 text-teal-600" /> এই জেলার প্রকল্পসমূহ
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {districtProjects.length > 0 ? districtProjects.map(project => (
                    <div key={project.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <Link to={`/projects/${project.id}`} className="text-lg font-extrabold text-slate-900 hover:text-teal-700 transition-colors line-clamp-1">
                          {project.name}
                        </Link>
                        <div className="flex items-center gap-3 mt-2 text-sm text-slate-500 font-medium">
                          <span className="bg-slate-100 px-2 py-0.5 rounded">{project.sector}</span>
                          <span>বাজেট: ৳{project.budget.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center gap-3">
                        {project.riskScore > 70 && (
                          <Badge variant="destructive" className="text-[10px] px-1.5 py-0.5"><AlertTriangle className="w-3 h-3 mr-1 inline" /> উচ্চ ঝুঁকি</Badge>
                        )}
                        <Link to={`/projects/${project.id}`}>
                          <Button variant="outline" size="sm">বিস্তারিত</Button>
                        </Link>
                      </div>
                    </div>
                  )) : (
                    <div className="p-8 text-center text-slate-500 font-medium">এই জেলায় কোনো প্রকল্প পাওয়া যায়নি।</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card className="shadow-md border-slate-200">
              <CardHeader className="bg-slate-50/80 border-b border-slate-100 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-extrabold">
                  <FileText className="h-5 w-5 text-amber-600" /> সাম্প্রতিক অভিযোগ
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {districtReports.length > 0 ? districtReports.map(report => (
                    <div key={report.id} className="p-5 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="secondary" className="text-[10px]">{report.type}</Badge>
                        <span className="text-xs font-medium text-slate-500">{report.date}</span>
                      </div>
                      <p className="text-slate-700 text-sm font-medium line-clamp-3 leading-relaxed">{report.summary}</p>
                    </div>
                  )) : (
                    <div className="p-6 text-center text-slate-500 text-sm font-medium">কোনো অভিযোগ নেই।</div>
                  )}
                </div>
                <div className="p-4 border-t border-slate-100">
                  <Link to="/report">
                    <Button variant="destructive" className="w-full shadow-sm">নতুন অভিযোগ দিন</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value, valueClass = "" }: { label: string, value: string, valueClass?: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">{label}</span>
      <p className={`font-extrabold text-2xl text-slate-900 truncate ${valueClass}`}>{value}</p>
    </div>
  );
}
