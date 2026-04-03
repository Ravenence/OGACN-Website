import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { mockDistricts, mockReports } from '../lib/mock-data';
import { AlertTriangle, TrendingUp, TrendingDown, Minus, MapPin, Activity } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function CorruptionMap() {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(mockDistricts[0].id);
  
  const selectedDistrict = mockDistricts.find(d => d.id === selectedDistrictId) || mockDistricts[0];
  const districtReports = mockReports.filter(r => r.district === selectedDistrict.name);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50/50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">দুর্নীতি ম্যাপ ও হটস্পট</h1>
        <p className="text-slate-500 mt-1 text-lg">জেলা ভিত্তিক দুর্নীতির ঝুঁকি এবং নাগরিক অভিযোগের চিত্র</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white border-slate-200 overflow-hidden shadow-md">
            <CardHeader className="bg-slate-50/80 border-b border-slate-100 pb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-600" /> জেলা ঝুঁকি এক্সপ্লোরার
                </CardTitle>
                <div className="flex gap-4 text-xs font-bold bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div> নিম্ন ঝুঁকি</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div> মাঝারি</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse"></div> উচ্চ ঝুঁকি</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 bg-slate-50/30">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {mockDistricts.map((district, index) => (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    key={district.id}
                    onClick={() => setSelectedDistrictId(district.id)}
                    className={cn(
                      "relative p-5 rounded-2xl border-2 text-left transition-all duration-300 group overflow-hidden",
                      selectedDistrictId === district.id 
                        ? "border-slate-900 shadow-lg scale-[1.02] bg-white" 
                        : "border-transparent bg-white shadow-sm hover:shadow-md hover:-translate-y-1",
                      district.riskLevel === 'High' && selectedDistrictId !== district.id ? "hover:border-red-200" : "",
                      district.riskLevel === 'Medium' && selectedDistrictId !== district.id ? "hover:border-amber-200" : "",
                      district.riskLevel === 'Low' && selectedDistrictId !== district.id ? "hover:border-emerald-200" : ""
                    )}
                  >
                    {/* Top color bar */}
                    <div className={cn(
                      "absolute top-0 left-0 w-full h-1.5 transition-colors",
                      district.riskLevel === 'High' ? "bg-red-500" : 
                      district.riskLevel === 'Medium' ? "bg-amber-500" : "bg-emerald-500"
                    )} />
                    
                    {/* Pulsing dot for high risk */}
                    {district.riskLevel === 'High' && (
                      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-red-500 animate-ping opacity-75" />
                    )}
                    {district.riskLevel === 'High' && (
                      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-red-500" />
                    )}

                    <div className="flex justify-between items-start mt-1">
                      <h3 className="font-extrabold text-lg text-slate-900">{district.name}</h3>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-slate-500 font-medium">স্কোর</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{district.riskScore}/100</span>
                        {district.trend === 'up' && <TrendingUp className="h-4 w-4 text-red-500" />}
                        {district.trend === 'down' && <TrendingDown className="h-4 w-4 text-emerald-500" />}
                        {district.trend === 'stable' && <Minus className="h-4 w-4 text-slate-400" />}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detail Panel */}
        <div className="space-y-6">
          <motion.div
            key={selectedDistrict.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={cn(
              "border-t-4 shadow-lg overflow-hidden",
              selectedDistrict.riskLevel === 'High' ? "border-t-red-500" : 
              selectedDistrict.riskLevel === 'Medium' ? "border-t-amber-500" : "border-t-emerald-500"
            )}>
              <CardHeader className="bg-white pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl font-extrabold">{selectedDistrict.name}</CardTitle>
                    <p className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-wider">জেলা প্রোফাইল</p>
                  </div>
                  <Badge variant={
                    selectedDistrict.riskLevel === 'High' ? 'destructive' : 
                    selectedDistrict.riskLevel === 'Medium' ? 'warning' : 'success'
                  } className="px-3 py-1 text-sm shadow-sm">
                    {selectedDistrict.riskLevel} Risk
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
                    <p className="text-3xl font-extrabold text-slate-900">{selectedDistrict.riskScore}</p>
                    <p className="text-xs font-bold text-slate-500 mt-1 uppercase">ঝুঁকি স্কোর</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
                    <p className="text-3xl font-extrabold text-slate-900">{selectedDistrict.reportCount}</p>
                    <p className="text-xs font-bold text-slate-500 mt-1 uppercase">মোট অভিযোগ</p>
                  </div>
                  <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-center">
                    <p className="text-3xl font-extrabold text-red-600">{selectedDistrict.suspiciousProjects}</p>
                    <p className="text-xs font-bold text-red-700 mt-1 uppercase">সন্দেহজনক প্রকল্প</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center flex flex-col items-center justify-center">
                    <p className="text-base font-extrabold text-slate-900 truncate w-full">{selectedDistrict.topSector}</p>
                    <p className="text-xs font-bold text-slate-500 mt-1 uppercase">শীর্ষ ঝুঁকিপূর্ণ খাত</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-amber-500" /> সাম্প্রতিক অভিযোগসমূহ
                  </h4>
                  {districtReports.length > 0 ? (
                    <div className="space-y-3">
                      {districtReports.map(report => (
                        <div key={report.id} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-center mb-2">
                            <Badge variant="secondary" className="text-[10px]">{report.type}</Badge>
                            <span className="text-xs font-medium text-slate-500">{report.date}</span>
                          </div>
                          <p className="text-slate-700 text-sm font-medium line-clamp-2 leading-relaxed">{report.summary}</p>
                          <div className="mt-3 text-xs font-bold text-slate-500 bg-slate-50 p-2 rounded-md truncate">
                            প্রকল্প: {report.projectName}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-sm font-medium text-slate-500">এই জেলার জন্য কোনো সাম্প্রতিক অভিযোগ নেই।</p>
                    </div>
                  )}
                </div>

                <Link to="/projects" className="block pt-2">
                  <Button className="w-full h-12 text-base shadow-sm" variant="outline">এই জেলার সকল প্রকল্প দেখুন</Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
