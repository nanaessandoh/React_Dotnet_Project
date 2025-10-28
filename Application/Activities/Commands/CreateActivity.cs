using System.Threading.Tasks;
using MediatR;
using Write = Domain.Write;
using Entity = Domain.Entities;
using Read = Domain.Read;
using Persistence;
using MapsterMapper;
using System.Threading;

namespace Application.Activities.Commands
{
    public class CreateActivity
    {
        public class Command : IRequest<Read.Activity>
        {
            public required Write.Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command, Read.Activity>
        {
            private readonly IAppDbContext _context;
            private readonly IMapper _mapper;

            public Handler(AppDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Read.Activity> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = request.Activity;
                var activityEntity = _mapper.Map<Entity.Activity>(activity);
                await _context.Activities.AddAsync(activityEntity, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                return _mapper.Map<Read.Activity>(activityEntity);
            }
        }
    }
}