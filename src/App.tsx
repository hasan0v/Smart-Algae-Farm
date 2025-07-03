import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardPage } from './pages/DashboardPage';
import { FarmsPage } from './pages/FarmsPage';
import { FarmDetailsPage } from './pages/FarmDetailsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ActionsPage } from './pages/ActionsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { mockUser, mockFarms } from './data/mockData';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Simulate authentication check
    const timer = setTimeout(() => {
      setIsAuthenticated(true);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false); // Close sidebar on mobile when tab changes
    if (tab !== 'farm-details') {
      setSelectedFarmId(null);
    }
  };

  const handleFarmSelect = (farmId: string) => {
    setSelectedFarmId(farmId);
    setActiveTab('farm-details');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-ocean-400 to-algae-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4 animate-bounce-gentle">
            <span className="text-white font-bold text-2xl">🌱</span>
          </div>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-48 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage onFarmSelect={handleFarmSelect} />;
      case 'farms':
        return <FarmsPage onFarmSelect={handleFarmSelect} />;
      case 'farm-details':
        if (selectedFarmId) {
          const farm = mockFarms.find(f => f.id === selectedFarmId);
          return farm ? <FarmDetailsPage farm={farm} onBack={() => setActiveTab('farms')} /> : <FarmsPage onFarmSelect={handleFarmSelect} />;
        }
        return <FarmsPage onFarmSelect={handleFarmSelect} />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'actions':
        return <ActionsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'profile':
        return <ProfilePage user={mockUser} />;
      default:
        return <DashboardPage onFarmSelect={handleFarmSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 ocean-wave">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        userName={mockUser.name}
        userAvatar={mockUser.avatar}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className="lg:ml-64 transition-all duration-300">
        <Header 
          user={mockUser}
          currentPage={activeTab}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="p-4 lg:p-6 xl:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
