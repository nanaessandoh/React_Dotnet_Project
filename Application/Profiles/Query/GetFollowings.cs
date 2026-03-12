using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
            private readonly IUserAccessor _userAccessor;

            public Handler(IAppDbContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<List<Read.UserProfile>> Handle(Query request, CancellationToken cancellationToken)
            {
                // followings
                if (request.FollowingType == FollowingType.following)
                {
                    return await _context.UserFollowings
                        .Where(uf => uf.FollowerId == request.UserId)
                        .Select(uf => uf.User)
                        .ProjectTo<Read.UserProfile>(_mapper.ConfigurationProvider, new { currentUserId = _userAccessor.GetUserId() })
                        .ToListAsync(cancellationToken);
                }
                // followers
                else
                {
                    return await _context.UserFollowings
                        .Where(uf => uf.UserId == request.UserId)
                        .Select(uf => uf.Follower)
                        .ProjectTo<Read.UserProfile>(_mapper.ConfigurationProvider, new { currentUserId = _userAccessor.GetUserId() })
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