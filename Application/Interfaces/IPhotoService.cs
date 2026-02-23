using System.Threading.Tasks;
using Application.UserPhotos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IPhotoService
    {
        Task<PhotoUploadResult> UploadPhotoAsync(IFormFile file);
        Task<string> DeletePhotoAsync(string publicId);
    }
}