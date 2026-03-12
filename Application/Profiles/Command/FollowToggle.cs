using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Command
{
    public class FollowToggle
    {
        public class Command : IRequest
        {
            public required Guid UserToFollowId { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IAppDbContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(IAppDbContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var currentuser = await _userAccessor.GetUserAsync();
                var userToFollow = await _context.Users.FindAsync(request.UserToFollowId, cancellationToken);

                if (userToFollow is null)
                {
                    throw new BadRequestException("User to follow not found");
                }

                var following = await _context.UserFollowings
                    .FindAsync([currentuser.Id, userToFollow.Id], cancellationToken);

                if (following is null)
                {
                    await _context.UserFollowings.AddAsync(new Domain.Entities.UserFollowing
                    {
                        FollowerId = currentuser.Id,
                        UserId = userToFollow.Id
                    });
                }
                else
                {
                    _context.UserFollowings.Remove(following);
                }

                var result = await _context.SaveChangesAsync(cancellationToken);

                if (!result)
                {
                    throw new BadRequestException("Failed to update user following");
                }
            }
        }
    }
}