import { motion } from 'framer-motion';
import { 
  BuildingOffice2Icon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  MapIcon
} from '@heroicons/react/24/outline';
import { mockFarms } from '../data/mockData';

interface DashboardPageProps {
  onFarmSelect: (farmId: string) => void;
}

export const DashboardPage = ({ onFarmSelect }: DashboardPageProps) => {
  const totalFarms = mockFarms.length;
  const healthyFarms = mockFarms.filter(farm => farm.status === 'healthy').length;
  const alertFarms = mockFarms.filter(farm => farm.status === 'warning' || farm.status === 'critical').length;
  const avgTemperature = mockFarms.reduce((sum, farm) => {
    return sum + farm.sensors.temperature.value;
  }, 0) / mockFarms.length;

  const totalArea = mockFarms.reduce((sum, farm) => sum + farm.area, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl lg:text-3xl font-bold gradient-text mb-2">Kontrol Paneli Özeti</h1>
        <p className="text-slate-600 text-sm lg:text-base">Alg çiftliklerinizi izleyin ve kritik metrikleri takip edin</p>
      </motion.div>

      {/* System Overview Cards */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6"
      >
        <div className="glass-effect rounded-2xl p-4 lg:p-6 border border-white/30 shadow-lg card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-slate-600">Toplam Çiftlik</p>
              <p className="text-xl lg:text-2xl font-bold text-slate-800">{totalFarms}</p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <BuildingOffice2Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs lg:text-sm">
            <span className="text-green-600 font-medium">↗ 2 yeni</span>
            <span className="text-slate-500 ml-1">bu ay</span>
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-4 lg:p-6 border border-white/30 shadow-lg card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-slate-600">Aktif Uyarılar</p>
              <p className="text-xl lg:text-2xl font-bold text-red-600">{alertFarms}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <ExclamationTriangleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs sm:text-sm">
            <span className="text-red-600 font-medium">Dikkat gerekiyor</span>
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-600">Sağlıklı Çiftlikler</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">{healthyFarms}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs sm:text-sm">
            <span className="text-green-600 font-medium">{Math.round((healthyFarms/totalFarms)*100)}%</span>
            <span className="text-slate-500 ml-1">optimal</span>
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-600">Ort. Sıcaklık</p>
              <p className="text-xl sm:text-2xl font-bold text-slate-800">{avgTemperature.toFixed(1)}°C</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg sm:text-xl">🌡️</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs sm:text-sm">
            <span className="text-green-600 font-medium">Aralık içinde</span>
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-600">Toplam Alan</p>
              <p className="text-xl sm:text-2xl font-bold text-slate-800">{totalArea}ha</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <MapIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs sm:text-sm">
            <span className="text-blue-600 font-medium">{totalFarms} lokasyon</span>
          </div>
        </div>
      </motion.div>

      {/* Critical Alerts */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <div className="glass-effect rounded-2xl p-4 sm:p-6 border border-red-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-slate-800">🚨 Kritik Uyarılar</h3>
            <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium">Tümünü Görüntüle →</button>
          </div>
          <div className="space-y-3">
            {mockFarms.filter(farm => farm.status === 'warning' || farm.status === 'critical').map(farm => (
              <div 
                key={farm.id}
                className={`bg-gradient-to-r ${
                  farm.status === 'critical' ? 'from-red-50 to-orange-50 border-red-200' : 'from-yellow-50 to-orange-50 border-yellow-200'
                } border rounded-xl p-3 sm:p-4 cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => onFarmSelect(farm.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2 sm:space-x-3 flex-1">
                    <div className={`w-2 h-2 ${farm.status === 'critical' ? 'bg-red-500' : 'bg-yellow-500'} rounded-full animate-pulse flex-shrink-0 mt-2`}></div>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-800 text-sm sm:text-base">{farm.name}: {farm.status === 'critical' ? 'Kritik sorun tespit edildi' : 'Parametre uyarısı'}</p>
                      <p className="text-xs sm:text-sm text-slate-600 truncate">{farm.location.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-slate-800">🎯 Son İşlemler</h3>
            <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium">İşlem Merkezi →</button>
          </div>
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-blue-50 to-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2 sm:space-x-3 flex-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800 text-sm sm:text-base">Çiftlik A: Besin Ayarlaması</p>
                    <p className="text-xs sm:text-sm text-slate-600">Durum: Bekleyen (AI Güveni: %94)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-50 border border-green-200 rounded-xl p-3 sm:p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2 sm:space-x-3 flex-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800 text-sm sm:text-base">Çiftlik D: Hasat Tamamlandı</p>
                    <p className="text-xs sm:text-sm text-slate-600">Sonuç: 2.1 ton başarıyla hasat edildi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Real-time Monitoring */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="xl:col-span-2 glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-slate-800">📈 Gerçek Zamanlı İzleme</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm text-slate-600">Canlı</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="text-xl sm:text-2xl mb-2">🌊</div>
              <div className="text-xs text-blue-600 mb-1">Su Kalitesi</div>
              <div className="text-sm sm:text-lg font-bold text-blue-800">Mükemmel</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="text-xl sm:text-2xl mb-2">🌱</div>
              <div className="text-xs text-green-600 mb-1">Büyüme Oranı</div>
              <div className="text-sm sm:text-lg font-bold text-green-800">+%12</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
              <div className="text-xl sm:text-2xl mb-2">⚡</div>
              <div className="text-xs text-yellow-600 mb-1">Enerji Kullanımı</div>
              <div className="text-sm sm:text-lg font-bold text-yellow-800">2.1kWh</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <div className="text-xl sm:text-2xl mb-2">🎯</div>
              <div className="text-xs text-purple-600 mb-1">Verimlilik</div>
              <div className="text-sm sm:text-lg font-bold text-purple-800">%94.2</div>
            </div>
          </div>

          {/* Live Chart Simulation */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-3 sm:p-4 border border-slate-200">
            <h4 className="font-medium text-slate-800 mb-3 text-sm sm:text-base">Sıcaklık Trendleri (Son 24 Saat)</h4>
            <div className="flex items-end justify-between h-16 sm:h-20 space-x-1">
              {Array.from({length: 24}, (_, i) => {
                const height = Math.sin(i * 0.3) * 20 + 40 + Math.random() * 10;
                return (
                  <div 
                    key={i}
                    className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-sm flex-1 animate-pulse"
                    style={{height: `${height}%`}}
                  ></div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>00:00</span>
              <span className="hidden sm:inline">06:00</span>
              <span>12:00</span>
              <span className="hidden sm:inline">18:00</span>
              <span>24:00</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Weather Integration */}
          <div className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg">
            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-4">🌤️ Hava Durumu Etkisi</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <span className="text-xl sm:text-2xl">☀️</span>
                  <div>
                    <p className="font-medium text-slate-800 text-sm sm:text-base">Güneşli</p>
                    <p className="text-xs sm:text-sm text-slate-600">22°C</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-medium text-sm sm:text-base">+%5</p>
                  <p className="text-xs text-slate-500">Büyüme artışı</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <span className="text-xl sm:text-2xl">🌊</span>
                  <div>
                    <p className="font-medium text-slate-800 text-sm sm:text-base">Deniz Durumu</p>
                    <p className="text-xs sm:text-sm text-slate-600">Sakin (0.5m)</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-medium text-sm sm:text-base">Optimal</p>
                  <p className="text-xs text-slate-500">Düşük stres</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg">
            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-4">⚡ Hızlı İstatistikler</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 text-sm sm:text-base">Bugünkü Hasat</span>
                <span className="font-bold text-green-600 text-sm sm:text-base">1.2 ton</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 text-sm sm:text-base">Gelir (Aylık)</span>
                <span className="font-bold text-blue-600 text-sm sm:text-base">₺184,350</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 text-sm sm:text-base">AI Tahminleri</span>
                <span className="font-bold text-purple-600 text-sm sm:text-base">12 aktif</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 text-sm sm:text-base">Sistem Sağlığı</span>
                <span className="font-bold text-green-600 text-sm sm:text-base">%99.2</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Farm Status Overview */}
      <motion.div variants={itemVariants} className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-slate-800">🏭 Çiftlik Durumu Özeti</h3>
          <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium">Çiftlikleri Yönet →</button>
        </div>
        
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-full px-4 sm:px-0">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-slate-600 text-xs sm:text-sm">Çiftlik</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-slate-600 text-xs sm:text-sm hidden md:table-cell">Konum</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-slate-600 text-xs sm:text-sm">Durum</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-slate-600 text-xs sm:text-sm">Alan</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-slate-600 text-xs sm:text-sm">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {mockFarms.map((farm, index) => (
                  <tr key={farm.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br ${
                          index % 5 === 0 ? 'from-blue-500 to-green-500' :
                          index % 5 === 1 ? 'from-yellow-500 to-orange-500' :
                          index % 5 === 2 ? 'from-red-500 to-pink-500' :
                          index % 5 === 3 ? 'from-green-500 to-emerald-500' :
                          'from-purple-500 to-indigo-500'
                        } rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <span className="text-white text-xs sm:text-xs font-bold">{farm.name.charAt(0)}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-800 text-xs sm:text-sm truncate">{farm.name}</p>
                          <p className="text-xs text-slate-600 md:hidden truncate">{farm.location.address}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-slate-600 text-xs sm:text-sm hidden md:table-cell">
                      <div className="max-w-[200px] truncate">{farm.location.address}</div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        farm.status === 'healthy' ? 'bg-green-100 text-green-800' :
                        farm.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        <span className="hidden sm:inline">
                          {farm.status === 'healthy' ? '✅ Sağlıklı' :
                           farm.status === 'warning' ? '⚠️ Uyarı' :
                           '🔴 Kritik'}
                        </span>
                        <span className="sm:hidden">
                          {farm.status === 'healthy' ? '✅' :
                           farm.status === 'warning' ? '⚠️' :
                           '🔴'}
                        </span>
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-slate-600 text-xs sm:text-sm">{farm.area}ha</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <button 
                        onClick={() => onFarmSelect(farm.id)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm"
                      >
                        <span className="hidden sm:inline">Detayları Görüntüle</span>
                        <span className="sm:hidden">Detay</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
