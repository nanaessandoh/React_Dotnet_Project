using Entities = Domain.Entities;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Persistence
{
    public interface IAppDbContext
    {
        DbSet<Entities.Activity> Activities { get; set; }
        int SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
        DbSet<TEntity> Set<TEntity>() where TEntity : class;
        DatabaseFacade Database { get; }
    }
}