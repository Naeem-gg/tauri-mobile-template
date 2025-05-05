import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return  <div className="container mx-auto px-4 py-12">
  <div className="max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">
      About
    </h1>

    <div className="space-y-8 text-gray-600 dark:text-gray-300 text-right">
      <p className="text-xl text-right">
        نماز کے اوقات کی ویب سائٹ مسلمانوں کو دنیا بھر میں درست نماز کے
        اوقات فراہم کرنے کے لیے وقف ہے۔ ہمارا مقصد ہے کہ مسلم کمیونٹی کو ان
        کے روزانہ کے نماز کے اوقات کو سہولت اور درستگی کے ساتھ ادا کرنے میں
        مدد فراہم کی جائے۔
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          ہمارا مشن
        </h2>
        <p className="mb-4 text-xl">
          ہم مستند حسابی طریقوں کا استعمال کرتے ہوئے سب سے درست نماز کے
          اوقات فراہم کرنے کی کوشش کرتے ہیں، تاکہ مساجد اور افراد کو نماز کے
          اوقات کا نظام آسانی سے ترتیب دینے اور شیئر کرنے میں مدد مل سکے۔
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          خصوصیات
        </h2>
        <ul className=" space-y-2 text-xl">
          <li>درست نماز کے اوقات کا حساب</li>
          <li>مختلف حسابی طریقوں کی سپورٹ</li>
          <li>آسان مسجد رجسٹریشن اور انتظام</li>
          <li>نماز کے اوقات کی یاد دہانیاں</li>
          <li>اپنی پسند کے مطابق ڈسپلے کے اختیارات</li>
        </ul>
      </div>
    </div>
  </div>
 
</div>
}
