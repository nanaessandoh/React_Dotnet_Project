using System.Threading;
using System.Threading.Tasks;
using Write = Domain.Write;
using Entity = Domain.Entities;
using MediatR;
using Persistence;
using MapsterMapper;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Write.Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly AppDbContext _context;
            private readonly IMapper _mapper;

            public Handler(AppDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = request.Activity;
                var activityEntity = _mapper.Map<Entity.Activity>(activity);
                _context.Activities.Add(activityEntity);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }

            Task IRequestHandler<Command>.Handle(Command request, CancellationToken cancellationToken)
            {
                return Handle(request, cancellationToken);
            }
        }
    }
}