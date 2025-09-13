// Mock data for the application
export interface Farm {
  id: string;
  name: string;
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
    ocean: string;
  };
  species: string;
  establishedDate: string;
  area: number;
  depth: string;
  status: 'healthy' | 'warning' | 'critical';
  sensors: {
    ph: { value: number; status: string; lastUpdate: string };
    temperature: { value: number; status: string; lastUpdate: string };
    dissolvedOxygen: { value: number; status: string; lastUpdate: string };
    salinity: { value: number; status: string; lastUpdate: string };
    length: { value: number; status: string; lastUpdate: string };
    growth: { value: number; status: string; lastUpdate: string };
  };
  images: Array<{
    id: string;
    url: string;
    timestamp: string;
    description: string;
  }>;
  actions: Array<{
    id: string;
    type: string;
    status: 'pending' | 'completed' | 'dismissed';
    description: string;
    aiSuggestion: string;
    timestamp: string;
    confidence?: number;
  }>;
}

export interface SensorReading {
  farmId: string;
  timestamp: string;
  ph: number;
  temperature: number;
  dissolvedOxygen: number;
  salinity: number;
  length: number;
  growth: number;
}

export interface AnalyticsData {
  timestamp: string;
  ph: number;
  temperature: number;
  dissolvedOxygen: number;
  salinity: number;
  growth: number;
  productivity: number;
  energyUsage: number;
  revenue: number;
  waterQuality: number;
}

export interface TrendPoint {
  time: string;
  value: number;
  farm?: string;
  status?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  organization: string;
  phone: string;
  memberSince: string;
  stats: {
    farmsManaged: number;
    actionsCompleted: number;
    dataPointsCollected: number;
    storageUsed: string;
  };
}

// Mock farms data
export const mockFarms: Farm[] = [
  {
    id: 'farm_001',
    name: 'Okyanus Çiftliği Alpha',
    location: {
      address: 'Kuzey Atlantik Okyanusu, Newfoundland\'ın 200 deniz mili doğusu',
      coordinates: { lat: 47.7511, lng: -52.6758 },
      ocean: 'Atlantik Okyanusu',
    },
    species: 'Saccharina latissima',
    establishedDate: '2024-07-02',
    area: 2.5,
    depth: '15-25 metre',
    status: 'healthy',
    sensors: {
      ph: { value: 6.8, status: 'optimal', lastUpdate: '2025-07-03T18:00:00Z' },
      temperature: { value: 18.5, status: 'optimal', lastUpdate: '2025-07-03T18:00:00Z' },
      dissolvedOxygen: { value: 8.2, status: 'good', lastUpdate: '2025-07-03T18:00:00Z' },
      salinity: { value: 2.3, status: 'optimal', lastUpdate: '2025-07-03T18:00:00Z' },
      length: { value: 80, status: 'good', lastUpdate: '2025-07-03T18:00:00Z' },
      growth: { value: 2.1, status: 'good', lastUpdate: '2025-07-03T18:00:00Z' },
    },
    images: [
      {
        id: 'img_001',
        url: 'https://i.imgur.com/ia8PCVC.png', // Replace with your imgur link
        timestamp: '2025-06-09T18:00:00Z',
        description: 'Büyüme izleme - üstel faz',
      },
      {
        id: 'img_002',
        url: 'https://i.imgur.com/d7pIt6d.png', // Replace with your imgur link
        timestamp: '2025-06-08T16:30:00Z',
        description: 'Su kalitesi değerlendirmesi',
      },
    ],
    actions: [
      {
        id: 'action_001',
        type: 'alg_restorasyon_ayarlaması',
        status: 'pending',
        description: 'Alg hattını 80cm aşağı indir',
        aiSuggestion: 'Çözünmüş oksijen seviyelerini yakından izleyin. Su dolaşımını artırmayı düşünün.',
        timestamp: '2025-07-03T10:00:00Z',
        confidence: 94,
      },
    ],
  },
  {
    id: 'farm_002',
    name: 'Yeşil Dalga Tesisi',
    location: {
      address: 'Kuzey Pasifik Okyanusu, Kaliforniya\'nın 150 deniz mili batısı',
      coordinates: { lat: 36.7783, lng: -119.4179 },
      ocean: 'Pasifik Okyanusu',
    },
    species: 'Kappaphycus alvarezii',
    establishedDate: '2024-06-15',
    area: 3.2,
    depth: '10-20 metre',
    status: 'warning',
    sensors: {
      ph: { value: 7.8, status: 'warning', lastUpdate: '2025-07-03T17:55:00Z' },
      temperature: { value: 22.1, status: 'warning', lastUpdate: '2025-07-03T17:55:00Z' },
      dissolvedOxygen: { value: 6.1, status: 'warning', lastUpdate: '2025-07-03T17:55:00Z' },
      salinity: { value: 2.8, status: 'good', lastUpdate: '2025-07-03T17:55:00Z' },
      length: { value: 65, status: 'warning', lastUpdate: '2025-07-03T17:55:00Z' },
      growth: { value: 1.2, status: 'warning', lastUpdate: '2025-07-03T17:55:00Z' },
    },
    images: [
      {
        id: 'img_003',
        url: 'https://i.imgur.com/nsJvbPK.png',
        timestamp: '2025-06-09T14:20:00Z',
        description: 'Sıcaklık stresi göstergeleri görünür',
      },
    ],
    actions: [
      {
        id: 'action_002',
        type: 'ph_tampon_ekleme',
        status: 'pending',
        description: 'pH tampon çözeltisi ekle',
        aiSuggestion: 'pH seviyeleri kritik eşiğe yaklaşıyor. Acil eylem önerilir.',
        timestamp: '2025-07-03T09:30:00Z',
        confidence: 87,
      },
    ],
  },
  {
    id: 'farm_003',
    name: 'Deniz Araştırma Merkezi',
    location: {
      address: 'Grönland Denizi, İzlanda\'nın 100 deniz mili kuzeydoğusu',
      coordinates: { lat: 67.1428, lng: -21.9426 },
      ocean: 'Arktik Okyanus',
    },
    species: 'Alaria esculenta',
    establishedDate: '2024-05-20',
    area: 1.8,
    depth: '5-15 metre',
    status: 'critical',
    sensors: {
      ph: { value: 6.2, status: 'critical', lastUpdate: '2025-07-03T16:00:00Z' },
      temperature: { value: 12.1, status: 'critical', lastUpdate: '2025-07-03T16:00:00Z' },
      dissolvedOxygen: { value: 4.2, status: 'critical', lastUpdate: '2025-07-03T16:00:00Z' },
      salinity: { value: 1.9, status: 'critical', lastUpdate: '2025-07-03T16:00:00Z' },
      length: { value: 45, status: 'critical', lastUpdate: '2025-07-03T16:00:00Z' },
      growth: { value: -0.5, status: 'critical', lastUpdate: '2025-07-03T16:00:00Z' },
    },
    images: [
      {
        id: 'img_004',
        url: 'https://i.imgur.com/gF0lXjs.png',
        timestamp: '2025-06-09T12:00:00Z',
        description: 'Ciddi çevresel stres - acil müdahale gerekli',
      },
    ],
    actions: [
      {
        id: 'action_003',
        type: 'acil_durdurma',
        status: 'pending',
        description: 'Acil müdahale gerekli',
        aiSuggestion: 'Kritik koşullar tespit edildi. Acil durum müdahale protokolü aktivasyonu.',
        timestamp: '2025-07-03T08:00:00Z',
        confidence: 98,
      },
    ],
  },
  {
    id: 'farm_004',
    name: 'Kıyı Alg Laboratuvarı',
    location: {
      address: 'Hint Okyanusu, Sri Lanka\'nın 80 deniz mili güneyi',
      coordinates: { lat: 5.9197, lng: 80.7718 },
      ocean: 'Hint Okyanusu',
    },
    species: 'Eucheuma denticulatum',
    establishedDate: '2024-08-10',
    area: 4.1,
    depth: '8-18 metre',
    status: 'healthy',
    sensors: {
      ph: { value: 7.2, status: 'optimal', lastUpdate: '2025-07-03T17:50:00Z' },
      temperature: { value: 26.8, status: 'optimal', lastUpdate: '2025-07-03T17:50:00Z' },
      dissolvedOxygen: { value: 7.8, status: 'good', lastUpdate: '2025-07-03T17:50:00Z' },
      salinity: { value: 3.1, status: 'optimal', lastUpdate: '2025-07-03T17:50:00Z' },
      length: { value: 95, status: 'excellent', lastUpdate: '2025-07-03T17:50:00Z' },
      growth: { value: 3.2, status: 'excellent', lastUpdate: '2025-07-03T17:50:00Z' },
    },
    images: [
      {
        id: 'img_005',
        url: 'https://i.imgur.com/5s7zgd5.png',
        timestamp: '2025-06-09T11:30:00Z',
        description: 'Mükemmel büyüme koşulları - hasat için hazır',
      },
    ],
    actions: [
      {
        id: 'action_004',
        type: 'hasat_döngüsü',
        status: 'completed',
        description: '2.1 ton deniz yosunu hasat edildi',
        aiSuggestion: 'Optimal hasat koşulları sağlandı.',
        timestamp: '2025-07-02T14:45:00Z',
        confidence: 96,
      },
    ],
  },
  {
    id: 'farm_005',
    name: 'Akdeniz Su Ürünleri İstasyonu',
    location: {
      address: 'Akdeniz, Kıbrıs\'ın 60 deniz mili güneyi',
      coordinates: { lat: 34.9215, lng: 33.6314 },
      ocean: 'Akdeniz',
    },
    species: 'Gracilaria gracilis',
    establishedDate: '2024-04-15',
    area: 2.9,
    depth: '12-22 metre',
    status: 'healthy',
    sensors: {
      ph: { value: 7.5, status: 'optimal', lastUpdate: '2025-07-03T17:45:00Z' },
      temperature: { value: 24.3, status: 'optimal', lastUpdate: '2025-07-03T17:45:00Z' },
      dissolvedOxygen: { value: 8.8, status: 'excellent', lastUpdate: '2025-07-03T17:45:00Z' },
      salinity: { value: 3.8, status: 'optimal', lastUpdate: '2025-07-03T17:45:00Z' },
      length: { value: 88, status: 'good', lastUpdate: '2025-07-03T17:45:00Z' },
      growth: { value: 2.8, status: 'good', lastUpdate: '2025-07-03T17:45:00Z' },
    },
    images: [
      {
        id: 'img_006',
        url: 'https://i.imgur.com/5s7zgd5.png',
        timestamp: '2025-06-09T09:15:00Z',
        description: 'Optimal Akdeniz koşullarında istikrarlı büyüme',
      },
    ],
    actions: [
      {
        id: 'action_005',
        type: 'ph_ayarlaması',
        status: 'completed',
        description: 'pH seviyeleri optimal aralığa ayarlandı',
        aiSuggestion: 'Bakım başarıyla tamamlandı.',
        timestamp: '2025-07-03T18:00:00Z',
        confidence: 91,
      },
    ],
  },
];

// Generate sensor history data
export const generateSensorHistory = (farmId: string, days: number = 7): SensorReading[] => {
  const history: SensorReading[] = [];
  const now = new Date();
  const farm = mockFarms.find(f => f.id === farmId);
  
  if (!farm) return [];

  for (let i = days * 24; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    
    // Add some variance to simulate realistic sensor readings
    const variance = () => (Math.random() - 0.5) * 0.2;
    
    history.push({
      farmId,
      timestamp: timestamp.toISOString(),
      ph: farm.sensors.ph.value + variance(),
      temperature: farm.sensors.temperature.value + variance() * 2,
      dissolvedOxygen: farm.sensors.dissolvedOxygen.value + variance(),
      salinity: farm.sensors.salinity.value + variance() * 0.5,
      length: farm.sensors.length.value + variance() * 5,
      growth: farm.sensors.growth.value + variance() * 0.3,
    });
  }
  
  return history;
};

// Mock user data
export const mockUser: User = {
  id: 'user_001',
  name: 'Dr. Ahmet Yılmaz',
  email: 'ahmet.yilmaz@ornek.com',
  avatar: '/images/profiles/default-avatar.png',
  role: 'Kıdemli Deniz Biyoloğu',
  organization: 'Deniz Biyolojisi Enstitüsü',
  phone: '+90-555-0123',
  memberSince: '2024-01-15',
  stats: {
    farmsManaged: 5,
    actionsCompleted: 1247,
    dataPointsCollected: 45123,
    storageUsed: '2.3GB / 10GB',
  },
};

// Utility functions
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'healthy':
    case 'optimal':
    case 'excellent':
    case 'good':
      return 'text-green-600';
    case 'warning':
      return 'text-yellow-600';
    case 'critical':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

export const getStatusIcon = (status: string): string => {
  switch (status) {
    case 'healthy':
    case 'optimal':
    case 'excellent':
      return '✅';
    case 'good':
      return '🟢';
    case 'warning':
      return '⚠️';
    case 'critical':
      return '🔴';
    default:
      return '⚪';
  }
};

export const getStatusBadgeClass = (status: string): string => {
  switch (status) {
    case 'healthy':
    case 'optimal':
    case 'excellent':
    case 'good':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'critical':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const formatLastUpdate = (timestamp: string): string => {
  const now = new Date();
  const updateTime = new Date(timestamp);
  const diffInMinutes = Math.floor((now.getTime() - updateTime.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Şimdi';
  if (diffInMinutes < 60) return `${diffInMinutes}dk önce`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}sa önce`;
  return `${Math.floor(diffInMinutes / 1440)}g önce`;
};

// Generate realistic analytics trends
export const generateAnalyticsTrends = (metric: string, timeRange: string): TrendPoint[] => {
  const now = new Date();
  let points: TrendPoint[] = [];
  
  // Determine number of data points and time intervals
  const ranges = {
    '24s': { count: 24, interval: 60 * 60 * 1000, label: (i: number) => `${String(i).padStart(2, '0')}:00` },
    '7g': { count: 7, interval: 24 * 60 * 60 * 1000, label: (i: number) => ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'][i] },
    '30g': { count: 30, interval: 24 * 60 * 60 * 1000, label: (i: number) => `${i + 1}` },
    '90g': { count: 90, interval: 24 * 60 * 60 * 1000, label: (i: number) => i % 15 === 0 ? `${i + 1}. Gün` : '' }
  };

  const config = ranges[timeRange as keyof typeof ranges] || ranges['7g'];
  
  // Base values and realistic patterns for each metric
  const metricConfigs = {
    sicaklik: {
      baseValue: 22,
      range: 8,
      pattern: 'seasonal', // Daily temperature variation
      trends: (i: number, total: number) => {
        if (timeRange === '24s') {
          // Daily temperature cycle
          return Math.sin((i / total) * 2 * Math.PI - Math.PI/2) * 3;
        }
        // Seasonal trends with weekly/monthly variations
        return Math.sin((i / total) * 2 * Math.PI) * 2 + Math.random() * 1.5 - 0.75;
      }
    },
    ph: {
      baseValue: 7.2,
      range: 1.6,
      pattern: 'stable',
      trends: (i: number, total: number) => {
        // pH should be relatively stable with small fluctuations
        return Math.sin((i / total) * 4 * Math.PI) * 0.3 + Math.random() * 0.2 - 0.1;
      }
    },
    cozunmusOksijen: {
      baseValue: 7.5,
      range: 3.5,
      pattern: 'inverse_temp',
      trends: (i: number, total: number) => {
        // Oxygen inversely related to temperature
        if (timeRange === '24s') {
          return -Math.sin((i / total) * 2 * Math.PI - Math.PI/2) * 1.5;
        }
        return -Math.sin((i / total) * 2 * Math.PI) * 1 + Math.random() * 0.8 - 0.4;
      }
    },
    tuzluluk: {
      baseValue: 3.2,
      range: 1.8,
      pattern: 'weather_dependent',
      trends: (i: number, total: number) => {
        // Salinity affected by weather patterns
        const weatherCycle = Math.sin((i / total) * 3 * Math.PI) * 0.5;
        const dailyVar = Math.random() * 0.3 - 0.15;
        return weatherCycle + dailyVar;
      }
    },
    buyume: {
      baseValue: 2.1,
      range: 2.8,
      pattern: 'growth_curve',
      trends: (i: number, total: number) => {
        // Growth follows logistic curve with seasonal variations
        const growthPhase = Math.atan((i / total - 0.5) * 6) * 0.8;
        const seasonalVar = Math.sin((i / total) * 2 * Math.PI) * 0.3;
        return growthPhase + seasonalVar + Math.random() * 0.2 - 0.1;
      }
    }
  };

  const metricConfig = metricConfigs[metric as keyof typeof metricConfigs] || metricConfigs.sicaklik;
  
  for (let i = 0; i < config.count; i++) {
    const timestamp = new Date(now.getTime() - (config.count - 1 - i) * config.interval);
    const trend = metricConfig.trends(i, config.count);
    const value = Math.max(0, metricConfig.baseValue + trend);
    
    points.push({
      time: config.label(i),
      value: Number(value.toFixed(2)),
      farm: mockFarms[i % mockFarms.length].name,
      status: value > metricConfig.baseValue * 1.1 ? 'high' : 
             value < metricConfig.baseValue * 0.9 ? 'low' : 'normal'
    });
  }

  return points;
};

// Simple fallback data generation function
export const generateSimpleTrendData = (metric: string, timeRange: string): TrendPoint[] => {
  const ranges = {
    '24s': { count: 24, label: (i: number) => `${String(i).padStart(2, '0')}:00` },
    '7g': { count: 7, label: (i: number) => ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'][i] },
    '30g': { count: 30, label: (i: number) => `${i + 1}` },
    '90g': { count: 90, label: (i: number) => i % 15 === 0 ? `${i + 1}. Gün` : `${i + 1}` }
  };

  const config = ranges[timeRange as keyof typeof ranges] || ranges['7g'];
  
  const baseValues = {
    sicaklik: 22,
    ph: 7.2,
    cozunmusOksijen: 7.5,
    tuzluluk: 3.2,
    buyume: 2.1
  };

  const baseValue = baseValues[metric as keyof typeof baseValues] || 20;
  
  return Array.from({ length: config.count }, (_, i) => ({
    time: config.label(i),
    value: Number((baseValue + Math.sin(i * 0.5) * 2 + Math.random() * 2 - 1).toFixed(2)),
    status: 'normal'
  }));
};

// Generate comprehensive analytics data for KPIs
export const generateAnalyticsKPIs = () => {
  const now = new Date();
  const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  
  return {
    generalGrowth: {
      current: 12.8,
      previous: 11.1,
      change: 15.2,
      trend: 'up'
    },
    waterQuality: {
      current: 94.2,
      previous: 91.8,
      change: 2.6,
      trend: 'up',
      status: 'optimal'
    },
    energyUsage: {
      current: 1247,
      previous: 1317,
      change: -5.3,
      trend: 'down',
      unit: 'kWh'
    },
    revenue: {
      current: 184350,
      previous: 169420,
      change: 8.7,
      trend: 'up',
      unit: '₺'
    },
    productivity: {
      current: 87.3,
      previous: 82.1,
      change: 6.3,
      trend: 'up',
      unit: '%'
    },
    maintenanceCosts: {
      current: 12400,
      previous: 15300,
      change: -19.0,
      trend: 'down',
      unit: '₺'
    }
  };
};

// Generate farm performance comparison data
export const generateFarmPerformanceData = () => {
  return mockFarms.map((farm, index) => {
    const basePerformance = 65 + (index * 8) + Math.random() * 15;
    const trend = Math.random() > 0.7 ? 'down' : 'up';
    const changeValue = Math.random() * 12 + 2;
    
    return {
      farmId: farm.id,
      farmName: farm.name,
      performance: Number(basePerformance.toFixed(1)),
      efficiency: Number((basePerformance * 0.9 + Math.random() * 10).toFixed(1)),
      growthRate: Number((farm.sensors.growth.value + Math.random() * 0.5).toFixed(2)),
      energyEfficiency: Number((85 + Math.random() * 20).toFixed(1)),
      waterQuality: Number((88 + Math.random() * 12).toFixed(1)),
      trend: trend,
      change: Number(changeValue.toFixed(1)),
      status: farm.status,
      lastUpdate: farm.sensors.growth.lastUpdate
    };
  });
};

// Generate prediction data
export const generatePredictionData = () => {
  const predictions = [
    {
      type: 'growth',
      title: 'Büyüme Tahmini',
      description: 'Mevcut trendlere dayalı olarak önümüzdeki 30 günde %18 büyüme artışı bekleniyor.',
      confidence: 87,
      timeframe: '30 gün',
      impact: 'positive',
      icon: '🔮'
    },
    {
      type: 'harvest',
      title: 'Hasat Tahmini',
      description: 'Gelecek hafta optimal hasat penceresi öngörülüyor. Tahmini verim: 2.3 ton.',
      confidence: 92,
      timeframe: '7 gün',
      impact: 'positive',
      icon: '🌱'
    },
    {
      type: 'weather',
      title: 'Hava Durumu Uyarısı',
      description: 'Fırtına sistemi yaklaşıyor. Çiftlik C için koruyucu önlemler düşünün.',
      confidence: 78,
      timeframe: '3 gün',
      impact: 'warning',
      icon: '⚠️'
    },
    {
      type: 'maintenance',
      title: 'Bakım Önerisi',
      description: 'pH sensörleri kalibrasyonu önerilir. Doğruluk oranında %5 sapma tespit edildi.',
      confidence: 83,
      timeframe: '14 gün',
      impact: 'neutral',
      icon: '🔧'
    },
    {
      type: 'market',
      title: 'Pazar Fırsatı',
      description: 'Organik alg ürünlerine olan talep %25 artış gösteriyor. Fiyat artışı bekleniyor.',
      confidence: 71,
      timeframe: '60 gün',
      impact: 'positive',
      icon: '📈'
    }
  ];

  return predictions;
};

// Generate historical data for long-term trends
export const generateHistoricalAnalytics = (days: number = 90): AnalyticsData[] => {
  const data: AnalyticsData[] = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    
    // Simulate seasonal patterns
    const seasonalFactor = Math.sin((365 - i) / 365 * 2 * Math.PI) * 0.3 + 1;
    const weeklyPattern = Math.sin(i / 7 * 2 * Math.PI) * 0.1 + 1;
    const randomVariation = Math.random() * 0.2 + 0.9;
    
    const combinedFactor = seasonalFactor * weeklyPattern * randomVariation;
    
    data.push({
      timestamp: date.toISOString(),
      ph: 7.2 + (Math.random() - 0.5) * 0.6,
      temperature: 20 + Math.sin(i / 30 * 2 * Math.PI) * 4 + (Math.random() - 0.5) * 2,
      dissolvedOxygen: 8.0 + (Math.random() - 0.5) * 2,
      salinity: 3.2 + (Math.random() - 0.5) * 0.8,
      growth: 2.1 * combinedFactor + (Math.random() - 0.5) * 0.5,
      productivity: 75 + combinedFactor * 15 + (Math.random() - 0.5) * 10,
      energyUsage: 1200 + Math.random() * 300,
      revenue: 150000 + combinedFactor * 50000 + Math.random() * 20000,
      waterQuality: 90 + Math.random() * 10
    });
  }
  
  return data;
};

// Working image URLs for the application
export const getWorkingImageUrl = (type: 'healthy' | 'warning' | 'critical' | 'growth' | 'analysis'): string => {
  const imageUrls = {
    healthy: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&crop=water',
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop&crop=nature',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=water'
    ],
    warning: [
      'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=400&h=300&fit=crop&crop=water',
      'https://images.unsplash.com/photo-1569163139394-de44cb800a4d?w=400&h=300&fit=crop&crop=nature'
    ],
    critical: [
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop&crop=water',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=nature'
    ],
    growth: [
      'https://images.unsplash.com/photo-1502780402662-acc01917aa01?w=400&h=300&fit=crop&crop=nature',
      'https://images.unsplash.com/photo-1502836249271-526ed8d87eb0?w=400&h=300&fit=crop&crop=water'
    ],
    analysis: [
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=water'
    ]
  };
  
  const urls = imageUrls[type];
  return urls[Math.floor(Math.random() * urls.length)];
};
