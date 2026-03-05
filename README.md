# 🌴 صانع الكاروسيل الاحترافي - Reef Style

منصة احترافية لتصميم بوستات وسائل التواصل الاجتماعي بأسلوب Reef السعودي.

## 🚀 النشر على Vercel

### الطريقة 1: النشر المباشر من GitHub (موصى به)

1. **ارفع المشروع على GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **اذهب إلى [Vercel](https://vercel.com)**

3. **اضغط على "Add New Project"**

4. **اختر مستودع GitHub** الخاص بك

5. **أضف متغيرات البيئة:**
   - اذهب إلى Settings → Environment Variables
   - أضف `GEMINI_API_KEY` مع مفتاح API الخاص بك

6. **اضغط "Deploy"**

### الطريقة 2: النشر عبر Vercel CLI

```bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel

# لإضافة متغيرات البيئة
vercel env add GEMINI_API_KEY

# إعادة النشر
vercel --prod
```

## 📋 متغيرات البيئة المطلوبة

| المتغير | الوصف |
|---------|--------|
| `GEMINI_API_KEY` | مفتاح API لخدمة Google Gemini للذكاء الاصطناعي |

## 🛠️ التطوير المحلي

```bash
# تثبيت التبعيات
npm install

# تشغيل خادم التطوير
npm run dev

# بناء المشروع للإنتاج
npm run build

# معاينة النسخة الإنتاجية
npm run preview
```

## 📁 هيكل المشروع

```
.
├── App.tsx              # المكون الرئيسي
├── components/
│   ├── Editor.tsx       # محرر المحتوى
│   └── SlideCanvas.tsx  # عرض الشريحة
├── services/
│   └── geminiService.ts # خدمة الذكاء الاصطناعي
├── styles/
│   ├── app.css          # تنسيقات التطبيق
│   ├── editor.css       # تنسيقات المحرر
│   └── slideCanvas.css  # تنسيقات الشريحة
├── index.html
├── vercel.json          # إعدادات Vercel
└── package.json
```

## 🎨 المميزات

- ✨ توليد محتوى بالذكاء الاصطناعي عبر Gemini
- 🎯 تصميم احترافي جاهز للنشر
- 📱 متجاوب مع جميع الأجهزة
- 🌙 دعم الوضع الفاتح والداكن
- 🖼️ تصدير كصورة عالية الجودة
- 🎨 تخصيص كامل للألوان والثيمات

## 📦 التقنيات المستخدمة

- **React 19** - مكتبة الواجهة
- **TypeScript** - كتابة الكود
- **Vite** - أداة البناء
- **Lucide Icons** - الأيقونات
- **HTML-to-Image** - تصدير الصور
- **Google Gemini AI** - الذكاء الاصطناعي

## 🔗 روابط مفيدة

- [توثيق Vercel](https://vercel.com/docs)
- [لوحة تحكم Vercel](https://vercel.com/dashboard)
- [الحصول على Gemini API Key](https://aistudio.google.com/apikey)

---

صنع بكل ❤️ للمملكة العربية السعودية
