using System;
using System.Threading.Tasks;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IUserAccessor
    {
        Guid GetUserId();
        Task<User> GetUserAsync();
    }
}