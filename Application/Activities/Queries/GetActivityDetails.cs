using System;
using Read = Domain.Read;
using MapsterMapper;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Persistence;
using Application.Exceptions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Mapster;

namespace Application.Activities.Queries
{
    public class GetActivityDetails
    {
        public class Query : IRequest<Read.Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Read.Activity>
        {
            private readonly IAppDbContext _context;
            private readonly IMapper _mapper;

            public Handler(AppDbContext contex, IMapper mapper)
            {
                _context = contex;
                _mapper = mapper;
            }

            public async Task<Read.Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .ProjectToType<Read.Activity>(_mapper.Config)
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                if (activity == null)
                {
                    throw new NotFoundException("Activity not found");
                }

                return activity;
            }
        }
    }
}