using System;
using Read = Domain.Read;
using MediatR;
using System.Collections.Generic;
using System.Threading.Tasks;

using System.Threading;
using Persistence;
using MapsterMapper;
using System.Linq;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace Application.Comments.Queries
{
    public class GetComments
    {
        public class Query : IRequest<List<Read.Comment>>
        {
            public required Guid ActivityId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<Read.Comment>>
        {
            private readonly IAppDbContext _context;
            private readonly IMapper _mapper;

            public Handler(IAppDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<Read.Comment>> Handle(Query request, CancellationToken cancellationToken)
            {
                var comments = await _context.Comments
                    .Where(x => x.ActivityId == request.ActivityId)
                    .OrderByDescending(x => x.CreatedTimestamp)
                    .ProjectToType<Read.Comment>(_mapper.Config)
                    .ToListAsync(cancellationToken);

                return comments;
            }
        }

    }
}