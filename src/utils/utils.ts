export const validateImage = (image: Express.Multer.File): boolean => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!image.mimetype || !allowedMimeTypes.includes(image.mimetype)) {
    return false;
  }
  const extension = image.originalname.toLowerCase().split('.').pop();
  const allowedExtensions = ['jpeg', 'jpg', 'png'];
  return allowedExtensions.includes(extension);
};

export const validateFile = (file: Express.Multer.File): boolean => {
  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  if (!file.mimetype || !allowedMimeTypes.includes(file.mimetype)) {
    return false;
  }
  const extension = file.originalname.toLowerCase().split('.').pop();
  const allowedExtensions = ['pdf', 'doc', 'docx'];
  return allowedExtensions.includes(extension);
};
