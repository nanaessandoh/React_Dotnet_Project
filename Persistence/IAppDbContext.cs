using Entities = Domain.Entities;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Persistence
{
    public interface IAppDbContext
    {
        DbSet<Entities.User> Users { get; set; }
        DbSet<Entities.Activity> Activities { get; set; }
        DbSet<Entities.ActivityAttendee> ActivityAttendees { get; set; }
        bool SaveChanges();
        Task<bool> SaveChangesAsync(CancellationToken cancellationToken = default);
        DbSet<TEntity> Set<TEntity>() where TEntity : class;
        DatabaseFacade Database { get; }
    }
}