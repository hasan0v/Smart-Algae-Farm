// Profile image helper functions
export const getProfileImageUrl = (imageName: string) => {
  return `/images/profiles/${imageName}`;
};

export const getDefaultProfileImage = () => {
  return '/images/profiles/default-avatar.png';
};

export const uploadProfileImage = async (file: File): Promise<string> => {
  // In a real app, this would upload to a server or cloud storage
  // For demo purposes, we'll return a mock URL
  const formData = new FormData();
  formData.append('profile-image', file);
  
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock uploaded image URL
  return `/images/profiles/user-${Date.now()}.${file.name.split('.').pop()}`;
};

export const validateImageFile = (file: File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    alert('Lütfen geçerli bir resim dosyası seçin (JPEG, PNG veya WebP)');
    return false;
  }
  
  if (file.size > maxSize) {
    alert('Resim dosyası boyutu 5MB\'dan küçük olmalıdır');
    return false;
  }
  
  return true;
};
