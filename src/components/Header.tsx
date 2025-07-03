import { Bell, Search, Settings, Menu } from 'lucide-react';

interface HeaderProps {
  user: {
    name: string;
    avatar: string;
    email: string;
  };
  currentPage: string;
  onMenuClick: () => void;
}

export const Header = ({ user, currentPage, onMenuClick }: HeaderProps) => {
  const getPageTitle = (page: string) => {
    switch (page) {
      case 'dashboard': return 'Kontrol Paneli Özeti';
      case 'farms': return 'Çiftlik Yönetimi';
      case 'farm-details': return 'Çiftlik Detayları';
      case 'analytics': return 'Analitik ve Raporlar';
      case 'actions': return 'İşlem Merkezi';
      case 'reports': return 'Raporlar';
      case 'settings': return 'Ayarlar';
      case 'profile': return 'Kullanıcı Profili';
      default: return 'Kontrol Paneli';
    }
  };

  return (
    <header className="glass-effect border-b border-white/20 sticky top-0 z-30">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div>
              <h1 className="text-lg sm:text-2xl font-bold gradient-text">
                {getPageTitle(currentPage)}
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Hoş geldiniz, {user.name.split(' ')[0]}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search - hidden on mobile */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Çiftlik ara..."
                className="input-field pl-10 w-48 lg:w-64"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-slate-600 hover:text-slate-800 transition-colors">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* Settings - hidden on mobile */}
            <button className="hidden sm:block p-2 text-slate-600 hover:text-slate-800 transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-800">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl object-cover border-2 border-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
