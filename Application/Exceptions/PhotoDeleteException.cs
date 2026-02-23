using System;

namespace Application.Exceptions
{
    public class PhotoDeleteException : Exception
    {
        public PhotoDeleteException(string message) : base(message)
        {
        }

        public PhotoDeleteException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}