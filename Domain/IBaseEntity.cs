using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Domain
{
    public interface IBaseEntity
    {
        [Key]
        public Guid Id { get; set; }
    }
}