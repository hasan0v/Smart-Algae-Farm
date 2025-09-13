import { motion } from 'framer-motion';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 ocean-wave flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-2xl p-6 sm:p-8 border border-white/30 shadow-2xl max-w-md w-full"
      >
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-ocean-400 to-algae-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <span className="text-white font-bold text-xl sm:text-2xl">🌱</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold gradient-text mb-2">Smart Macroalgae Farm'ya Hoş Geldiniz</h1>
          <p className="text-slate-600 text-sm sm:text-base">Akıllı Su Ürünleri Yönetim Sistemi</p>
        </div>

        <form className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">E-posta</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
              placeholder="E-posta adresinizi girin"
              defaultValue="ahmet.yilmaz@ornek.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Şifre</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
              placeholder="Şifrenizi girin"
            />
          </div>

          <button
            type="button"
            onClick={onLogin}
            className="w-full bg-gradient-to-r from-ocean-500 to-algae-500 hover:from-ocean-600 hover:to-algae-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
          >
            Giriş Yap
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Demo bilgileri önceden doldurulmuştur. Devam etmek için "Giriş Yap" butonuna tıklayın.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
