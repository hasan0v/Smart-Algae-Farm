import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { 
  generateAnalyticsTrends, 
  generateAnalyticsKPIs, 
  generateFarmPerformanceData,
  generatePredictionData,
  generateSimpleTrendData 
} from '../data/mockData';

export const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('7g');
  const [selectedMetric, setSelectedMetric] = useState('sicaklik');
  const [kpiData, setKpiData] = useState<any>(null);
  const [farmPerformance, setFarmPerformance] = useState<any[]>([]);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Load analytics data
    setKpiData(generateAnalyticsKPIs());
    setFarmPerformance(generateFarmPerformanceData());
    setPredictions(generatePredictionData());
  }, []);

  useEffect(() => {
    // Update chart data when metric or time range changes - Use hardcoded data for now
    const hardcodedData = [
      { time: 'Paz', value: 22.5, status: 'normal' },
      { time: 'Pzt', value: 24.2, status: 'normal' },
      { time: 'Sal', value: 21.8, status: 'normal' },
      { time: 'Çar', value: 23.1, status: 'normal' },
      { time: 'Per', value: 25.4, status: 'normal' },
      { time: 'Cum', value: 23.9, status: 'normal' },
      { time: 'Cmt', value: 22.7, status: 'normal' }
    ];
    
    console.log('Setting hardcoded chart data:', hardcodedData);
    setChartData(hardcodedData);
  }, [selectedMetric, timeRange]);

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
            <span className={`text-xs sm:text-sm font-medium ${
              kpiData?.generalGrowth.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {kpiData?.generalGrowth.trend === 'up' ? '+' : '-'}%{kpiData?.generalGrowth.change || 15.2}
            </span>
          </div>
          <h3 className="text-xs sm:text-sm font-medium text-slate-600">Genel Büyüme</h3>
          <p className="text-xl sm:text-2xl font-bold text-slate-800">%{kpiData?.generalGrowth.current || 12.8}</p>
          <p className="text-xs text-slate-500 mt-1">önceki döneme göre</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg sm:text-xl">💧</span>
            </div>
            <span className="text-blue-600 text-xs sm:text-sm font-medium">
              {kpiData?.waterQuality.status || 'Optimal'}
            </span>
          </div>
          <h3 className="text-xs sm:text-sm font-medium text-slate-600">Su Kalitesi</h3>
          <p className="text-xl sm:text-2xl font-bold text-slate-800">%{kpiData?.waterQuality.current || 94.2}</p>
          <p className="text-xs text-slate-500 mt-1">Kalite indeksi</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg sm:text-xl">⚡</span>
            </div>
            <span className={`text-xs sm:text-sm font-medium ${
              kpiData?.energyUsage.trend === 'down' ? 'text-green-600' : 'text-red-600'
            }`}>
              {kpiData?.energyUsage.trend === 'down' ? '-' : '+'}%{Math.abs(kpiData?.energyUsage.change || 5.3)}
            </span>
          </div>
          <h3 className="text-xs sm:text-sm font-medium text-slate-600">Enerji Kullanımı</h3>
          <p className="text-xl sm:text-2xl font-bold text-slate-800">{kpiData?.energyUsage.current?.toLocaleString() || '1,247'} kWh</p>
          <p className="text-xs text-slate-500 mt-1">Bu ay</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg sm:text-xl">📈</span>
            </div>
            <span className={`text-xs sm:text-sm font-medium ${
              kpiData?.revenue.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {kpiData?.revenue.trend === 'up' ? '+' : '-'}%{kpiData?.revenue.change || 8.7}
            </span>
          </div>
          <h3 className="text-xs sm:text-sm font-medium text-slate-600">Gelir</h3>
          <p className="text-xl sm:text-2xl font-bold text-slate-800">₺{kpiData?.revenue.current?.toLocaleString() || '184,350'}</p>
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
            {chartData && chartData.length > 0 ? chartData.map((point, index) => {
              const maxValue = Math.max(...chartData.map(p => p.value));
              const minValue = Math.min(...chartData.map(p => p.value));
              const range = maxValue - minValue || 1; // Prevent division by zero
              const normalizedValue = ((point.value - minValue) / range);
              const height = Math.max(20, normalizedValue * 70 + 20); // Ensure minimum height
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-500 cursor-pointer hover:opacity-75 relative group ${
                      selectedMetric === 'sicaklik' ? 'bg-gradient-to-t from-orange-500 to-orange-300' :
                      selectedMetric === 'ph' ? 'bg-gradient-to-t from-blue-500 to-blue-300' :
                      selectedMetric === 'cozunmusOksijen' ? 'bg-gradient-to-t from-green-500 to-green-300' :
                      selectedMetric === 'tuzluluk' ? 'bg-gradient-to-t from-purple-500 to-purple-300' :
                      'bg-gradient-to-t from-emerald-500 to-emerald-300'
                    }`}
                    style={{height: `${height}%`, minHeight: '20px'}}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {point.value.toFixed(1)}{metrics.find(m => m.id === selectedMetric)?.unit}
                      <div className="text-xs text-gray-300">{point.time}</div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 mt-2">
                    {point.time}
                  </span>
                </div>
              );
            }) : (
              // Fallback when no data
              <div className="flex-1 flex items-center justify-center h-48">
                <div className="text-slate-500 text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <p>Veri bulunamadı</p>
                  <p className="text-xs mt-1">ChartData length: {chartData?.length || 0}</p>
                </div>
              </div>
            )}
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
            {farmPerformance.slice(0, 4).map((farm, index) => (
              <div key={farm.farmId} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 bg-gradient-to-br ${
                    index % 4 === 0 ? 'from-blue-500 to-green-500' :
                    index % 4 === 1 ? 'from-yellow-500 to-orange-500' :
                    index % 4 === 2 ? 'from-red-500 to-pink-500' :
                    'from-purple-500 to-indigo-500'
                  } rounded-lg flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{farm.farmName?.charAt(0) || 'F'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-800">{farm.farmName}</span>
                    <span className="text-xs text-slate-500">Büyüme: %{farm.growthRate}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        farm.performance >= 85 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                        farm.performance >= 70 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                        'bg-gradient-to-r from-red-400 to-red-600'
                      }`}
                      style={{width: `${Math.min(100, farm.performance)}%`}}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-slate-800 w-12">%{farm.performance}</span>
                  <span className={`text-xs ${
                    farm.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {farm.trend === 'up' ? '↗' : '↘'} {farm.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tahmine Dayalı Analiz</h3>
          <div className="space-y-4">
            {predictions.slice(0, 3).map((prediction, index) => (
              <div key={prediction.type} className={`rounded-xl p-4 border ${
                prediction.impact === 'positive' ? 'bg-green-50 border-green-200' :
                prediction.impact === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`text-xl ${
                    prediction.impact === 'positive' ? 'text-green-600' :
                    prediction.impact === 'warning' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`}>
                    {prediction.icon}
                  </span>
                  <h4 className={`font-medium ${
                    prediction.impact === 'positive' ? 'text-green-800' :
                    prediction.impact === 'warning' ? 'text-yellow-800' :
                    'text-blue-800'
                  }`}>
                    {prediction.title}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    prediction.impact === 'positive' ? 'bg-green-100 text-green-700' :
                    prediction.impact === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    %{prediction.confidence} güven
                  </span>
                </div>
                <p className={`text-sm ${
                  prediction.impact === 'positive' ? 'text-green-700' :
                  prediction.impact === 'warning' ? 'text-yellow-700' :
                  'text-blue-700'
                }`}>
                  {prediction.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-slate-500">Zaman aralığı: {prediction.timeframe}</span>
                </div>
              </div>
            ))}
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
