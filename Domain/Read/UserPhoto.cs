using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Read
{
    public class UserPhoto
    {
        public Guid Id { get; set; }
        public required string Url { get; set; }
        public required string PublicId { get; set; }
        public required Guid UserId { get; set; }
    }
}