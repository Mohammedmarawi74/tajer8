# 🚀 خطوات الرفع على Vercel

## الخطوة 1: رفع المشروع على GitHub

```bash
# 1. تهيئة Git (إذا لم يكن مهيأ)
git init

# 2. إضافة جميع الملفات
git add .

# 3. إنشاء commit
git commit -m "Prepare for Vercel deployment"

# 4. تغيير اسم الفرع إلى main
git branch -M main

# 5. إضافة remote repository (استبدل YOUR_USERNAME و YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 6. رفع الملفات
git push -u origin main
```

## الخطوة 2: الإعداد على Vercel

### أ. الذهاب إلى Vercel
1. افتح [https://vercel.com](https://vercel.com)
2. سجّل الدخول باستخدام حساب GitHub

### ب. إنشاء مشروع جديد
1. اضغط على **"Add New Project"**
2. اختر **"Import Git Repository"**
3. اختر المستودع الذي رفعته
4. اضغط **"Import"**

### ج. إضافة متغيرات البيئة
1. اضغط على **"Environment Variables"**
2. اضغط **"Add Variable"**
3. أضف المتغير التالي:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** (مفتاح API الخاص بك من Google Gemini)
4. اضغط **"Add"**

### د. النشر
1. اضغط **"Deploy"**
2. انتظر حتى يكتمل البناء (حوالي 1-2 دقيقة)
3. اضغط **"Continue to Dashboard"**

## الخطوة 3: الحصول على Gemini API Key

1. اذهب إلى [Google AI Studio](https://aistudio.google.com/apikey)
2. سجّل الدخول بحساب Google
3. اضغط على **"Get API Key"**
4. انسخ المفتاح
5. أضفه في Vercel تحت Environment Variables

## الخطوة 4: التحقق من المشروع

بعد اكتمال النشر:
1. اضغط على **"Visit"** لفتح الموقع
2. اختبر جميع الميزات
3. تأكد من عمل الذكاء الاصطناعي

## الخطوة 5: تحديث المشروع (في المستقبل)

```bash
# بعد إجراء أي تغييرات
git add .
git commit -m "وصف التغييرات"
git push

# Vercel سيقوم بالنشر تلقائياً!
```

## 📊 لوحة التحكم

يمكنك الوصول إلى لوحة التحكم من:
- [https://vercel.com/dashboard](https://vercel.com/dashboard)

## 🔗 رابط المشروع

سيكون رابط مشروعك:
```
https://YOUR-PROJECT-NAME.vercel.app
```

## 🎯 نصائح مهمة

### 1. النطاق المخصص (Custom Domain)
- اذهب إلى Settings → Domains
- أضف النطاق الخاص بك

### 2. المعاينة (Preview)
- كل push ينشئ نسخة معاينة
- يمكن اختبارها قبل النشر للإنتاج

### 3. السجلات (Logs)
- اذهب إلى Deployments → اختر النسخة → Logs
- لمراقبة الأخطاء

### 4. الأداء
- Vercel يوفر CDN تلقائي
- الصور والملفات الثابتة تُخزن مؤقتاً

## ⚠️ حل المشاكل الشائعة

### المشكلة: خطأ في البناء
**الحل:** تحقق من Logs في Vercel

### المشكلة: الذكاء الاصطناعي لا يعمل
**الحل:** تأكد من إضافة `GEMINI_API_KEY` بشكل صحيح

### المشكلة: الصفحة بيضاء
**الحل:** تحقق من Console في المتصفح

## 📞 الدعم

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

**تم الرفع بنجاح! 🎉**
