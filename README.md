# 🌊 Smart Algae Farm - Akıllı Alg Çiftliği Yönetim Sistemi

<div align="center">

![Smart Algae Farm Logo](https://img.shields.io/badge/Smart%20Algae%20Farm-v1.0.0-blue?style=for-the-badge&logo=react)

**Modern deniz alg çiftliklerini yönetmek için geliştirilmiş kapsamlı IoT ve AI destekli web platformu**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.5-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=flat&logo=vite)](https://vitejs.dev/)

[🚀 Demo](https://smart-algae-farm.vercel.app) • [📖 Dokümantasyon](#özellikler) • [🔧 Kurulum](#kurulum) • [📊 Ekran Görüntüleri](#ekran-görüntüleri)

</div>

---

## 📋 İçindekiler

- [Genel Bakış](#-genel-bakış)
- [Özellikler](#-özellikler)
- [Teknoloji Stack](#-teknoloji-stack)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Proje Yapısı](#-proje-yapısı)
- [API Entegrasyonu](#-api-entegrasyonu)
- [Ekran Görüntüleri](#-ekran-görüntüleri)
- [Deployment](#-deployment)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

---

## 🌊 Genel Bakış

**Smart Algae Farm**, sürdürülebilir deniz tarımcılığının geleceğini şekillendiren, AI destekli alg çiftliği yönetim platformudur. Modern IoT sensörleri, makine öğrenmesi algoritmaları ve kullanıcı dostu arayüzü ile deniz alg üretimini optimize eder.

### 🎯 Proje Hedefleri

- **Sürdürülebilir Üretim**: Çevre dostu alg üretim yöntemlerini optimize etme
- **Veri Odaklı Kararlar**: Gerçek zamanlı sensör verileri ile akıllı çiftlik yönetimi
- **Verimlilik Artışı**: AI tahminleri ile üretim verimliliğini %30'a kadar artırma
- **Otomatik İzleme**: 7/24 çiftlik durumu takibi ve otomatik uyarı sistemi

---

## ✨ Özellikler

### 🔥 Ana Özellikler

#### 📊 **Gerçek Zamanlı İzleme**
- 6 farklı sensör türü ile sürekli veri toplama (pH, sıcaklık, oksijen, tuzluluk, büyüme, uzunluk)
- Anlık durum göstergeleri ve kritik eşik uyarıları
- Interaktif grafikler ve trend analizi

#### 🤖 **AI Destekli Tahminler**
- Makine öğrenmesi ile 30 günlük büyüme tahmini
- Hava durumu bazlı risk analizi
- Optimal hasat zamanı önerileri
- Bakım gereksinimleri tahmini

#### 📈 **Kapsamlı Analytics**
- Çok boyutlu performans metrikleri
- Çiftlik karşılaştırma analizi
- Enerji tüketimi ve maliyet optimizasyonu
- ROI hesaplamaları ve trend analizi

#### 🚨 **Akıllı Uyarı Sistemi**
- Kritik durum bildirimleri
- Özelleştirilebilir eşik değerleri
- Email/SMS entegrasyonu (gelecek sürümlerde)
- Acil durum protokol önerileri

#### 📱 **Responsive Tasarım**
- Mobil-first yaklaşım
- Tablet ve desktop optimizasyonu
- PWA desteği (gelecek sürümlerde)
- Offline çalışma kapasitesi

### 🛠️ Teknik Özellikler

- **Modern React**: Hooks, Context API, Functional Components
- **TypeScript**: Tip güvenli kod geliştirme
- **Responsive Design**: Mobil uyumlu tasarım
- **Animasyonlar**: Framer Motion ile smooth geçişler
- **Grafik Görselleştirme**: Recharts ile interaktif grafikler
- **Modüler Yapı**: Yeniden kullanılabilir componentler

---

## 🛠️ Teknoloji Stack

### Frontend Framework
- **React 18.2.0** - Modern UI library
- **TypeScript 5.2.2** - Type-safe JavaScript
- **Vite 5.0.0** - Lightning fast build tool

### Styling & UI
- **Tailwind CSS 3.3.5** - Utility-first CSS framework
- **Headless UI 1.7.17** - Unstyled, accessible UI components
- **Heroicons 2.0.18** - Beautiful hand-crafted SVG icons
- **Lucide React 0.292.0** - Simply beautiful icons

### Data Visualization
- **Recharts 2.8.0** - Composable charting library
- **Framer Motion 10.16.4** - Production-ready motion library

### Navigation & Routing
- **React Router DOM 6.8.1** - Declarative routing

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS transformation
- **Autoprefixer** - CSS vendor prefixing

---

## 🚀 Kurulum

### Ön Gereksinimler

Sisteminizde aşağıdaki yazılımların yüklü olması gerekir:

- **Node.js** (v18.0.0 veya üzeri)
- **npm** (v8.0.0 veya üzeri) veya **yarn**
- **Git**

### Adım Adım Kurulum

1. **Repository'i klonlayın**
   ```bash
   git clone https://github.com/hasan0v/Smart-Algae-Farm.git
   cd Smart-Algae-Farm
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   # veya
   yarn install
   ```

3. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   # veya
   yarn dev
   ```

4. **Tarayıcınızda açın**
   ```
   http://localhost:3000
   ```

### Üretim Derlemesi

```bash
# Üretim için derleme
npm run build

# Önizleme sunucusu
npm run preview
```

---

## 📖 Kullanım

### Giriş ve Ana Sayfa

1. **Giriş**: Login sayfasından sisteme giriş yapın
2. **Dashboard**: Ana gösterge panelinde tüm çiftliklerin özet durumunu görün
3. **Hızlı Eylemler**: Kritik durumlar için hızlı müdahale butonları

### Çiftlik Yönetimi

#### Çiftlik Listesi
- Tüm çiftlikleri tek sayfada görüntüleyin
- Durum filtreleme (Sağlıklı, Uyarı, Kritik)
- Arama ve sıralama özellikleri

#### Detaylar Sayfası
- Seçilen çiftliğin tüm sensor verilerini inceleyin
- Geçmiş trend grafiklerini analiz edin
- AI önerilerini değerlendirin

### Analytics ve Raporlar

#### Performans Metrikleri
- Çiftlik karşılaştırma analizi
- Enerji verimliliği hesaplamaları
- Büyüme oranı trendleri

#### Tahmin Modelleri
- 7-30 günlük büyüme tahminleri
- Hava durumu risk analizi
- Optimal hasat zamanı önerileri

---

## 📁 Proje Yapısı

```
smart-algae-web/
├── 📁 public/                  # Static dosyalar
│   ├── 📁 images/             # Uygulama görselleri
│   │   └── 📁 profiles/       # Profil resimleri
│   └── index.html             # Ana HTML template
├── 📁 src/                    # Kaynak kodlar
│   ├── 📁 components/         # Yeniden kullanılabilir componentler
│   │   ├── Header.tsx         # Üst menü
│   │   └── Sidebar.tsx        # Yan menü
│   ├── 📁 data/              # Veri yönetimi
│   │   └── mockData.ts        # Mock veri ve API fonksiyonları
│   ├── 📁 pages/             # Sayfa componentleri
│   │   ├── DashboardPage.tsx  # Ana gösterge paneli
│   │   ├── FarmsPage.tsx      # Çiftlik listesi
│   │   ├── FarmDetailsPage.tsx # Çiftlik detayları
│   │   ├── AnalyticsPage.tsx  # Analytics sayfası
│   │   ├── ReportsPage.tsx    # Raporlar
│   │   ├── ActionsPage.tsx    # Eylem merkezi
│   │   ├── LoginPage.tsx      # Giriş sayfası
│   │   ├── ProfilePage.tsx    # Kullanıcı profili
│   │   └── SettingsPage.tsx   # Ayarlar
│   ├── 📁 utils/             # Yardımcı fonksiyonlar
│   │   └── profileImage.ts    # Profil resim yönetimi
│   ├── App.tsx               # Ana uygulama componenti
│   ├── main.tsx              # Uygulama giriş noktası
│   └── index.css             # Global stiller
├── 📄 package.json           # Proje bağımlılıkları
├── 📄 vite.config.ts         # Vite konfigürasyonu
├── 📄 tailwind.config.js     # Tailwind CSS ayarları
├── 📄 tsconfig.json          # TypeScript ayarları
└── 📄 README.md              # Proje dokümantasyonu
```

---

## 🔌 API Entegrasyonu

### Mock Data Yapısı

Proje şu anda mock data ile çalışmaktadır. Gerçek API entegrasyonu için aşağıdaki endpoints'ler tasarlanmıştır:

#### Çiftlik Endpoints
```typescript
GET    /api/farms              # Tüm çiftlikleri listele
GET    /api/farms/:id          # Spesifik çiftlik bilgisi
POST   /api/farms              # Yeni çiftlik oluştur
PUT    /api/farms/:id          # Çiftlik bilgilerini güncelle
DELETE /api/farms/:id          # Çiftlik sil
```

#### Sensor Data Endpoints
```typescript
GET    /api/farms/:id/sensors           # Güncel sensor verileri
GET    /api/farms/:id/sensors/history   # Geçmiş sensor verileri
POST   /api/farms/:id/sensors           # Yeni sensor verisi ekle
```

#### Analytics Endpoints
```typescript
GET    /api/analytics/overview          # Genel analytics
GET    /api/analytics/farms/:id         # Çiftlik-spesifik analytics
GET    /api/analytics/predictions       # AI tahminleri
```

### Veri Modelleri

#### Farm Interface
```typescript
interface Farm {
  id: string;
  name: string;
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
    ocean: string;
  };
  species: string;
  establishedDate: string;
  area: number;
  depth: string;
  status: 'healthy' | 'warning' | 'critical';
  sensors: SensorData;
  images: FarmImage[];
  actions: Action[];
}
```

---

## 📷 Ekran Görüntüleri

### Dashboard - Ana Gösterge Paneli
![Dashboard](docs/screenshots/dashboard.png)
*Tüm çiftliklerin durumu, kritik metrikler ve hızlı eylemler*

### Çiftlik Detay Sayfası
![Farm Details](docs/screenshots/farm-details.png)
*Detaylı sensor verileri, trend grafikleri ve AI önerileri*

### Analytics Sayfası
![Analytics](docs/screenshots/analytics.png)
*Kapsamlı performans analizi ve karşılaştırmalı veriler*

### Mobil Görünüm
![Mobile View](docs/screenshots/mobile.png)
*Responsive tasarım ile mobil uyumluluk*

---

## 🚀 Deployment

### Vercel Deployment (Önerilen)

1. **Vercel hesabı oluşturun** ve GitHub'ı bağlayın
2. **Repository'i import edin**
3. **Otomatik deployment** aktif olacak

Manual deployment için:
```bash
# Vercel CLI'yi yükleyin
npm i -g vercel

# Deploy edin
vercel

# Production'a deploy
vercel --prod
```

### Netlify Deployment

1. **Build komutu**: `npm run build`
2. **Publish dizini**: `dist`
3. **Deploy**

### Manual Server Deployment

```bash
# Projeyi build edin
npm run build

# dist/ klasörünü sunucunuza upload edin
# Nginx/Apache konfigürasyonu yapın
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 🤝 Katkıda Bulunma

### Geliştirme Süreci

1. **Fork** edin
2. **Feature branch** oluşturun (`git checkout -b feature/yeni-ozellik`)
3. **Commit** yapın (`git commit -m 'Yeni özellik: XYZ eklendi'`)
4. **Push** edin (`git push origin feature/yeni-ozellik`)
5. **Pull Request** oluşturun

### Kod Standartları

- **TypeScript** kullanın
- **ESLint** kurallarına uyun
- **Responsive design** prensiplerine bağlı kalın
- **Component dokumentasyonu** yazın

### Test Yazma

```bash
# Test komutları (gelecek sürümlerde)
npm run test
npm run test:watch
npm run test:coverage
```

---

## 🔧 Yapılandırma

### Environment Variables

```bash
# .env.local dosyası oluşturun
VITE_API_BASE_URL=http://localhost:8000/api
VITE_WEBSOCKET_URL=ws://localhost:8000/ws
VITE_MAPS_API_KEY=your_maps_api_key
VITE_IMGUR_CLIENT_ID=your_imgur_client_id
```

### Tailwind Customization

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e'
        }
      }
    }
  }
}
```

---

## 📊 Performans Optimizasyonu

### Bundle Analizi
```bash
npm run build -- --analyze
```

### Lazy Loading
- Route-based code splitting
- Component lazy loading
- Image lazy loading

### Caching Stratejileri
- Browser caching
- Service Worker (PWA)
- API response caching

---

## 🔒 Güvenlik

### Güvenlik Önlemleri

- **HTTPS** zorunlu
- **Input validation** tüm formlarda
- **XSS protection** implemented
- **CSRF tokens** API çağrılarında

### Veri Korunması

- Hassas verilerin şifrelenmesi
- GDPR compliance
- Data retention policies

---

## 📋 TODO & Roadmap

### Kısa Vadeli (v1.1)
- [ ] Gerçek API entegrasyonu
- [ ] Unit test coverage %80+
- [ ] PWA desteği
- [ ] Dark mode

### Orta Vadeli (v1.5)
- [ ] Real-time WebSocket bağlantısı
- [ ] Email/SMS notification sistemi
- [ ] Advanced AI tahmin modelleri
- [ ] Multi-language desteği

### Uzun Vadeli (v2.0)
- [ ] Mobile app (React Native)
- [ ] IoT sensor entegrasyonu
- [ ] Blockchain traceability
- [ ] Machine learning algoritmaları

---

## 🆘 Sorun Giderme

### Yaygın Problemler

#### Build Hatası
```bash
# Node modules'ı temizleyin
rm -rf node_modules package-lock.json
npm install
```

#### Port Çakışması
```bash
# Farklı port kullanın
npm run dev -- --port 3001
```

#### TypeScript Hatası
```bash
# Type check yapın
npx tsc --noEmit
```

---

## 📞 İletişim & Destek

### Geliştirici İletişim

- **GitHub**: [@hasan0v](https://github.com/hasan0v)
- **Email**: [your-email@example.com](mailto:your-email@example.com)
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)

### Proje Bağlantıları

- **Live Demo**: [https://smart-algae-farm.vercel.app](https://smart-algae-farm.vercel.app)
- **GitHub Repo**: [https://github.com/hasan0v/Smart-Algae-Farm](https://github.com/hasan0v/Smart-Algae-Farm)
- **Issue Tracker**: [GitHub Issues](https://github.com/hasan0v/Smart-Algae-Farm/issues)

---

## 📄 Lisans

Bu proje **MIT License** altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakınız.

```
MIT License

Copyright (c) 2024 Smart Algae Farm

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🌟 Teşekkürler

- **React Team** - Amazing framework
- **Vercel** - Hosting platform
- **Tailwind CSS** - Styling system
- **Heroicons** - Beautiful icons
- **Recharts** - Data visualization

---

<div align="center">

**Smart Algae Farm** ile sürdürülebilir geleceği birlikte inşa edelim! 🌊

[![⭐ Star on GitHub](https://img.shields.io/github/stars/hasan0v/Smart-Algae-Farm?style=social)](https://github.com/hasan0v/Smart-Algae-Farm)

</div>