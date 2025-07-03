import { motion } from 'framer-motion';
import { User } from '../data/mockData';

interface ProfilePageProps {
  user: User;
}

export const ProfilePage = ({ user }: ProfilePageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 sm:space-y-8"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Profil</h1>
        <p className="text-slate-600 text-sm sm:text-base">Hesabınızı ve tercihlerinizi yönetin</p>
      </div>

      <div className="glass-effect rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-16 h-16 rounded-xl object-cover border-2 border-slate-200 mx-auto sm:mx-0"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800">{user.name}</h2>
            <p className="text-slate-600 text-sm sm:text-base">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h3 className="font-medium mb-2 text-sm sm:text-base">İletişim Bilgileri</h3>
            <div className="space-y-1 text-sm sm:text-base">
              <p><strong>E-posta:</strong> {user.email}</p>
              <p><strong>Telefon:</strong> {user.phone}</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-sm sm:text-base">Hesap Detayları</h3>
            <div className="space-y-1 text-sm sm:text-base">
              <p><strong>Rol:</strong> {user.role}</p>
              <p><strong>Organizasyon:</strong> {user.organization}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
