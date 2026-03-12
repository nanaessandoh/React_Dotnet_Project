using System;

namespace Domain.Entities
{
    public class UserFollowing
    {
        public required Guid FollowerId { get; set; }
        public User Follower { get; set; } = null!;
        public required Guid UserId { get; set; }
        public User User { get; set; } = null!;
    }
}