using Entities = Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;

namespace Persistence
{
    public class AppDbContext : DbContext, IAppDbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Entities.Activity> Activities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Entities.Activity>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
            });
        }

        public new async Task<bool> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            int rowAffected = await base.SaveChangesAsync(cancellationToken);
            return rowAffected > 0;
        }

        public new bool SaveChanges()
        {
            int rowAffected = base.SaveChanges();
            return rowAffected > 0;
        }
    }
}