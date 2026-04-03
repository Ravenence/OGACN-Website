import { Shield, Eye, Users, AlertCircle } from 'lucide-react';

export function About() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <div className="text-center mb-16">
        <Shield className="h-16 w-16 text-teal-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-slate-900 mb-4">আমাদের সম্পর্কে</h1>
        <p className="text-xl text-slate-600">
          Open Governance & Anti-Corruption Network (OGACN)
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 mb-4">আমাদের লক্ষ্য</h2>
          <p className="text-slate-700 leading-relaxed text-lg">
            OGACN-এর মূল লক্ষ্য হলো বাংলাদেশের সরকারি প্রকল্প, বাজেট এবং চুক্তিপত্র সংক্রান্ত তথ্য সাধারণ নাগরিকদের জন্য উন্মুক্ত ও সহজলভ্য করা। আমরা বিশ্বাস করি, তথ্য জানার অধিকার নাগরিক ক্ষমতায়নের প্রথম ধাপ। স্বচ্ছতা ও জবাবদিহিতা নিশ্চিত করার মাধ্যমে দুর্নীতি প্রতিরোধ করা সম্ভব।
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
            <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">স্বচ্ছতা</h3>
            <p className="text-slate-600 text-sm">সরকারি ব্যয়ের প্রতিটি টাকার হিসাব নাগরিকদের সামনে তুলে ধরা।</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">জবাবদিহিতা</h3>
            <p className="text-slate-600 text-sm">প্রকল্পের ধীরগতি বা অনিয়মের জন্য সংশ্লিষ্ট কর্তৃপক্ষকে জবাবদিহির আওতায় আনা।</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">দুর্নীতি প্রতিরোধ</h3>
            <p className="text-slate-600 text-sm">নাগরিক নজরদারি এবং এআই বিশ্লেষণের মাধ্যমে দুর্নীতির ঝুঁকি কমানো।</p>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 border-b pb-2 mb-4">নাগরিকরা কীভাবে উপকৃত হবেন?</h2>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 text-lg">
            <li>নিজের এলাকার উন্নয়ন প্রকল্পের বিস্তারিত তথ্য জানতে পারবেন।</li>
            <li>প্রকল্পের বাজেট কত এবং কত টাকা ব্যয় হয়েছে তা দেখতে পারবেন।</li>
            <li>কাজের মান খারাপ হলে বা ধীরগতি থাকলে পরিচয় গোপন রেখে অভিযোগ জানাতে পারবেন।</li>
            <li>সরকারি কাজে কোন ঠিকাদার কেমন কাজ করছে তার স্বচ্ছতা স্কোর দেখতে পারবেন।</li>
          </ul>
        </section>

        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-amber-900 text-lg mb-2">ডেমো প্রোটোটাইপ ডিসক্লেইমার</h3>
            <p className="text-amber-800">
              এটি একটি ডেমো বা প্রোটোটাইপ অ্যাপ্লিকেশন। এখানে প্রদর্শিত সকল ডেটা, প্রকল্প, চুক্তি এবং এআই ইনসাইট সম্পূর্ণ কাল্পনিক এবং শুধুমাত্র প্রেজেন্টেশন বা ডেমোনস্ট্রেশনের উদ্দেশ্যে তৈরি করা হয়েছে। এটি কোনো বাস্তব সরকারি ডেটাবেসের সাথে সংযুক্ত নয়।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
