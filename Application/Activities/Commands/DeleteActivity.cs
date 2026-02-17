using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class DeleteActivity
    {
        public class Command : IRequest
        {
            public required Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IAppDbContext _context;

            public Handler(IAppDbContext context)
            {
                _context = context;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id, cancellationToken);

                if (activity == null)
                {
                    throw new NotFoundException("Activity not found");
                }

                _context.Activities.Remove(activity);
                var result = await _context.SaveChangesAsync(cancellationToken);

                if (!result)
                {
                    throw new BadRequestException("Failed to delete activity");
                }
            }
        }
    }
}