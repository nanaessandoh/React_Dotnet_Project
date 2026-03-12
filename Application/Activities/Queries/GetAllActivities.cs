using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Read = Domain.Read;

namespace Application.Activities.Queries
{
    public class GetAllActivities
    {
        public class Query : IRequest<List<Read.Activity>> { }

        public class Handler : IRequestHandler<Query, List<Read.Activity>>
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

            public async Task<List<Read.Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities
                    .ProjectTo<Read.Activity>(_mapper.ConfigurationProvider, new { currentUserId = _userAccessor.GetUserId() })
                    .AsNoTracking()
                    .ToListAsync(cancellationToken);
            }
        }
    }
}