import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  BuildingOffice2Icon, 
  BoltIcon, 
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  UserIcon,
  PlusIcon,
  HomeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { 
  ChartBarIcon as ChartBarSolid, 
  BuildingOffice2Icon as BuildingOffice2Solid, 
  BoltIcon as BoltSolid, 
  ClipboardDocumentListIcon as ClipboardDocumentListSolid,
  Cog6ToothIcon as Cog6ToothSolid,
  UserIcon as UserSolid,
  HomeIcon as HomeSolid
} from '@heroicons/react/24/solid';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userName: string;
  userAvatar: string;
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { id: 'dashboard', name: 'Kontrol Paneli', icon: HomeIcon, activeIcon: HomeSolid },
  { id: 'farms', name: 'Çiftliklerim', icon: BuildingOffice2Icon, activeIcon: BuildingOffice2Solid, badge: '5' },
  { id: 'analytics', name: 'Analitik', icon: ChartBarIcon, activeIcon: ChartBarSolid },
  { id: 'actions', name: 'İşlemler', icon: BoltIcon, activeIcon: BoltSolid, badge: '3' },
  { id: 'reports', name: 'Raporlar', icon: ClipboardDocumentListIcon, activeIcon: ClipboardDocumentListSolid },
  { id: 'settings', name: 'Ayarlar', icon: Cog6ToothIcon, activeIcon: Cog6ToothSolid },
  { id: 'profile', name: 'Profil', icon: UserIcon, activeIcon: UserSolid },
];

export const Sidebar = ({ activeTab, onTabChange, userName, userAvatar, isOpen, onClose }: SidebarProps) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <motion.div 
      initial={false}
      animate={{ 
        x: isDesktop ? 0 : (isOpen ? 0 : -300)
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed left-0 top-0 h-full w-64 sidebar-gradient shadow-2xl z-40 lg:shadow-lg ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      {/* Logo and Brand */}
      <div className="p-6 border-b border-slate-700/50">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-ocean-400 to-algae-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">🌱</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Smart Macroalgae</h1>
              <p className="text-slate-400 text-xs">Akıllı Su Ürünleri</p>
            </div>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </motion.div>
      </div>

      {/* User Profile Section */}
      <div className="p-6 border-b border-slate-700/50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center space-x-3"
        >
          <div className="relative">
            <img 
              src={userAvatar} 
              alt={userName}
              className="w-12 h-12 rounded-xl object-cover border-2 border-slate-600"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-sm truncate">{userName}</h3>
            <p className="text-slate-400 text-xs">Çevrimiçi</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 flex-1">
        {navigation.map((item, index) => {
          const isActive = activeTab === item.id;
          const Icon = isActive ? item.activeIcon : item.icon;
          
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              onClick={() => onTabChange(item.id)}
              className={`nav-item w-full ${isActive ? 'active' : ''}`}
            >
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="flex-1 text-left text-slate-400">{item.name}</span>
              {item.badge && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto bg-ocean-500 text-white text-xs font-medium px-2 py-1 rounded-full min-w-[20px] text-center"
                >
                  {item.badge}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Add New Farm Button */}
      <div className="p-4 border-t border-slate-700/50">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={() => onTabChange('add-farm')}
          className="w-full bg-gradient-to-r from-algae-500 to-algae-600 hover:from-algae-600 hover:to-algae-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Yeni Çiftlik Ekle</span>
        </motion.button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <p className="text-slate-500 text-xs">Sürüm 1.2.0</p>
          <p className="text-slate-600 text-xs">© 2025 Smart Macroalgae Farm</p>
        </motion.div>
      </div>
    </motion.div>
  );
};
