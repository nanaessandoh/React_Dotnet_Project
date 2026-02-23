using Application.Exceptions;
using Application.Interfaces;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Infrastructure.Photos;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;
        public PhotoService(CloudinarySettings settings)
        {
            var account = new Account(settings.CloudName, settings.ApiKey, settings.ApiSecret);
            _cloudinary = new Cloudinary(account);
        }

        public async Task<PhotoUploadResult> UploadPhotoAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                throw new InvalidFileException("Invalid file provided.");
            }

            await using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                // Transformation = new Transformation().Width(500).Height(500)
                Folder = "ReactivitiesUsers"
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            if (uploadResult.Error != null)
            {
                throw new PhotoUploadException(uploadResult.Error.Message);
            }

            return new PhotoUploadResult
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUrl.AbsoluteUri
            };
        }

        public async Task<string> DeletePhotoAsync(string publicId)
        {
            var deletionParams = new DeletionParams(publicId);
            var deletionResult = await _cloudinary.DestroyAsync(deletionParams);

            if (deletionResult.Error != null)
            {
                throw new PhotoDeleteException(deletionResult.Error.Message);
            }

            return deletionResult.Result;
        }
    }
}