using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interfaces;
using Mapster;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
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

            public Handler(IAppDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Read.UserProfile> Handle(Query request, CancellationToken cancellationToken)
            {
                var profile = await _context.Users
                    .ProjectToType<Read.UserProfile>(_mapper.Config)
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