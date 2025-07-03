import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  PlusIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';
import { mockFarms } from '../data/mockData';

interface Action {
  id: string;
  title: string;
  description: string;
  type: 'bakim' | 'hasat' | 'besleme' | 'izleme' | 'tedavi';
  priority: 'dusuk' | 'orta' | 'yuksek' | 'acil';
  status: 'bekleyen' | 'devam-eden' | 'tamamlandi' | 'gecikti';
  farm: string;
  assignedTo: string;
  dueDate: string;
  estimatedDuration: string;
  progress: number;
}

const mockActions: Action[] = [
  {
    id: '1',
    title: 'pH Seviye Ayarlaması',
    description: 'Tank A-1\'deki pH seviyelerini optimal aralığa ayarlayın (7.5-8.5)',
    type: 'tedavi',
    priority: 'yuksek',
    status: 'bekleyen',
    farm: 'Okyanus Çiftliği Alpha',
    assignedTo: 'Dr. Ayşe Yılmaz',
    dueDate: '2024-01-15',
    estimatedDuration: '2 saat',
    progress: 0
  },
  {
    id: '2',
    title: 'Haftalık Biyokütle Hasadı',
    description: 'Yetiştirme tanklarından 1-5 olgun algleri hasat edin',
    type: 'hasat',
    priority: 'orta',
    status: 'devam-eden',
    farm: 'Yeşil Dalga Tesisi',
    assignedTo: 'Mehmet Kaya',
    dueDate: '2024-01-16',
    estimatedDuration: '4 saat',
    progress: 65
  },
  {
    id: '3',
    title: 'Besin Besleme Programı',
    description: 'Büyüme ortamına nitrojen ve fosfor takviyeleri ekleyin',
    type: 'besleme',
    priority: 'orta',
    status: 'tamamlandi',
    farm: 'Kıyı Alg Laboratuvarı',
    assignedTo: 'Zeynep Özkan',
    dueDate: '2024-01-14',
    estimatedDuration: '1 saat',
    progress: 100
  },
  {
    id: '4',
    title: 'Ekipman Bakımı',
    description: 'Tüm tanklardaki oksijen sensörlerini servis edin ve kalibre edin',
    type: 'bakim',
    priority: 'acil',
    status: 'gecikti',
    farm: 'Deniz Araştırma Merkezi',
    assignedTo: 'Ali Demir',
    dueDate: '2024-01-12',
    estimatedDuration: '3 saat',
    progress: 0
  },
  {
    id: '5',
    title: 'Büyüme Hızı İzleme',
    description: 'Deneysel tanklardan numune alın ve büyüme hızlarını ölçün',
    type: 'izleme',
    priority: 'dusuk',
    status: 'bekleyen',
    farm: 'Okyanus Çiftliği Alpha',
    assignedTo: 'Fatma Şahin',
    dueDate: '2024-01-18',
    estimatedDuration: '1.5 saat',
    progress: 0
  }
];

export const ActionsPage = () => {
  const [actions, setActions] = useState<Action[]>(mockActions);
  const [filter, setFilter] = useState('tumunu');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('teslimTarihi');
  const [showNewActionForm, setShowNewActionForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'tamamlandi': return 'text-green-600 bg-green-100';
      case 'devam-eden': return 'text-blue-600 bg-blue-100';
      case 'bekleyen': return 'text-yellow-600 bg-yellow-100';
      case 'gecikti': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'acil': return 'text-red-600 bg-red-100';
      case 'yuksek': return 'text-orange-600 bg-orange-100';
      case 'orta': return 'text-yellow-600 bg-yellow-100';
      case 'dusuk': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bakim': return '🔧';
      case 'hasat': return '🌾';
      case 'besleme': return '🥗';
      case 'izleme': return '📊';
      case 'tedavi': return '💊';
      default: return '📝';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'tamamlandi': return 'Tamamlandı';
      case 'devam-eden': return 'Devam Ediyor';
      case 'bekleyen': return 'Bekleyen';
      case 'gecikti': return 'Gecikti';
      default: return status;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'acil': return 'Acil';
      case 'yuksek': return 'Yüksek';
      case 'orta': return 'Orta';
      case 'dusuk': return 'Düşük';
      default: return priority;
    }
  };

  const filteredActions = actions.filter(action => {
    const matchesFilter = filter === 'tumunu' || action.status === filter;
    const matchesSearch = action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.farm.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sortedActions = [...filteredActions].sort((a, b) => {
    if (sortBy === 'teslimTarihi') return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    if (sortBy === 'oncelik') {
      const priorityOrder = { acil: 0, yuksek: 1, orta: 2, dusuk: 3 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
    }
    return a.title.localeCompare(b.title);
  });

  const updateActionProgress = (id: string, progress: number) => {
    setActions(prev => prev.map(action => 
      action.id === id ? { 
        ...action, 
        progress,
        status: progress === 100 ? 'tamamlandi' : progress > 0 ? 'devam-eden' : 'bekleyen'
      } : action
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 sm:space-y-8"
    >
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold gradient-text mb-2">İşlemler ve Görevler</h1>
          <p className="text-slate-600 text-sm lg:text-base">Çiftlik operasyonlarını ve bakım görevlerini yönetin ve takip edin</p>
        </div>
        <button 
          onClick={() => setShowNewActionForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors text-sm lg:text-base"
        >
          <PlusIcon className="w-4 h-4 lg:w-5 lg:h-5" />
          <span>Yeni İşlem</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-2xl p-4 lg:p-6 border border-white/30 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl lg:text-2xl">📋</span>
            <span className="text-xl lg:text-2xl font-bold text-slate-800">{actions.length}</span>
          </div>
          <h3 className="text-xs lg:text-sm font-medium text-slate-600">Toplam İşlemler</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-2xl p-4 lg:p-6 border border-white/30 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl lg:text-2xl">⏳</span>
            <span className="text-xl lg:text-2xl font-bold text-orange-600">
              {actions.filter(a => a.status === 'bekleyen').length}
            </span>
          </div>
          <h3 className="text-xs lg:text-sm font-medium text-slate-600">Bekleyen</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl sm:text-2xl">🚀</span>
            <span className="text-xl sm:text-2xl font-bold text-blue-600">
              {actions.filter(a => a.status === 'devam-eden').length}
            </span>
          </div>
          <h3 className="text-xs sm:text-sm font-medium text-slate-600">Devam Eden</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl sm:text-2xl">⚠️</span>
            <span className="text-xl sm:text-2xl font-bold text-red-600">
              {actions.filter(a => a.status === 'gecikti').length}
            </span>
          </div>
          <h3 className="text-xs sm:text-sm font-medium text-slate-600">Gecikmiş</h3>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <MagnifyingGlassIcon className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="İşlem ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full sm:w-auto text-sm sm:text-base"
              />
            </div>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm sm:text-base"
            >
              <option value="tumunu">Tüm Durumlar</option>
              <option value="bekleyen">Bekleyen</option>
              <option value="devam-eden">Devam Eden</option>
              <option value="tamamlandi">Tamamlanmış</option>
              <option value="gecikti">Gecikmiş</option>
            </select>
          </div>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm sm:text-base"
          >
            <option value="teslimTarihi">Teslim Tarihine Göre</option>
            <option value="oncelik">Önceliğe Göre</option>
            <option value="baslik">Başlığa Göre</option>
          </select>
        </div>
      </motion.div>

      {/* Actions List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        {sortedActions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-2xl p-4 lg:p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex items-start space-x-3 lg:space-x-4 flex-1">
                <div className="text-xl lg:text-2xl">{getTypeIcon(action.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-3 mb-2">
                    <h3 className="text-base lg:text-lg font-semibold text-slate-800 truncate">{action.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(action.status)}`}>
                        {getStatusLabel(action.status)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(action.priority)}`}>
                        {getPriorityLabel(action.priority)}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-3 text-sm lg:text-base">{action.description}</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-500 text-xs lg:text-sm">Çiftlik:</span>
                      <span className="font-medium text-slate-800 text-xs lg:text-sm truncate">{action.farm}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-500 text-sm">Atanan:</span>
                      <span className="font-medium text-slate-800">{action.assignedTo}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600 text-sm">Teslim: {action.dueDate}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">İlerleme</span>
                      <span className="text-sm font-medium text-slate-800">{action.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                        style={{width: `${action.progress}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {action.status !== 'tamamlandi' && (
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => updateActionProgress(action.id, Math.min(100, action.progress + 25))}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="İlerlemeyi Güncelle"
                    >
                      <CheckCircleIcon className="w-5 h-5" />
                    </button>
                  </div>
                )}
                <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
                  <EllipsisVerticalIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {sortedActions.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-12 border border-white/30 shadow-lg text-center"
        >
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Hiçbir işlem bulunamadı</h3>
          <p className="text-slate-600 mb-6">Arama veya filtre kriterlerinizi ayarlamayı deneyin</p>
          <button 
            onClick={() => setShowNewActionForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            İlk İşlemi Oluştur
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};
