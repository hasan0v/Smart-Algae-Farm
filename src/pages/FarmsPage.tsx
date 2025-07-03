import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  PlusIcon, 
  FunnelIcon, 
  MagnifyingGlassIcon,
  MapPinIcon,
  CalendarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { mockFarms } from '../data/mockData';

interface FarmsPageProps {
  onFarmSelect: (farmId: string) => void;
}

export const FarmsPage = ({ onFarmSelect }: FarmsPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('tumunu');
  const [sortBy, setSortBy] = useState('isim');

  const filteredFarms = mockFarms
    .filter(farm => {
      const matchesSearch = farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           farm.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           farm.species.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'tumunu' || farm.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'isim': return a.name.localeCompare(b.name);
        case 'alan': return b.area - a.area;
        case 'durum': return a.status.localeCompare(b.status);
        case 'kurulus': return new Date(b.establishedDate).getTime() - new Date(a.establishedDate).getTime();
        default: return 0;
      }
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Çiftliklerim</h1>
          <p className="text-slate-600 text-sm sm:text-base">Tüm alg çiftliklerinizi yönetin ve izleyin ({mockFarms.length} toplam)</p>
        </div>
        <button className="bg-gradient-to-r from-algae-500 to-algae-600 hover:from-algae-600 hover:to-algae-700 text-white font-medium py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base">
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Yeni Çiftlik Ekle</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {/* Search */}
          <div className="relative lg:col-span-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Çiftlik ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2.5 lg:py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm lg:text-base"
            />
          </div>

          {/* Status Filter */}
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 lg:py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm lg:text-base"
          >
            <option value="tumunu">Tüm Durumlar</option>
            <option value="healthy">Sağlıklı</option>
            <option value="warning">Uyarı</option>
            <option value="critical">Kritik</option>
          </select>

          {/* Sort By */}
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 lg:py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm lg:text-base"
          >
            <option value="isim">İsme Göre Sırala</option>
            <option value="alan">Alana Göre Sırala</option>
            <option value="durum">Duruma Göre Sırala</option>
            <option value="kurulus">Kuruluş Tarihine Göre</option>
          </select>

          {/* Filter Button */}
          <button className="flex items-center justify-center space-x-2 px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 text-sm sm:text-base">
            <FunnelIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Daha Fazla Filtre</span>
            <span className="sm:hidden">Filtre</span>
          </button>
        </div>
      </div>

      {/* Farm Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-effect rounded-xl p-3 sm:p-4 border border-white/30 shadow-lg">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm">✅</span>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-600">Sağlıklı Çiftlikler</p>
              <p className="text-lg sm:text-xl font-bold text-green-600">{mockFarms.filter(f => f.status === 'healthy').length}</p>
            </div>
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-3 sm:p-4 border border-white/30 shadow-lg">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm">⚠️</span>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-600">Uyarı Durumu</p>
              <p className="text-lg sm:text-xl font-bold text-yellow-600">{mockFarms.filter(f => f.status === 'warning').length}</p>
            </div>
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-3 sm:p-4 border border-white/30 shadow-lg">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm">📏</span>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-600">Toplam Alan</p>
              <p className="text-lg sm:text-xl font-bold text-blue-600">{mockFarms.reduce((sum, f) => sum + f.area, 0)}ha</p>
            </div>
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-3 sm:p-4 border border-white/30 shadow-lg">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm">🌱</span>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-600">Ort. Büyüme</p>
              <p className="text-lg sm:text-xl font-bold text-purple-600">+%12.5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Farms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {filteredFarms.map((farm, index) => (
          <motion.div
            key={farm.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onFarmSelect(farm.id)}
            className="glass-effect rounded-2xl p-4 lg:p-6 border border-white/30 shadow-lg card-hover cursor-pointer group"
          >
            {/* Farm Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br ${
                index % 5 === 0 ? 'from-blue-500 to-green-500' :
                index % 5 === 1 ? 'from-yellow-500 to-orange-500' :
                index % 5 === 2 ? 'from-red-500 to-pink-500' :
                index % 5 === 3 ? 'from-green-500 to-emerald-500' :
                'from-purple-500 to-indigo-500'
              } rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-white font-bold text-base sm:text-lg">{farm.name.charAt(0)}</span>
              </div>
              <span className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors truncate">
              {farm.name}
            </h3>
            
            {/* Location */}
            <div className="flex items-start space-x-2 mb-3">
              <MapPinIcon className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">{farm.location.address}</p>
            </div>

            {/* Ocean Info */}
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-blue-500">🌊</span>
              <p className="text-xs sm:text-sm text-slate-600 truncate">{farm.location.ocean}</p>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
              <div className="bg-slate-50 rounded-lg p-2 sm:p-3">
                <p className="text-xs text-slate-500 mb-1">Tür</p>
                <p className="font-medium text-slate-800 text-xs sm:text-sm truncate">{farm.species}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2 sm:p-3">
                <p className="text-xs text-slate-500 mb-1">Alan</p>
                <p className="font-medium text-slate-800 text-xs sm:text-sm">{farm.area}ha</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2 sm:p-3">
                <p className="text-xs text-slate-500 mb-1">Sıcaklık</p>
                <p className="font-medium text-slate-800 text-xs sm:text-sm">{farm.sensors.temperature.value}°C</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2 sm:p-3">
                <p className="text-xs text-slate-500 mb-1">pH Seviyesi</p>
                <p className="font-medium text-slate-800 text-xs sm:text-sm">{farm.sensors.ph.value}</p>
              </div>
            </div>

            {/* Established Date */}
            <div className="flex items-center space-x-2 mb-4">
              <CalendarIcon className="w-4 h-4 text-slate-400" />
              <p className="text-xs sm:text-sm text-slate-600">
                Kurulduğu Tarih: {new Date(farm.establishedDate).toLocaleDateString('tr-TR')}
              </p>
            </div>

            {/* Performance Indicator */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm text-slate-600">Performans</span>
                <span className="text-xs sm:text-sm font-medium text-green-600">
                  {farm.status === 'healthy' ? '%95' : farm.status === 'warning' ? '%78' : '%45'}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    farm.status === 'healthy' ? 'bg-green-500' : 
                    farm.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{
                    width: farm.status === 'healthy' ? '95%' : farm.status === 'warning' ? '78%' : '45%'
                  }}
                ></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors flex items-center justify-center space-x-1 text-xs sm:text-sm">
                <ChartBarIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Analitik</span>
                <span className="sm:hidden">📊</span>
              </button>
              <button className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors text-xs sm:text-sm">
                <span className="hidden sm:inline">Detayları Görüntüle</span>
                <span className="sm:hidden">Detay</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredFarms.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 sm:py-12"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-xl sm:text-2xl">🔍</span>
          </div>
          <h3 className="text-base sm:text-lg font-medium text-slate-800 mb-2">Çiftlik bulunamadı</h3>
          <p className="text-slate-600 mb-4 text-sm sm:text-base px-4">Arama kriterlerinizi veya filtrelerinizi ayarlamayı deneyin.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('tumunu');
            }}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
          >
            Filtreleri Temizle
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};
