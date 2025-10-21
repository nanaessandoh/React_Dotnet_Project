using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Read = Domain.Read;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MapsterMapper;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Read.Activity>>
        {

        }

        public class Handler : IRequestHandler<Query, List<Read.Activity>>
        {
            private readonly AppDbContext _context;
            private readonly IMapper _mapper;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<List<Read.Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities.AsNoTracking().ToListAsync();
                return _mapper.Map<List<Read.Activity>>(activities);
            }
        }
    }
}