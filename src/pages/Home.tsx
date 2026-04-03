import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ShieldAlert, BarChart3, Map, FileText, Activity, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { mockSummaryStats } from '../lib/mock-data';
import { formatNumber } from '../lib/utils';
import { IMAGES } from '../lib/images';

export function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-24 lg:py-32">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.heroBg} 
            alt="Civic Engagement" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-teal-950/80" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Badge className="mb-6 bg-teal-500/20 text-teal-300 border-teal-500/30 hover:bg-teal-500/30 px-4 py-1.5 text-sm backdrop-blur-md">
                প্রোটোটাইপ সংস্করণ
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                জনগণের জন্য <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">স্বচ্ছতা</span>,<br className="hidden md:block" /> জবাবদিহিতা ও নজরদারি
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
                Open Governance & Anti-Corruption Network (OGACN) - সরকারি প্রকল্প, বাজেট এবং চুক্তির তথ্যে নাগরিকদের সরাসরি প্রবেশাধিকার নিশ্চিত করার একটি উন্মুক্ত প্ল্যাটফর্ম।
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8 shadow-teal-900/50 shadow-lg">
                    ড্যাশবোর্ড দেখুন <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/report">
                  <Button size="lg" variant="destructive" className="w-full sm:w-auto text-base h-14 px-8 bg-red-600 hover:bg-red-500 shadow-red-900/50 shadow-lg border-none">
                    অভিযোগ জমা দিন
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white border-b relative z-20 -mt-8 mx-4 sm:mx-8 lg:mx-auto lg:max-w-6xl rounded-2xl shadow-xl">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <p className="text-4xl font-extrabold text-slate-900">{formatNumber(mockSummaryStats.activeProjects)}</p>
              <p className="text-sm font-medium text-slate-500 mt-2 uppercase tracking-wide">চলমান প্রকল্প</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <p className="text-4xl font-extrabold text-teal-600">{formatNumber(mockSummaryStats.totalSpent / 10000000)}<span className="text-2xl">কোটি</span></p>
              <p className="text-sm font-medium text-slate-500 mt-2 uppercase tracking-wide">মোট ব্যয় (টাকা)</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <p className="text-4xl font-extrabold text-amber-500">{formatNumber(mockSummaryStats.delayedProjects)}</p>
              <p className="text-sm font-medium text-slate-500 mt-2 uppercase tracking-wide">বিলম্বিত প্রকল্প</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <p className="text-4xl font-extrabold text-red-500">{formatNumber(mockSummaryStats.publicReports)}</p>
              <p className="text-sm font-medium text-slate-500 mt-2 uppercase tracking-wide">নাগরিক অভিযোগ</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">মূল বৈশিষ্ট্যসমূহ</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              আমাদের প্ল্যাটফর্ম ব্যবহার করে সরকারি কাজে স্বচ্ছতা নিশ্চিত করুন এবং দুর্নীতি প্রতিরোধে ভূমিকা রাখুন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BarChart3 className="h-8 w-8 text-teal-600" />}
              iconBg="bg-teal-100"
              title="প্রকল্প ট্র্যাকিং"
              description="আপনার এলাকার সরকারি প্রকল্পের বাজেট, ব্যয় এবং বর্তমান অবস্থা সম্পর্কে বিস্তারিত জানুন।"
              link="/projects"
              delay={0.1}
            />
            <FeatureCard 
              icon={<Map className="h-8 w-8 text-amber-600" />}
              iconBg="bg-amber-100"
              title="দুর্নীতি ম্যাপ"
              description="দেশের কোন জেলায় কোন খাতে দুর্নীতির ঝুঁকি বেশি, তা ম্যাপের মাধ্যমে দেখুন।"
              link="/corruption-map"
              delay={0.2}
            />
            <FeatureCard 
              icon={<FileText className="h-8 w-8 text-blue-600" />}
              iconBg="bg-blue-100"
              title="চুক্তিপত্র যাচাই"
              description="সরকারি কাজের ঠিকাদার এবং চুক্তির বিস্তারিত তথ্য ও স্বচ্ছতা স্কোর দেখুন।"
              link="/contracts"
              delay={0.3}
            />
            <FeatureCard 
              icon={<ShieldAlert className="h-8 w-8 text-red-600" />}
              iconBg="bg-red-100"
              title="গোপন অভিযোগ"
              description="পরিচয় গোপন রেখে যেকোনো অনিয়ম বা দুর্নীতির অভিযোগ প্রমাণসহ জমা দিন।"
              link="/report"
              delay={0.4}
            />
            <FeatureCard 
              icon={<Activity className="h-8 w-8 text-indigo-600" />}
              iconBg="bg-indigo-100"
              title="এআই ইনসাইটস"
              description="আর্টিফিশিয়াল ইন্টেলিজেন্স ব্যবহার করে অস্বাভাবিক ব্যয় ও দুর্নীতির পূর্বাভাস জানুন।"
              link="/ai-insights"
              delay={0.5}
            />
            <FeatureCard 
              icon={<Users className="h-8 w-8 text-emerald-600" />}
              iconBg="bg-emerald-100"
              title="নাগরিক সম্পৃক্ততা"
              description="তথ্য অধিকার নিশ্চিত করে সাধারণ নাগরিকদের ক্ষমতায়ন ও সচেতনতা বৃদ্ধি।"
              link="/about"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Image + Text Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={IMAGES.dataAnalysis} 
                  alt="Data Analysis" 
                  className="w-full h-auto object-cover aspect-[4/3]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-teal-400" />
                    <span className="font-bold">ডেটা-ড্রিভেন সিদ্ধান্ত</span>
                  </div>
                  <p className="text-white/80 text-sm">আমাদের এআই মডেল প্রতিদিন হাজার হাজার ডেটা পয়েন্ট বিশ্লেষণ করে।</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                প্রযুক্তির মাধ্যমে <span className="text-teal-600">দুর্নীতি প্রতিরোধ</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                OGACN শুধুমাত্র একটি ডেটা পোর্টাল নয়। এটি একটি সক্রিয় নজরদারি ব্যবস্থা যা আধুনিক প্রযুক্তি ব্যবহার করে সরকারি ব্যয়ের অসঙ্গতিগুলো স্বয়ংক্রিয়ভাবে চিহ্নিত করে এবং নাগরিকদের সচেতন করে।
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-start gap-3">
                  <div className="bg-teal-100 p-1 rounded-full mt-1">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  </div>
                  <span className="text-slate-700 font-medium">রিয়েল-টাইম প্রজেক্ট ট্র্যাকিং ও বাজেট মনিটরিং</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-teal-100 p-1 rounded-full mt-1">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  </div>
                  <span className="text-slate-700 font-medium">ঠিকাদারদের অতীত রেকর্ড ও স্বচ্ছতা স্কোরিং</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-teal-100 p-1 rounded-full mt-1">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  </div>
                  <span className="text-slate-700 font-medium">নাগরিকদের জন্য নিরাপদ ও এনক্রিপ্টেড রিপোর্টিং সিস্টেম</span>
                </li>
              </ul>
              <div className="pt-6">
                <Link to="/about">
                  <Button variant="outline" size="lg" className="h-12 px-8">আমাদের সম্পর্কে জানুন</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">কীভাবে কাজ করে?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">তিনটি সহজ ধাপে আমরা তথ্যের স্বচ্ছতা নিশ্চিত করি</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-teal-100 via-teal-300 to-teal-100" />
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative text-center">
              <div className="w-24 h-24 mx-auto bg-white border-4 border-teal-100 shadow-xl rounded-full flex items-center justify-center text-3xl font-extrabold text-teal-600 mb-6 relative z-10">
                ১
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">তথ্য সংগ্রহ</h3>
              <p className="text-slate-600 leading-relaxed">সরকারি ওপেন ডেটা পোর্টাল এবং নাগরিকদের দেওয়া রিপোর্ট থেকে তথ্য সংগ্রহ করা হয়।</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative text-center">
              <div className="w-24 h-24 mx-auto bg-white border-4 border-teal-100 shadow-xl rounded-full flex items-center justify-center text-3xl font-extrabold text-teal-600 mb-6 relative z-10">
                ২
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">বিশ্লেষণ ও এআই</h3>
              <p className="text-slate-600 leading-relaxed">সংগৃহীত তথ্য বিশ্লেষণ করে অস্বাভাবিকতা এবং দুর্নীতির সম্ভাব্য ঝুঁকি চিহ্নিত করা হয়।</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="relative text-center">
              <div className="w-24 h-24 mx-auto bg-white border-4 border-teal-100 shadow-xl rounded-full flex items-center justify-center text-3xl font-extrabold text-teal-600 mb-6 relative z-10">
                ৩
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">জনসমক্ষে প্রকাশ</h3>
              <p className="text-slate-600 leading-relaxed">সহজ ড্যাশবোর্ড ও ম্যাপের মাধ্যমে সাধারণ মানুষের জন্য তথ্য উন্মুক্ত করা হয়।</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, iconBg, title, description, link, delay }: { icon: React.ReactNode, iconBg: string, title: string, description: string, link: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <Card className="h-full flex flex-col group hover:border-teal-200 transition-colors">
        <CardHeader>
          <div className={`mb-6 w-16 h-16 rounded-2xl flex items-center justify-center ${iconBg} group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
            {icon}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <CardDescription className="text-base mb-6 flex-1 text-slate-600">{description}</CardDescription>
          <Link to={link} className="inline-flex items-center text-teal-600 font-bold hover:text-teal-700 group-hover:translate-x-1 transition-transform">
            বিস্তারিত দেখুন <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
