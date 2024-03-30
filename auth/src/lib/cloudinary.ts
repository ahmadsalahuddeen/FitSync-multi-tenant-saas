const cloudinary = require('cloudinary');

// config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploads = (file: any, folder: any) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      (result: { public_id: string; url: string }) => {
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      },

      {
        resource_type: 'auto',
        folder: folder,
      }
    );
  });
};

export { uploads, cloudinary };
