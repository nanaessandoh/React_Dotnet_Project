using System;
using System.Threading;
using System.Threading.Tasks;
using Read = Domain.Read;
using MediatR;
using Persistence;
using MapsterMapper;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Read.Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Read.Activity>
        {
            private readonly AppDbContext _context;
            private readonly IMapper _mapper;

            public Handler(AppDbContext contex, IMapper mapper)
            {
                _context = contex;
                _mapper = mapper;
            }

            public async Task<Read.Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                return _mapper.Map<Read.Activity>(activity);
            }
        }
    }
}