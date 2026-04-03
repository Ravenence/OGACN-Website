import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Shield, UploadCloud, CheckCircle2, AlertCircle, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export function Report() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.isRequired = false;
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl min-h-[80vh] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="text-center border-emerald-200 shadow-xl overflow-hidden">
            <div className="h-2 w-full bg-emerald-500" />
            <CardContent className="pt-12 pb-12 px-8">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CheckCircle2 className="h-12 w-12 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">অভিযোগ সফলভাবে জমা হয়েছে</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                আপনার দেওয়া তথ্য আমাদের সিস্টেম সুরক্ষিতভাবে সংরক্ষণ করেছে। একটি ট্র্যাকিং আইডি আপনার স্ক্রিনে দেওয়া হলো। এটি সংরক্ষণ করুন।
              </p>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8 inline-block">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">ট্র্যাকিং আইডি</p>
                <p className="text-2xl font-mono font-extrabold text-slate-900 tracking-widest">OGACN-{Math.floor(Math.random() * 1000000)}</p>
              </div>
              <div>
                <Button onClick={() => setIsSuccess(false)} size="lg" className="h-12 px-8 text-base shadow-md">
                  নতুন অভিযোগ জমা দিন
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-slate-50/50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4 shadow-inner">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">গোপন অভিযোগ জমা দিন</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            সরকারি প্রকল্পে কোনো অনিয়ম বা দুর্নীতির প্রমাণ থাকলে আমাদের জানান। আপনার পরিচয় সম্পূর্ণ গোপন রাখা হবে।
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="shadow-xl border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-6 flex items-start gap-4">
              <Lock className="w-6 h-6 text-teal-400 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">১০০% এন্ড-টু-এন্ড এনক্রিপ্টেড</h3>
                <p className="text-slate-300 text-sm leading-relaxed">আপনার আইপি অ্যাড্রেস বা কোনো ব্যক্তিগত তথ্য সংরক্ষণ করা হয় না। আপনি চাইলে সম্পূর্ণ নাম-পরিচয় গোপন রেখে অভিযোগ জমা দিতে পারেন।</p>
              </div>
            </div>
            
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">জেলা <span className="text-red-500">*</span></label>
                    <Select required className="h-12 shadow-sm border-slate-300 focus:border-teal-500 focus:ring-teal-500">
                      <option value="">জেলা নির্বাচন করুন</option>
                      <option value="Dhaka">ঢাকা</option>
                      <option value="Chattogram">চট্টগ্রাম</option>
                      <option value="Sylhet">সিলেট</option>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">খাত <span className="text-red-500">*</span></label>
                    <Select required className="h-12 shadow-sm border-slate-300 focus:border-teal-500 focus:ring-teal-500">
                      <option value="">খাত নির্বাচন করুন</option>
                      <option value="Roads">রাস্তা ও সেতু</option>
                      <option value="Health">স্বাস্থ্য</option>
                      <option value="Education">শিক্ষা</option>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900">সংশ্লিষ্ট প্রকল্প (যদি জানা থাকে)</label>
                  <Input placeholder="প্রকল্পের নাম বা আইডি লিখুন" className="h-12 shadow-sm border-slate-300 focus:border-teal-500 focus:ring-teal-500" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900">অভিযোগের বিস্তারিত <span className="text-red-500">*</span></label>
                  <textarea 
                    required
                    className="w-full min-h-[150px] p-4 rounded-xl border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-y transition-shadow"
                    placeholder="কী অনিয়ম হয়েছে তা বিস্তারিত লিখুন..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900">প্রমাণ সংযুক্ত করুন (ছবি, পিডিএফ, অডিও)</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center hover:bg-slate-50 hover:border-teal-400 transition-colors cursor-pointer group">
                    <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-sm">
                      <UploadCloud className="h-8 w-8 text-slate-400 group-hover:text-teal-500 transition-colors" />
                    </div>
                    <p className="text-sm font-bold text-slate-700 mb-1">ফাইলগুলো এখানে টেনে আনুন অথবা ক্লিক করুন</p>
                    <p className="text-xs text-slate-500 font-medium">সর্বোচ্চ ৫টি ফাইল (প্রতিটি সর্বোচ্চ ১০ মেগাবাইট)</p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800 font-medium leading-relaxed">
                    মিথ্যা বা বানোয়াট তথ্য প্রদান থেকে বিরত থাকুন। আপনার দেওয়া তথ্য এআই এবং আমাদের ভলান্টিয়ার টিম দ্বারা যাচাই করা হবে।
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-bold shadow-lg" 
                  variant="destructive"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'জমা দেওয়া হচ্ছে...' : 'নিরাপদে অভিযোগ জমা দিন'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
