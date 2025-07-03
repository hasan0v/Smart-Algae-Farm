import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  DocumentTextIcon,
  ChartBarIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  PrinterIcon,
  FunnelIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { mockFarms } from '../data/mockData';

interface Report {
  id: string;
  title: string;
  description: string;
  type: 'performans' | 'finansal' | 'cevre' | 'uyumluluk' | 'bakim';
  category: 'gunluk' | 'haftalik' | 'aylik' | 'ucaylik' | 'yillik';
  status: 'taslak' | 'bekleyen' | 'tamamlandi' | 'arsivlendi';
  generatedDate: string;
  period: string;
  size: string;
  downloadCount: number;
  farms: string[];
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Aylık Performans Genel Bakışı',
    description: 'Aralık 2023 için tüm çiftlik performans metriklerinin kapsamlı analizi',
    type: 'performans',
    category: 'aylik',
    status: 'tamamlandi',
    generatedDate: '2024-01-01',
    period: 'Aralık 2023',
    size: '2.4 MB',
    downloadCount: 15,
    farms: ['Okyanus Çiftliği Alpha', 'Yeşil Dalga Tesisi', 'Kıyı Alg Laboratuvarı']
  },
  {
    id: '2',
    title: 'Haftalık Çevresel Etki Raporu',
    description: 'Karbon ayak izi ve çevresel etki değerlendirmesi',
    type: 'cevre',
    category: 'haftalik',
    status: 'tamamlandi',
    generatedDate: '2024-01-08',
    period: 'Hafta 1, 2024',
    size: '1.8 MB',
    downloadCount: 8,
    farms: ['Deniz Araştırma Merkezi', 'Okyanus Çiftliği Alpha']
  },
  {
    id: '3',
    title: 'Finansal Özet 4. Çeyrek 2023',
    description: '4. çeyrek için gelir, maliyet ve karlılık analizi',
    type: 'finansal',
    category: 'ucaylik',
    status: 'bekleyen',
    generatedDate: '2024-01-10',
    period: '4. Çeyrek 2023',
    size: '3.1 MB',
    downloadCount: 0,
    farms: ['Tüm Çiftlikler']
  },
  {
    id: '4',
    title: 'Uyumluluk Denetim Raporu',
    description: 'Düzenleyici uyumluluk ve sertifikasyon durumu',
    type: 'uyumluluk',
    category: 'yillik',
    status: 'taslak',
    generatedDate: '2024-01-12',
    period: '2023',
    size: '5.2 MB',
    downloadCount: 3,
    farms: ['Tüm Çiftlikler']
  },
  {
    id: '5',
    title: 'Ekipman Bakım Kaydı',
    description: 'Detaylı bakım kayıtları ve ekipman durumu',
    type: 'bakim',
    category: 'aylik',
    status: 'tamamlandi',
    generatedDate: '2024-01-05',
    period: 'Aralık 2023',
    size: '1.2 MB',
    downloadCount: 12,
    farms: ['Yeşil Dalga Tesisi', 'Deniz Araştırma Merkezi']
  }
];

export const ReportsPage = () => {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [filterType, setFilterType] = useState('tumunu');
  const [filterCategory, setFilterCategory] = useState('tumunu');
  const [filterStatus, setFilterStatus] = useState('tumunu');
  const [sortBy, setSortBy] = useState('uretimTarihi');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'performans': return 'text-blue-600 bg-blue-100';
      case 'finansal': return 'text-green-600 bg-green-100';
      case 'cevre': return 'text-emerald-600 bg-emerald-100';
      case 'uyumluluk': return 'text-purple-600 bg-purple-100';
      case 'bakim': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'tamamlandi': return 'text-green-600 bg-green-100';
      case 'bekleyen': return 'text-yellow-600 bg-yellow-100';
      case 'taslak': return 'text-gray-600 bg-gray-100';
      case 'arsivlendi': return 'text-slate-600 bg-slate-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'performans': return '📊';
      case 'finansal': return '💰';
      case 'cevre': return '🌱';
      case 'uyumluluk': return '✅';
      case 'bakim': return '🔧';
      default: return '📄';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'performans': return 'Performans';
      case 'finansal': return 'Finansal';
      case 'cevre': return 'Çevresel';
      case 'uyumluluk': return 'Uyumluluk';
      case 'bakim': return 'Bakım';
      default: return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'tamamlandi': return 'Tamamlandı';
      case 'bekleyen': return 'Bekleyen';
      case 'taslak': return 'Taslak';
      case 'arsivlendi': return 'Arşivlendi';
      default: return status;
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesType = filterType === 'tumunu' || report.type === filterType;
    const matchesCategory = filterCategory === 'tumunu' || report.category === filterCategory;
    const matchesStatus = filterStatus === 'tumunu' || report.status === filterStatus;
    return matchesType && matchesCategory && matchesStatus;
  });

  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortBy === 'uretimTarihi') return new Date(b.generatedDate).getTime() - new Date(a.generatedDate).getTime();
    if (sortBy === 'baslik') return a.title.localeCompare(b.title);
    if (sortBy === 'indirmeler') return b.downloadCount - a.downloadCount;
    return 0;
  });

  const generateNewReport = () => {
    const newReport: Report = {
      id: (reports.length + 1).toString(),
      title: 'Yeni Özel Rapor',
      description: 'Mevcut verilere dayalı olarak oluşturuldu',
      type: 'performans',
      category: 'aylik',
      status: 'bekleyen',
      generatedDate: new Date().toISOString().split('T')[0],
      period: 'Mevcut Dönem',
      size: '0 MB',
      downloadCount: 0,
      farms: ['Tüm Çiftlikler']
    };
    setReports(prev => [newReport, ...prev]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 sm:space-y-8"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Raporlar ve Analitik</h1>
          <p className="text-slate-600 text-sm sm:text-base">Kapsamlı çiftlik raporları oluşturun, görüntüleyin ve yönetin</p>
        </div>
        <button 
          onClick={generateNewReport}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <DocumentTextIcon className="w-5 h-5" />
          <span>Rapor Oluştur</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">📊</span>
            <span className="text-2xl font-bold text-slate-800">{reports.length}</span>
          </div>
          <h3 className="text-sm font-medium text-slate-600">Toplam Raporlar</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">✅</span>
            <span className="text-2xl font-bold text-green-600">
              {reports.filter(r => r.status === 'tamamlandi').length}
            </span>
          </div>
          <h3 className="text-sm font-medium text-slate-600">Tamamlandı</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">⏳</span>
            <span className="text-2xl font-bold text-yellow-600">
              {reports.filter(r => r.status === 'bekleyen').length}
            </span>
          </div>
          <h3 className="text-sm font-medium text-slate-600">Bekleyen</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">📥</span>
            <span className="text-2xl font-bold text-blue-600">
              {reports.reduce((sum, r) => sum + r.downloadCount, 0)}
            </span>
          </div>
          <h3 className="text-sm font-medium text-slate-600">İndirmeler</h3>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="tumunu">Tüm Türler</option>
              <option value="performans">Performans</option>
              <option value="finansal">Finansal</option>
              <option value="cevre">Çevresel</option>
              <option value="uyumluluk">Uyumluluk</option>
              <option value="bakim">Bakım</option>
            </select>
            
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="tumunu">Tüm Dönemler</option>
              <option value="gunluk">Günlük</option>
              <option value="haftalik">Haftalık</option>
              <option value="aylik">Aylık</option>
              <option value="ucaylik">Üç Aylık</option>
              <option value="yillik">Yıllık</option>
            </select>

            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="tumunu">Tüm Durumlar</option>
              <option value="tamamlandi">Tamamlandı</option>
              <option value="bekleyen">Bekleyen</option>
              <option value="taslak">Taslak</option>
              <option value="arsivlendi">Arşivlendi</option>
            </select>
          </div>
          
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="uretimTarihi">Tarihe Göre Sırala</option>
            <option value="baslik">Başlığa Göre Sırala</option>
            <option value="indirmeler">İndirmelere Göre Sırala</option>
          </select>
        </div>
      </motion.div>

      {/* Report Templates */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Hızlı Rapor Şablonları</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all text-left">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">📊</span>
              <h4 className="font-medium text-slate-800">Performans Özeti</h4>
            </div>
            <p className="text-sm text-slate-600">Mevcut çiftlik performans metriklerini oluştur</p>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all text-left">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">💰</span>
              <h4 className="font-medium text-slate-800">Finansal Genel Bakış</h4>
            </div>
            <p className="text-sm text-slate-600">Gelir ve maliyet analizi raporu</p>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-all text-left">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">🌱</span>
              <h4 className="font-medium text-slate-800">Çevresel Etki</h4>
            </div>
            <p className="text-sm text-slate-600">Sürdürülebilirlik ve etki değerlendirmesi</p>
          </button>
        </div>
      </motion.div>

      {/* Reports List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-4"
      >
        {sortedReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="text-3xl">{getTypeIcon(report.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-800">{report.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                      {getTypeLabel(report.type)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {getStatusLabel(report.status)}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 mb-3">{report.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-slate-500 text-sm">Dönem:</span>
                      <p className="font-medium text-slate-800">{report.period}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-sm">Oluşturuldu:</span>
                      <p className="font-medium text-slate-800">{report.generatedDate}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-sm">Boyut:</span>
                      <p className="font-medium text-slate-800">{report.size}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-sm">İndirmeler:</span>
                      <p className="font-medium text-slate-800">{report.downloadCount}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-slate-500 text-sm">Çiftlikler:</span>
                    <div className="flex flex-wrap gap-1">
                      {report.farms.map((farm, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {farm}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {report.status === 'tamamlandi' && (
                  <>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Raporu Görüntüle">
                      <EyeIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="İndir">
                      <ArrowDownTrayIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Yazdır">
                      <PrinterIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Paylaş">
                      <ShareIcon className="w-5 h-5" />
                    </button>
                  </>
                )}
                {report.status === 'bekleyen' && (
                  <div className="flex items-center space-x-2 text-yellow-600">
                    <div className="animate-spin w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full"></div>
                    <span className="text-sm">Oluşturuluyor...</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {sortedReports.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-12 border border-white/30 shadow-lg text-center"
        >
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Hiçbir rapor bulunamadı</h3>
          <p className="text-slate-600 mb-6">Filtre kriterlerinizi ayarlamayı deneyin veya yeni bir rapor oluşturun</p>
          <button 
            onClick={generateNewReport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            İlk Raporu Oluştur
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};
