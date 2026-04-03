import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { mockAiInsights, mockProjects } from '../lib/mock-data';
import { ArrowLeft, BrainCircuit, AlertTriangle, MapPin, ExternalLink, Activity, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export function AiInsightDetails() {
  const { id } = useParams<{ id: string }>();
  const insight = mockAiInsights.find(i => i.id === id) || mockAiInsights[0];
  const project = insight.relatedProjectId ? mockProjects.find(p => p.id === insight.relatedProjectId) : null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50/50 min-h-screen">
      <Link to="/ai-insights" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 mb-6 transition-colors bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm hover:shadow-md">
        <ArrowLeft className="h-4 w-4 mr-2" /> এআই ইনসাইটস তালিকায় ফিরে যান
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className={`p-8 rounded-3xl text-white relative overflow-hidden shadow-xl ${insight.severity === 'High' ? 'bg-gradient-to-br from-red-950 via-red-900 to-rose-900' : 'bg-gradient-to-br from-amber-950 via-amber-900 to-orange-900'}`}
          >
            <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10 pointer-events-none">
              <BrainCircuit className="w-64 h-64" />
            </div>
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge variant={insight.severity === 'High' ? 'destructive' : 'warning'} className="px-3 py-1 text-sm shadow-sm border-none">
                  {insight.severity} Risk
                </Badge>
                <span className="text-sm font-bold flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  <MapPin className="w-4 h-4" /> {insight.district}
                </span>
                <span className="text-sm font-bold flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                  <Activity className="w-4 h-4" /> কনফিডেন্স: {insight.confidence}%
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">{insight.title}</h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-3xl font-medium">
                {insight.explanation}
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="shadow-md border-slate-200">
              <CardHeader className="bg-slate-50/80 border-b border-slate-100 pb-4">
                <CardTitle className="text-xl font-extrabold flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-indigo-600" /> এআই বিশ্লেষণ ও কারণ
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-xl">
                  <h4 className="font-bold text-indigo-900 mb-2">কেন এই অ্যালার্ট তৈরি হয়েছে?</h4>
                  <p className="text-indigo-800 leading-relaxed">
                    আমাদের মেশিন লার্নিং মডেল ঐতিহাসিক ডেটা, বর্তমান প্রকল্পের অগ্রগতি, বাজেট ব্যয়ের হার এবং নাগরিক অভিযোগের প্যাটার্ন বিশ্লেষণ করে এই অস্বাভাবিকতা চিহ্নিত করেছে। {insight.confidence}% কনফিডেন্স স্কোর নির্দেশ করে যে এটি একটি সাধারণ বিলম্ব নয়, বরং দুর্নীতির একটি শক্তিশালী সম্ভাবনা রয়েছে।
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-900 mb-4">চিহ্নিত অসঙ্গতিসমূহ</h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                      <span className="text-slate-700 font-medium">বাজেট ব্যয়ের তুলনায় কাজের বাস্তব অগ্রগতি অত্যন্ত কম।</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                      <span className="text-slate-700 font-medium">একই ঠিকাদারের পূর্ববর্তী প্রকল্পগুলোতেও অনুরূপ ধীরগতি এবং বাজেট বৃদ্ধির প্রবণতা রয়েছে।</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                      <span className="text-slate-700 font-medium">স্থানীয় নাগরিকদের কাছ থেকে এই প্রকল্পের মান নিয়ে একাধিক অভিযোগ পাওয়া গেছে।</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="lg:w-80 space-y-6">
          {project && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="shadow-md border-slate-200 bg-gradient-to-b from-slate-50 to-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-extrabold text-slate-900">সংশ্লিষ্ট প্রকল্প</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <h4 className="font-bold text-slate-900 mb-2 line-clamp-2">{project.name}</h4>
                  <div className="space-y-2 mb-4 text-sm">
                    <p className="flex justify-between"><span className="text-slate-500">ঠিকাদার:</span> <span className="font-bold text-slate-900 truncate ml-2">{project.contractor}</span></p>
                    <p className="flex justify-between"><span className="text-slate-500">অগ্রগতি:</span> <span className="font-bold text-red-600">{project.progress}%</span></p>
                    <p className="flex justify-between"><span className="text-slate-500">ব্যয়:</span> <span className="font-bold text-amber-600">{Math.round((project.spent/project.budget)*100)}%</span></p>
                  </div>
                  <Link to={`/projects/${project.id}`}>
                    <Button className="w-full shadow-sm" variant="outline">
                      প্রকল্প বিস্তারিত <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="shadow-md border-slate-200">
              <CardContent className="p-6">
                <h3 className="font-extrabold text-slate-900 mb-4">আপনার করণীয়</h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  আপনি যদি এই এলাকার বাসিন্দা হন বা এই প্রকল্প সম্পর্কে আপনার কাছে কোনো তথ্য থাকে, তবে অনুগ্রহ করে আমাদের জানান।
                </p>
                <Link to="/report">
                  <Button variant="destructive" className="w-full shadow-sm">তথ্য প্রদান করুন</Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
