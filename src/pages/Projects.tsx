import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Progress } from '../components/ui/Progress';
import { mockProjects } from '../lib/mock-data';
import { formatCurrency } from '../lib/utils';
import { Search, Filter, AlertTriangle, FolderSearch } from 'lucide-react';
import { motion } from 'motion/react';

export function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.contractor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = districtFilter ? project.district === districtFilter : true;
    const matchesSector = sectorFilter ? project.sector === sectorFilter : true;
    const matchesStatus = statusFilter ? project.status === statusFilter : true;
    
    return matchesSearch && matchesDistrict && matchesSector && matchesStatus;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setDistrictFilter('');
    setSectorFilter('');
    setStatusFilter('');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50/50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">প্রকল্পসমূহ</h1>
        <p className="text-slate-500 mt-1 text-lg">সরকারি উন্নয়ন প্রকল্পের বিস্তারিত তথ্য ও অগ্রগতি</p>
      </div>

      <Card className="mb-8 shadow-md border-slate-200">
        <CardContent className="p-4 sm:p-6 bg-white">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="প্রকল্প বা ঠিকাদারের নাম খুঁজুন..." 
                className="pl-10 h-12 text-base shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <Select value={districtFilter} onChange={(e) => setDistrictFilter(e.target.value)} className="w-full md:w-40 h-12 shadow-sm font-medium">
                <option value="">সকল জেলা</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Khulna">Khulna</option>
              </Select>
              <Select value={sectorFilter} onChange={(e) => setSectorFilter(e.target.value)} className="w-full md:w-40 h-12 shadow-sm font-medium">
                <option value="">সকল খাত</option>
                <option value="Roads">Roads</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Water">Water</option>
              </Select>
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full md:w-40 h-12 shadow-sm font-medium">
                <option value="">সকল অবস্থা</option>
                <option value="On Track">On Track</option>
                <option value="Delayed">Delayed</option>
                <option value="At Risk">At Risk</option>
                <option value="Completed">Completed</option>
              </Select>
              <Button variant="outline" onClick={resetFilters} className="w-full md:w-auto h-12 shadow-sm">
                <Filter className="h-4 w-4 mr-2" /> রিসেট
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="flex flex-col h-full hover:shadow-xl transition-all duration-300 group border-slate-200">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700 px-2.5 py-1">{project.sector}</Badge>
                  <StatusBadge status={project.status} />
                </div>
                
                <h3 className="text-xl font-extrabold text-slate-900 mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors">{project.name}</h3>
                <p className="text-sm font-medium text-slate-500 mb-6">{project.district} • {project.department}</p>
                
                <div className="mt-auto space-y-5">
                  <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-slate-500 font-medium mb-1">বাজেট</p>
                      <p className="font-bold text-slate-900">{formatCurrency(project.budget)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium mb-1">ব্যয়</p>
                      <p className="font-bold text-slate-900">{formatCurrency(project.spent)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 font-medium">অগ্রগতি</span>
                      <span className="font-bold text-slate-900">{project.progress}%</span>
                    </div>
                    <Progress 
                      value={project.progress} 
                      indicatorColor={project.progress < 50 && project.spent > project.budget * 0.7 ? 'bg-red-500' : 'bg-teal-500'} 
                      className="h-2.5"
                    />
                  </div>
                  
                  {project.riskScore > 70 && (
                    <div className="flex items-center gap-2 text-xs font-bold text-red-700 bg-red-50 border border-red-100 p-2.5 rounded-lg">
                      <AlertTriangle className="h-4 w-4" />
                      <span>উচ্চ দুর্নীতির ঝুঁকি ({project.riskScore}/100)</span>
                    </div>
                  )}
                  
                  <Link to={`/projects/${project.id}`} className="block mt-6">
                    <Button className="w-full h-11 text-base shadow-sm" variant="outline">বিস্তারিত দেখুন</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm mt-8">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderSearch className="h-10 w-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">কোনো প্রকল্প পাওয়া যায়নি</h3>
          <p className="text-slate-500 text-lg">ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।</p>
          <Button variant="outline" onClick={resetFilters} className="mt-6">
            ফিল্টার রিসেট করুন
          </Button>
        </motion.div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'On Track': return <Badge variant="success" className="px-2.5 py-1">অন ট্র্যাক</Badge>;
    case 'Delayed': return <Badge variant="warning" className="px-2.5 py-1">বিলম্বিত</Badge>;
    case 'At Risk': return <Badge variant="destructive" className="px-2.5 py-1">ঝুঁকিপূর্ণ</Badge>;
    case 'Completed': return <Badge variant="default" className="px-2.5 py-1 bg-blue-100 text-blue-800 border-blue-200">সম্পন্ন</Badge>;
    default: return <Badge>{status}</Badge>;
  }
}
