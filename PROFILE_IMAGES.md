# Profile Image Management Guide

## 📁 Folder Structure

```
public/
├── images/
│   └── profiles/
│       ├── default-avatar.svg          # Default fallback avatar
│       ├── user-123.jpg               # User uploaded images
│       ├── user-456.png               # User uploaded images
│       └── ...
```

## 🖼️ Where to Put Profile Images

### Option 1: Public Folder (✅ Recommended)
- **Location**: `public/images/profiles/`
- **Access**: Direct URL access via `/images/profiles/filename.jpg`
- **Best for**: Static images, uploaded images, default avatars
- **Example**: 
  ```jsx
  <img src="/images/profiles/user-123.jpg" alt="Profile" />
  ```

### Option 2: Assets Folder (For bundled images)
- **Location**: `src/assets/images/profiles/`
- **Access**: Import required
- **Best for**: Default images that are part of the build
- **Example**:
  ```jsx
  import defaultAvatar from '../assets/images/profiles/default.png';
  <img src={defaultAvatar} alt="Profile" />
  ```

## 📋 Image Requirements

### File Types
- ✅ JPEG (.jpg, .jpeg)
- ✅ PNG (.png)
- ✅ WebP (.webp)
- ✅ SVG (.svg) - for default avatars

### Size Limits
- **Maximum file size**: 5MB
- **Recommended dimensions**: 256x256px or 512x512px (square)
- **Minimum dimensions**: 128x128px

### Naming Convention
- Default avatar: `default-avatar.svg`
- User uploads: `user-{userId}.{extension}`
- Team members: `team-{name}.{extension}`

## 🔧 Implementation

### 1. Upload Handler
```jsx
const handleImageUpload = async (file) => {
  if (!validateImageFile(file)) return;
  
  const imageUrl = await uploadProfileImage(file);
  setProfileImage(imageUrl);
};
```

### 2. Display Component
```jsx
<div className="w-24 h-24 rounded-full overflow-hidden">
  <img 
    src={profileImage || getDefaultProfileImage()} 
    alt="Profile" 
    className="w-full h-full object-cover"
  />
</div>
```

### 3. Utility Functions
- `getProfileImageUrl(imageName)` - Get full URL for image
- `getDefaultProfileImage()` - Get default avatar URL
- `uploadProfileImage(file)` - Handle file upload
- `validateImageFile(file)` - Validate file type and size

## 🎨 Current Default Avatar

We've created a beautiful gradient SVG avatar that matches your app's ocean theme:
- Location: `/public/images/profiles/default-avatar.svg`
- Colors: Blue to green gradient
- Icon: Simple user silhouette
- Size: Scalable SVG

## 🚀 Usage in Components

### Settings Page
The profile image is now fully functional in the Settings page with:
- File upload with validation
- Loading states during upload
- Remove image functionality
- Default avatar fallback

### Sidebar
The sidebar already supports profile images via the `userAvatar` prop.

### Other Components
You can use the utility functions anywhere in your app:
```jsx
import { getDefaultProfileImage } from '../utils/profileImage';

const UserCard = ({ user }) => (
  <img src={user.avatar || getDefaultProfileImage()} alt={user.name} />
);
```

## 📝 Example Images to Add

You can add these example profile images to test the functionality:

1. **Team Members**: Add photos of your team
2. **Test Users**: Create sample user avatars
3. **Placeholder Images**: Various default avatars for different user types

## 🔄 Future Enhancements

- **Image Resizing**: Automatically resize uploaded images
- **Crop Tool**: Allow users to crop their images
- **Cloud Storage**: Integrate with AWS S3, Cloudinary, etc.
- **Avatar Generator**: Generate avatars from user initials
- **Social Login**: Import avatars from social media accounts
