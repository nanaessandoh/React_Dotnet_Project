using System;

namespace Application.Exceptions
{
    public class PhotoUploadException : Exception
    {
        public PhotoUploadException(string message) : base(message)
        {
        }

        public PhotoUploadException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}