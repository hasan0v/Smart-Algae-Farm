import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  ArrowLeftIcon,
  MapPinIcon,
  CalendarIcon,
  ChartBarIcon,
  CameraIcon,
  BellIcon,
  PlayIcon,
  PauseIcon
} from '@heroicons/react/24/outline';
import { Farm, generateSimpleTrendData } from '../data/mockData';

interface FarmDetailsPageProps {
  farm: Farm;
  onBack: () => void;
}

export const FarmDetailsPage = ({ farm, onBack }: FarmDetailsPageProps) => {
  const [activeTab, setActiveTab] = useState('genel-bakis');
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [keyMetrics, setKeyMetrics] = useState<any>(null);

  useEffect(() => {
    // Generate performance data for the 7-day trend
    const trendData = generateSimpleTrendData('buyume', '7g');
    setPerformanceData(trendData);

    // Generate key metrics based on farm status and sensor data
    const metrics = {
      averageGrowth: farm.sensors.growth.value,
      efficiency: farm.status === 'healthy' ? 94.2 : farm.status === 'warning' ? 78.5 : 62.3,
      healthIndex: farm.status === 'healthy' ? 8.7 : farm.status === 'warning' ? 6.8 : 4.2,
      estimatedHarvest: farm.area * (farm.sensors.growth.value / 2.1) * 1.8, // Base calculation
      waterQuality: (farm.sensors.ph.value + farm.sensors.dissolvedOxygen.value + farm.sensors.salinity.value) / 3 * 10,
      energyEfficiency: 85 + Math.random() * 10
    };
    setKeyMetrics(metrics);
  }, [farm]);
  const [isMonitoring, setIsMonitoring] = useState(true);

  const tabs = [
    { id: 'genel-bakis', name: 'Genel Bakış', icon: '📊' },
    { id: 'sensorler', name: 'Sensörler', icon: '🔬' },
    { id: 'goruntuler', name: 'Görüntüler', icon: '📸' },
    { id: 'islemler', name: 'İşlemler', icon: '⚡' },
    { id: 'analitik', name: 'Analitik', icon: '📈' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors self-start"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="text-sm sm:text-base">Çiftliklere Geri Dön</span>
          </button>
          <div className="hidden sm:block h-6 w-px bg-slate-300"></div>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">{farm.name}</h1>
            <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium self-start ${
              farm.status === 'healthy' ? 'bg-green-100 text-green-800' :
              farm.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {farm.status === 'healthy' ? '✅ Sağlıklı' :
               farm.status === 'warning' ? '⚠️ Uyarı' :
               '🔴 Kritik'}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm ${
              isMonitoring 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isMonitoring ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
            <span className="hidden sm:inline">{isMonitoring ? 'İzlemeyi Duraklat' : 'İzlemeyi Devam Ettir'}</span>
            <span className="sm:hidden">{isMonitoring ? 'Duraklat' : 'Devam Et'}</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm">
            <BellIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Uyarı Ayarla</span>
            <span className="sm:hidden">Uyarı</span>
          </button>
        </div>
      </div>

      {/* Farm Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        <div className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg">
          <div className="flex items-center space-x-3 mb-3">
            <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <span className="font-medium text-slate-800 text-sm sm:text-base">Konum</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-1">{farm.location.address}</p>
          <p className="text-xs text-slate-500">{farm.location.ocean}</p>
          <p className="text-xs text-slate-500">
            {farm.location.coordinates.lat.toFixed(4)}, {farm.location.coordinates.lng.toFixed(4)}
          </p>
        </div>

        <div className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg">
          <div className="flex items-center space-x-3 mb-3">
            <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            <span className="font-medium text-slate-800 text-sm sm:text-base">Kuruluş Tarihi</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-1">
            {new Date(farm.establishedDate).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="text-xs text-slate-500">
            {Math.floor((Date.now() - new Date(farm.establishedDate).getTime()) / (1000 * 60 * 60 * 24))} gün önce
          </p>
        </div>

        <div className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-purple-500 text-lg sm:text-xl">🌱</span>
            <span className="font-medium text-slate-800 text-sm sm:text-base">Tür</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-1">{farm.species}</p>
          <p className="text-xs text-slate-500">Optimal koşullar</p>
        </div>

        <div className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-orange-500 text-lg sm:text-xl">📏</span>
            <span className="font-medium text-slate-800 text-sm sm:text-base">Çiftlik Boyutu</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-1">{farm.area} hektar</p>
          <p className="text-xs text-slate-500">Derinlik: {farm.depth}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="glass-effect rounded-2xl border border-white/30 shadow-lg">
        <div className="flex border-b border-slate-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 font-medium transition-all whitespace-nowrap text-sm sm:text-base ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === 'genel-bakis' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Real-time Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Gerçek Zamanlı Metrikler</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-800">pH Seviyesi</span>
                      <span className="text-blue-600 text-xl">🧪</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-blue-900">{farm.sensors.ph.value}</div>
                    <div className="text-xs text-blue-600 mb-2">{farm.sensors.ph.status === 'optimal' ? 'Optimal' : farm.sensors.ph.status === 'warning' ? 'Uyarı' : 'Kritik'}</div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                        style={{width: `${(farm.sensors.ph.value / 14) * 100}%`}}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-orange-800">Sıcaklık</span>
                      <span className="text-orange-600 text-xl">🌡️</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-orange-900">{farm.sensors.temperature.value}°C</div>
                    <div className="text-xs text-orange-600 mb-2">{farm.sensors.temperature.status === 'optimal' ? 'Optimal' : farm.sensors.temperature.status === 'warning' ? 'Uyarı' : 'Kritik'}</div>
                    <div className="w-full bg-orange-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full transition-all duration-500" 
                        style={{width: `${(farm.sensors.temperature.value / 30) * 100}%`}}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-800">Çözünmüş O2</span>
                      <span className="text-green-600 text-xl">💧</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-green-900">{farm.sensors.dissolvedOxygen.value}mg/L</div>
                    <div className="text-xs text-green-600 mb-2">{farm.sensors.dissolvedOxygen.status === 'optimal' ? 'Optimal' : farm.sensors.dissolvedOxygen.status === 'warning' ? 'Uyarı' : 'Kritik'}</div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-500" 
                        style={{width: `${(farm.sensors.dissolvedOxygen.value / 15) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Ek Parametreler</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-700">Tuzluluk</span>
                      <span className="text-lg font-bold text-slate-800">{farm.sensors.salinity.value}‰</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-700">Büyüme Oranı</span>
                      <span className="text-lg font-bold text-green-600">{farm.sensors.growth.value}%</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-700">Uzunluk</span>
                      <span className="text-lg font-bold text-slate-800">{farm.sensors.length.value}cm</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'sensorler' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-slate-800">Sensör Detayları ve Geçmişi</h3>
              <div className="space-y-4">
                {Object.entries(farm.sensors).map(([key, sensor]) => (
                  <div key={key} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <h4 className="font-medium text-slate-800 capitalize text-sm sm:text-base">
                        {key === 'ph' ? 'pH Seviyesi' :
                         key === 'temperature' ? 'Sıcaklık' :
                         key === 'dissolvedOxygen' ? 'Çözünmüş Oksijen' :
                         key === 'salinity' ? 'Tuzluluk' :
                         key === 'growth' ? 'Büyüme Oranı' :
                         key === 'length' ? 'Uzunluk' :
                         key}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        sensor.status === 'optimal' ? 'bg-green-100 text-green-800' :
                        sensor.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {sensor.status === 'optimal' ? 'Optimal' : sensor.status === 'warning' ? 'Uyarı' : 'Kritik'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Mevcut Değer:</span>
                        <p className="font-medium text-slate-800">{sensor.value}{key === 'temperature' ? '°C' : key === 'ph' ? '' : key.includes('oxygen') ? 'mg/L' : key === 'salinity' ? '‰' : key === 'length' ? 'cm' : '%'}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Durum:</span>
                        <p className="font-medium text-slate-800">{sensor.status === 'optimal' ? 'Optimal' : sensor.status === 'warning' ? 'Uyarı' : 'Kritik'}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Son Güncelleme:</span>
                        <p className="font-medium text-slate-800">{new Date(sensor.lastUpdate).toLocaleTimeString('tr-TR')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'goruntuler' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">Çiftlik Görüntüleri</h3>
                <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  <CameraIcon className="w-4 h-4" />
                  <span>Yeni Görüntü Al</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {farm.images.map((image) => (
                  <div key={image.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg mb-3 overflow-hidden">
                      <img 
                        src={image.url} 
                        alt={image.description}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center" style={{display: 'none'}}>
                        <CameraIcon className="w-8 h-8 text-slate-400" />
                      </div>
                    </div>
                    <p className="font-medium text-slate-800 mb-1">{image.description}</p>
                    <p className="text-sm text-slate-500">{new Date(image.timestamp).toLocaleString('tr-TR')}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'islemler' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-slate-800">Önerilen İşlemler</h3>
              <div className="space-y-4">
                {farm.actions.map((action) => (
                  <div key={action.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-slate-800">{action.type}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        action.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        action.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {action.status === 'pending' ? 'Bekleyen' : action.status === 'completed' ? 'Tamamlandı' : action.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{action.description}</p>
                    <p className="text-sm text-blue-600 mb-3">{action.aiSuggestion}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{new Date(action.timestamp).toLocaleString('tr-TR')}</span>
                      {action.confidence && (
                        <span className="text-xs text-green-600 font-medium">AI Güveni: {action.confidence}%</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'analitik' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Performans Analitiği</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h4 className="font-medium text-slate-800 mb-3">7 Günlük Trend</h4>
                  <div className="flex items-end justify-between h-32 space-x-2">
                    {performanceData.map((point, i) => {
                      const maxValue = Math.max(...performanceData.map(p => p.value));
                      const minValue = Math.min(...performanceData.map(p => p.value));
                      const range = maxValue - minValue;
                      const normalizedValue = range > 0 ? ((point.value - minValue) / range) : 0.5;
                      const height = Math.max(20, normalizedValue * 80 + 15);
                      
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center group relative">
                          <div 
                            className={`w-full rounded-t-lg transition-all duration-500 cursor-pointer hover:opacity-75 ${
                              farm.status === 'healthy' ? 'bg-gradient-to-t from-green-500 to-green-300' :
                              farm.status === 'warning' ? 'bg-gradient-to-t from-yellow-500 to-yellow-300' :
                              'bg-gradient-to-t from-red-500 to-red-300'
                            }`}
                            style={{height: `${height}%`}}
                          >
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                              {point.value.toFixed(1)}% büyüme
                              <div className="text-xs text-gray-300">{point.time}</div>
                            </div>
                          </div>
                          <span className="text-xs text-slate-500 mt-2">
                            {point.time}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h4 className="font-medium text-slate-800 mb-3">Anahtar Metrikler</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Ort. Büyüme Oranı</span>
                      <span className={`font-bold ${
                        keyMetrics?.averageGrowth > 2 ? 'text-green-600' : 
                        keyMetrics?.averageGrowth > 1 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {keyMetrics?.averageGrowth > 0 ? '+' : ''}{keyMetrics?.averageGrowth?.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Verimlilik Skoru</span>
                      <span className={`font-bold ${
                        keyMetrics?.efficiency > 85 ? 'text-green-600' : 
                        keyMetrics?.efficiency > 70 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {keyMetrics?.efficiency?.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Sağlık İndeksi</span>
                      <span className={`font-bold ${
                        keyMetrics?.healthIndex > 7 ? 'text-green-600' : 
                        keyMetrics?.healthIndex > 5 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {keyMetrics?.healthIndex?.toFixed(1)}/10
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Tahmin Edilen Hasat</span>
                      <span className="font-bold text-blue-600">
                        {keyMetrics?.estimatedHarvest?.toFixed(1)} ton
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Su Kalitesi</span>
                      <span className={`font-bold ${
                        keyMetrics?.waterQuality > 80 ? 'text-green-600' : 
                        keyMetrics?.waterQuality > 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {keyMetrics?.waterQuality?.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Enerji Verimliliği</span>
                      <span className="font-bold text-purple-600">
                        {keyMetrics?.energyEfficiency?.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
