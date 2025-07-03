import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { mockFarms } from '../data/mockData';

export const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('7g');
  const [selectedMetric, setSelectedMetric] = useState('sicaklik');

  const metrics = [
    { id: 'sicaklik', name: 'Sıcaklık', unit: '°C', color: 'orange' },
    { id: 'ph', name: 'pH Seviyesi', unit: '', color: 'blue' },
    { id: 'cozunmusOksijen', name: 'Çözünmüş Oksijen', unit: 'mg/L', color: 'green' },
    { id: 'tuzluluk', name: 'Tuzluluk', unit: '‰', color: 'purple' },
    { id: 'buyume', name: 'Büyüme Oranı', unit: '%', color: 'emerald' }
  ];

  const timeRanges = [
    { id: '24s', name: '24 Saat' },
    { id: '7g', name: '7 Gün' },
    { id: '30g', name: '30 Gün' },
    { id: '90g', name: '90 Gün' }
  ];

  // Generate mock data for charts
  const generateChartData = (metric: string, range: string) => {
    const points = range === '24s' ? 24 : range === '7g' ? 7 : range === '30g' ? 30 : 90;
    return Array.from({length: points}, (_, i) => {
      let baseValue = 20;
      if (metric === 'sicaklik') baseValue = mockFarms[0].sensors.temperature.value;
      else if (metric === 'ph') baseValue = mockFarms[0].sensors.ph.value;
      else if (metric === 'cozunmusOksijen') baseValue = mockFarms[0].sensors.dissolvedOxygen.value;
      else if (metric === 'tuzluluk') baseValue = mockFarms[0].sensors.salinity.value;
      else if (metric === 'buyume') baseValue = mockFarms[0].sensors.growth.value;
      
      return {
        time: i,
        value: baseValue + (Math.random() - 0.5) * 5,
        farm: mockFarms[i % mockFarms.length].name
      };
    });
  };

  const chartData = generateChartData(selectedMetric, timeRange);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 sm:space-y-8"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Analitik Kontrol Paneli</h1>
          <p className="text-slate-600 text-sm sm:text-base">Alg çiftlikleriniz için detaylı analizler ve trendler</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm sm:text-base"
          >
            {timeRanges.map(range => (
              <option key={range.id} value={range.id}>{range.name}</option>
            ))}
          </select>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 text-sm sm:text-base">
            <FunnelIcon className="w-4 h-4" />
            <span>Filtrele</span>
          </button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <ArrowTrendingUpIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-green-600 text-xs sm:text-sm font-medium">+%15.2</span>
          </div>
          <h3 className="text-xs sm:text-sm font-medium text-slate-600">Genel Büyüme</h3>
          <p className="text-xl sm:text-2xl font-bold text-slate-800">%12.8</p>
          <p className="text-xs text-slate-500 mt-1">önceki döneme göre</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">💧</span>
            </div>
            <span className="text-blue-600 text-sm font-medium">Optimal</span>
          </div>
          <h3 className="text-sm font-medium text-slate-600">Su Kalitesi</h3>
          <p className="text-2xl font-bold text-slate-800">%94.2</p>
          <p className="text-xs text-slate-500 mt-1">Kalite indeksi</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">⚡</span>
            </div>
            <span className="text-orange-600 text-sm font-medium">-%5.3</span>
          </div>
          <h3 className="text-sm font-medium text-slate-600">Enerji Kullanımı</h3>
          <p className="text-2xl font-bold text-slate-800">1,247 kWh</p>
          <p className="text-xs text-slate-500 mt-1">Bu ay</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">📈</span>
            </div>
            <span className="text-purple-600 text-sm font-medium">+%8.7</span>
          </div>
          <h3 className="text-sm font-medium text-slate-600">Gelir</h3>
          <p className="text-2xl font-bold text-slate-800">₺184,350</p>
          <p className="text-xs text-slate-500 mt-1">Bu ay</p>
        </motion.div>
      </div>

      {/* Main Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Trend Analizi</h3>
          <div className="flex space-x-2">
            {metrics.map(metric => (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={`px-3 py-1 text-sm rounded-lg transition-all ${
                  selectedMetric === metric.id
                    ? 'bg-blue-100 text-blue-800'
                    : 'text-slate-600 hover:bg-gray-100'
                }`}
              >
                {metric.name}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Area */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-slate-800">
              {metrics.find(m => m.id === selectedMetric)?.name} Trendleri
            </h4>
            <span className="text-sm text-slate-600">
              {timeRange === '24s' ? 'Son 24 Saat' : 
               timeRange === '7g' ? 'Son 7 Gün' :
               timeRange === '30g' ? 'Son 30 Gün' : 'Son 90 Gün'}
            </span>
          </div>
          
          <div className="flex items-end justify-between h-48 space-x-1">
            {chartData.map((point, index) => {
              const height = Math.max(10, (point.value / 30) * 100);
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-500 cursor-pointer hover:opacity-75 ${
                      selectedMetric === 'sicaklik' ? 'bg-gradient-to-t from-orange-500 to-orange-300' :
                      selectedMetric === 'ph' ? 'bg-gradient-to-t from-blue-500 to-blue-300' :
                      selectedMetric === 'cozunmusOksijen' ? 'bg-gradient-to-t from-green-500 to-green-300' :
                      selectedMetric === 'tuzluluk' ? 'bg-gradient-to-t from-purple-500 to-purple-300' :
                      'bg-gradient-to-t from-emerald-500 to-emerald-300'
                    }`}
                    style={{height: `${height}%`}}
                    title={`${point.value.toFixed(1)}${metrics.find(m => m.id === selectedMetric)?.unit}`}
                  ></div>
                  {index % Math.ceil(chartData.length / 8) === 0 && (
                    <span className="text-xs text-slate-500 mt-2">
                      {timeRange === '24s' ? `${index}:00` : 
                       timeRange === '7g' ? ['P', 'P', 'S', 'Ç', 'P', 'C', 'C'][index] :
                       index % 5 === 0 ? `Gün ${index + 1}` : ''}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Farm Comparison */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Çiftlik Performans Karşılaştırması</h3>
          <div className="space-y-4">
            {mockFarms.slice(0, 4).map((farm, index) => {
              const performance = 85 + Math.random() * 15;
              return (
                <div key={farm.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 bg-gradient-to-br ${
                      index % 4 === 0 ? 'from-blue-500 to-green-500' :
                      index % 4 === 1 ? 'from-yellow-500 to-orange-500' :
                      index % 4 === 2 ? 'from-red-500 to-pink-500' :
                      'from-purple-500 to-indigo-500'
                    } rounded-lg flex items-center justify-center`}>
                      <span className="text-white text-xs font-bold">{farm.name.charAt(0)}</span>
                    </div>
                    <span className="font-medium text-slate-800">{farm.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                        style={{width: `${performance}%`}}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-slate-800 w-12">%{performance.toFixed(0)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tahmine Dayalı Analiz</h3>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-blue-600 text-xl">🔮</span>
                <h4 className="font-medium text-blue-800">Büyüme Tahmini</h4>
              </div>
              <p className="text-sm text-blue-700">Mevcut trendlere dayalı olarak önümüzdeki 30 günde %18 büyüme artışı bekleniyor.</p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-green-600 text-xl">🌱</span>
                <h4 className="font-medium text-green-800">Hasat Tahmini</h4>
              </div>
              <p className="text-sm text-green-700">Gelecek hafta optimal hasat penceresi öngörülüyor. Tahmini verim: 2.3 ton.</p>
            </div>
            
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-yellow-600 text-xl">⚠️</span>
                <h4 className="font-medium text-yellow-800">Hava Durumu Uyarısı</h4>
              </div>
              <p className="text-sm text-yellow-700">Fırtına sistemi yaklaşıyor. Çiftlik C için koruyucu önlemler düşünün.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Data Export */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Veri Dışa Aktarma ve Raporlar</h3>
            <p className="text-slate-600">Analitik verilerinizi daha fazla analiz veya raporlama için dışa aktarın.</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              CSV Dışa Aktar
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Rapor Oluştur
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
