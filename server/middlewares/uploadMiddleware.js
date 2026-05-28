import multer from 'multer';
import cloudinary from '../config/cloudinary.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'profileImage') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (jpeg, png, webp, etc.) are allowed for profile image!'), false);
    }
  } else if (file.fieldname === 'resume') {
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents (.doc, .docx) are allowed for resume!'), false);
    }
  } else {
    cb(new Error('Unknown field!'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

export const uploadFields = upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]);

export const getPublicIdFromUrl = (url, isRaw = false) => {
  if (!url || url === 'placeholder') return null;
  const uploadIndex = url.indexOf('/upload/');
  if (uploadIndex === -1) return null;
  
  const publicIdWithVersionAndExt = url.substring(uploadIndex + 8);
  const firstSlashIndex = publicIdWithVersionAndExt.indexOf('/');
  let publicIdWithExt = publicIdWithVersionAndExt;
  
  if (publicIdWithVersionAndExt.startsWith('v') && firstSlashIndex !== -1 && /^\d+$/.test(publicIdWithVersionAndExt.substring(1, firstSlashIndex))) {
    publicIdWithExt = publicIdWithVersionAndExt.substring(firstSlashIndex + 1);
  }
  
  if (isRaw) {
    return publicIdWithExt;
  }
  
  const lastDotIndex = publicIdWithExt.lastIndexOf('.');
  if (lastDotIndex !== -1) {
    return publicIdWithExt.substring(0, lastDotIndex);
  }
  return publicIdWithExt;
};

export const deleteFromCloudinary = async (url, resourceType = 'image') => {
  const isRaw = resourceType === 'raw';
  const publicId = getPublicIdFromUrl(url, isRaw);
  if (publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
      console.log(`Cloudinary asset deleted. Public ID: ${publicId}. Result:`, result);
    } catch (err) {
      console.error(`Failed to delete asset from Cloudinary (Public ID: ${publicId}): ${err.message}`);
    }
  }
};

export const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.files) {
      return next();
    }

    const uploadStream = (fileBuffer, folder, resourceType = 'auto') => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: folder,
            resource_type: resourceType
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(fileBuffer);
      });
    };

    if (req.files.profileImage && req.files.profileImage[0]) {
      const file = req.files.profileImage[0];
      const result = await uploadStream(file.buffer, 'job_portal/profile_images', 'image');
      
      if (req.user && req.user.profileImage && req.user.profileImage !== 'placeholder') {
        await deleteFromCloudinary(req.user.profileImage, 'image');
      }
      
      req.body.profileImage = result.secure_url;
    }

    if (req.files.resume && req.files.resume[0]) {
      const file = req.files.resume[0];
      const result = await uploadStream(file.buffer, 'job_portal/resumes', 'raw');
      
      if (req.user && req.user.resume) {
        await deleteFromCloudinary(req.user.resume, 'raw');
      }
      
      req.body.resume = result.secure_url;
    }

    next();
  } catch (error) {
    next(error);
  }
};
