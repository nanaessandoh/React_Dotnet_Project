using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Read;
using Mapster;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
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
                return await _context.Activities
                    .ProjectToType<Read.Activity>(_mapper.Config)
                    .AsNoTracking()
                    .ToListAsync(cancellationToken);
            }
        }
    }
}