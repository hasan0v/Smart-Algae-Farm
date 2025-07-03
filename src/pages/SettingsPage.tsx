import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { 
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  CogIcon,
  KeyIcon,
  EnvelopeIcon,
  SunIcon,
  MoonIcon,
  ClockIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import { getDefaultProfileImage, uploadProfileImage, validateImageFile } from '../utils/profileImage';

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profil');
  const [profileImage, setProfileImage] = useState(getDefaultProfileImage());
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    alerts: true,
    reports: false
  });
  const [theme, setTheme] = useState('acik');
  const [language, setLanguage] = useState('tr');
  const [timezone, setTimezone] = useState('UTC+3');

  const tabs = [
    { id: 'profil', name: 'Profil', icon: UserIcon },
    { id: 'bildirimler', name: 'Bildirimler', icon: BellIcon },
    { id: 'guvenlik', name: 'Güvenlik', icon: ShieldCheckIcon },
    { id: 'tercihler', name: 'Tercihler', icon: CogIcon },
    { id: 'api', name: 'API ve Entegrasyonlar', icon: CloudIcon }
  ];

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !validateImageFile(file)) return;

    setIsUploadingImage(true);
    try {
      const imageUrl = await uploadProfileImage(file);
      setProfileImage(imageUrl);
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Görüntü yüklenemedi. Lütfen tekrar deneyin.');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(getDefaultProfileImage());
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 sm:space-y-8"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Ayarlar</h1>
        <p className="text-slate-600 text-sm sm:text-base">Hesap tercihlerinizi ve sistem yapılandırmanızı yönetin</p>
      </div>

      {/* Settings Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg"
      >
        <div className="flex flex-wrap gap-2">
          {tabs.map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-800 shadow-sm'
                    : 'text-slate-600 hover:bg-gray-100'
                }`}
              >
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">{tab.name}</span>
                <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Profile Settings */}
      {activeTab === 'profil' && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Profil Bilgileri</h3>
            
            <div className="flex items-center space-x-6 mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  {profileImage.includes('default-avatar') ? (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                      <UserIcon className="w-12 h-12 text-white" />
                    </div>
                  ) : (
                    <img 
                      src={profileImage} 
                      alt="Profil" 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {isUploadingImage && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                  </div>
                )}
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingImage}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors mr-3 flex items-center space-x-2"
                >
                  <PhotoIcon className="w-4 h-4" />
                  <span>{isUploadingImage ? 'Yükleniyor...' : 'Fotoğraf Değiştir'}</span>
                </button>
                <button 
                  onClick={handleRemoveImage}
                  disabled={isUploadingImage}
                  className="text-slate-600 hover:text-slate-800 font-medium disabled:text-slate-400"
                >
                  Kaldır
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ad</label>
                <input
                  type="text"
                  defaultValue="Ahmet"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Soyad</label>
                <input
                  type="text"
                  defaultValue="Yılmaz"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">E-posta</label>
                <input
                  type="email"
                  defaultValue="ahmet.yilmaz@ornek.com"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Telefon</label>
                <input
                  type="tel"
                  defaultValue="+90 (555) 123-4567"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Biyografi</label>
                <textarea
                  rows={3}
                  defaultValue="Alg yetiştirme ve sürdürülebilir çiftçilik uygulamaları konusunda uzmanlaşmış deniz biyoloğu."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Notification Settings */}
      {activeTab === 'bildirimler' && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Bildirim Tercihleri</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-6 h-6 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-slate-800">E-posta Bildirimleri</h4>
                    <p className="text-sm text-slate-600">E-posta ile güncellemeleri alın</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={() => handleNotificationToggle('email')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center space-x-3">
                  <DevicePhoneMobileIcon className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-medium text-slate-800">Anlık Bildirimler</h4>
                    <p className="text-sm text-slate-600">Mobil cihazınızda bildirim alın</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={() => handleNotificationToggle('push')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="flex items-center space-x-3">
                  <BellIcon className="w-6 h-6 text-purple-600" />
                  <div>
                    <h4 className="font-medium text-slate-800">Sistem Uyarıları</h4>
                    <p className="text-sm text-slate-600">Kritik sistem ve çiftlik uyarıları</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.alerts}
                    onChange={() => handleNotificationToggle('alerts')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Security Settings */}
      {activeTab === 'guvenlik' && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Güvenlik ve Gizlilik</h3>
            
            <div className="space-y-6">
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="flex items-center space-x-3 mb-3">
                  <KeyIcon className="w-6 h-6 text-yellow-600" />
                  <h4 className="font-medium text-slate-800">Şifre Değiştir</h4>
                </div>
                <p className="text-sm text-slate-600 mb-4">Hesabınızı güçlü bir şifre ile güvende tutun</p>
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Şifreyi Güncelle
                </button>
              </div>

              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center space-x-3 mb-3">
                  <ShieldCheckIcon className="w-6 h-6 text-green-600" />
                  <h4 className="font-medium text-slate-800">İki Faktörlü Kimlik Doğrulama</h4>
                </div>
                <p className="text-sm text-slate-600 mb-4">Hesabınıza ekstra güvenlik katmanı ekleyin</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  2FA Etkinleştir
                </button>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <GlobeAltIcon className="w-6 h-6 text-blue-600" />
                  <h4 className="font-medium text-slate-800">Aktif Oturumlar</h4>
                </div>
                <p className="text-sm text-slate-600 mb-4">Hesabınıza erişimi olan cihazları yönetin</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <p className="font-medium text-slate-800">Windows'ta Chrome</p>
                      <p className="text-sm text-slate-600">Mevcut oturum • İstanbul, Türkiye</p>
                    </div>
                    <span className="text-green-600 text-sm font-medium">Aktif</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <p className="font-medium text-slate-800">iPhone'da Safari</p>
                      <p className="text-sm text-slate-600">2 saat önce aktif • İstanbul, Türkiye</p>
                    </div>
                    <button className="text-red-600 text-sm font-medium hover:text-red-800">İptal Et</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Preferences */}
      {activeTab === 'tercihler' && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Uygulama Tercihleri</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <SunIcon className="w-6 h-6 text-yellow-500" />
                    <MoonIcon className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">Tema</h4>
                    <p className="text-sm text-slate-600">Tercih ettiğiniz temayı seçin</p>
                  </div>
                </div>
                <select 
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="acik">Açık</option>
                  <option value="koyu">Koyu</option>
                  <option value="otomatik">Otomatik</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center space-x-3">
                  <GlobeAltIcon className="w-6 h-6 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-slate-800">Dil</h4>
                    <p className="text-sm text-slate-600">Tercih ettiğiniz dili seçin</p>
                  </div>
                </div>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="tr">Türkçe</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-6 h-6 text-purple-600" />
                  <div>
                    <h4 className="font-medium text-slate-800">Saat Dilimi</h4>
                    <p className="text-sm text-slate-600">Yerel saat diliminizi ayarlayın</p>
                  </div>
                </div>
                <select 
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="UTC+3">UTC+3 (Türkiye)</option>
                  <option value="UTC-5">UTC-5 (EST)</option>
                  <option value="UTC-8">UTC-8 (PST)</option>
                  <option value="UTC+0">UTC+0 (GMT)</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* API & Integrations */}
      {activeTab === 'api' && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="glass-effect rounded-2xl p-6 border border-white/30 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">API ve Entegrasyonlar</h3>
            
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <CloudIcon className="w-6 h-6 text-blue-600" />
                  <h4 className="font-medium text-slate-800">API Anahtarları</h4>
                </div>
                <p className="text-sm text-slate-600 mb-4">Üçüncü taraf entegrasyonları için API anahtarlarını yönetin</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Yeni Anahtar Oluştur
                </button>
              </div>

              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">🌐</span>
                  <h4 className="font-medium text-slate-800">Webhook'lar</h4>
                </div>
                <p className="text-sm text-slate-600 mb-4">Gerçek zamanlı veri güncellemeleri için webhook'ları yapılandırın</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Webhook Ekle
                </button>
              </div>

              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">🔗</span>
                  <h4 className="font-medium text-slate-800">Bağlı Uygulamalar</h4>
                </div>
                <p className="text-sm text-slate-600 mb-4">Bağlı üçüncü taraf uygulamaları yönetin</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="font-medium">Hava Durumu API</span>
                    <span className="text-green-600 text-sm">Bağlı</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="font-medium">Slack Entegrasyonu</span>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-800">Bağla</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
