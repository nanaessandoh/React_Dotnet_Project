using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Read = Domain.Read;

namespace Application.Profiles.Query
{
    public class GetProfile
    {
        public class Query : IRequest<Read.UserProfile>
        {
            public required Guid UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Read.UserProfile>
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

            public async Task<Read.UserProfile> Handle(Query request, CancellationToken cancellationToken)
            {
                var profile = await _context.Users
                    .ProjectTo<Read.UserProfile>(_mapper.ConfigurationProvider, new { currentUserId = _userAccessor.GetUserId() })
                    .FirstOrDefaultAsync(u => u.UserId == request.UserId, cancellationToken);

                if (profile == null)
                {
                    throw new BadRequestException("User profile not found");
                }

                return profile;
            }
        }
    }
}