using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Read;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Read = Domain.Read;

namespace Application.Activities.Queries
{
    public class GetAllActivities
    {
        public class Query : IRequest<List<Read.Activity>> { }

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly IAppDbContext _context;
            private readonly IMapper _mapper;

            public Handler(IAppDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities.AsNoTracking().ToListAsync(cancellationToken);
                return _mapper.Map<List<Read.Activity>>(activities);
            }
        }
    }
}