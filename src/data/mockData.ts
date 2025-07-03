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
        url: '/api/placeholder/400/300',
        timestamp: '2025-06-09T18:00:00Z',
        description: 'Büyüme izleme - üstel faz',
      },
      {
        id: 'img_002',
        url: '/api/placeholder/400/300',
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
        url: '/api/placeholder/400/300',
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
        url: '/api/placeholder/400/300',
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
        url: '/api/placeholder/400/300',
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
        url: '/api/placeholder/400/300',
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
