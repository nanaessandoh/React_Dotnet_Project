using System;

namespace Application.UserPhotos
{
    public class PhotoUploadResult
    {
        public required string PublicId { get; set; }
        public required string Url { get; set; }
    }
}