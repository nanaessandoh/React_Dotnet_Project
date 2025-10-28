using System;
using System.Threading.Tasks;
using MediatR;
using Write = Domain.Write;
using Persistence;
using MapsterMapper;
using System.Threading;

namespace Application.Activities.Commands
{
    public class EditActivity
    {
        public class Command : IRequest
        {
            public required Write.Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IAppDbContext _context;
            private readonly IMapper _mapper;

            public Handler(IAppDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id, cancellationToken);

                if (activity == null)
                {
                    throw new Exception("Activity not found");
                }

                _context.Activities.Update(activity);
                _mapper.Map(request.Activity, activity);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
        
    }
}