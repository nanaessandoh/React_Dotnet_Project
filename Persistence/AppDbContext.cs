using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence
{
    public class AppDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>, IAppDbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public required DbSet<Activity> Activities { get; set; }
        public required DbSet<ActivityAttendee> ActivityAttendees { get; set; }
        public required DbSet<UserPhoto> UserPhotos { get; set; }
        public required DbSet<Comment> Comments { get; set; }
        public required DbSet<UserFollowing> UserFollowings { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Activity>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<ActivityAttendee>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.ActivityId });

                entity.HasOne(e => e.User)
                    .WithMany(u => u.Activities)
                    .HasForeignKey(e => e.UserId);

                entity.HasOne(e => e.Activity)
                    .WithMany(a => a.Attendees)
                    .HasForeignKey(e => e.ActivityId);
            });

            modelBuilder.Entity<UserFollowing>(entity =>
            {
                entity.HasKey(e => new { e.FollowerId, e.UserId });

                entity.HasOne(f => f.Follower)
                    .WithMany(f => f.Followings)
                    .HasForeignKey(f => f.FollowerId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(u => u.User)
                    .WithMany(u => u.Followers)
                    .HasForeignKey(u => u.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
                v => v.ToUniversalTime(),
                v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
            );

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    if (property.ClrType == typeof(DateTime))
                    {
                        property.SetValueConverter(dateTimeConverter);
                    }
                }
            }
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