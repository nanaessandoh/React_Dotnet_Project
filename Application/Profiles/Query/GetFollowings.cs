using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Mapster;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Read = Domain.Read;

namespace Application.Profiles.Query
{
    public class GetFollowings
    {
        public class Query : IRequest<List<Read.UserProfile>>
        {
            public required Guid UserId { get; set; }
            public required FollowingType FollowingType { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<Read.UserProfile>>
        {
            private readonly IAppDbContext _context;
            private readonly IMapper _mapper;

            public Handler(IAppDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<Read.UserProfile>> Handle(Query request, CancellationToken cancellationToken)
            {
                // followings
                if (request.FollowingType == FollowingType.following)
                {
                    return await _context.UserFollowings
                        .Where(uf => uf.FollowerId == request.UserId)
                        .Select(uf => uf.User)
                        .ProjectToType<Read.UserProfile>(_mapper.Config)
                        .ToListAsync(cancellationToken);
                }
                // followers
                else
                {
                    return await _context.UserFollowings
                        .Where(uf => uf.UserId == request.UserId)
                        .Select(uf => uf.Follower)
                        .ProjectToType<Read.UserProfile>(_mapper.Config)
                        .ToListAsync(cancellationToken);
                }
            }
        }
    }

    public enum FollowingType
    {
        following = 0,
        followers = 1
    }
}