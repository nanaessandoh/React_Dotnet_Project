using System;
using System.Threading.Tasks;
using MediatR;
using Write = Domain.Write;
using Persistence;
using MapsterMapper;
using System.Threading;
using Application.Exceptions;
using FluentValidation;
using Application.Extensions;

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
            private readonly IValidator<Write.Activity> _validator;

            public Handler(IAppDbContext context, IMapper mapper, IValidator<Write.Activity> validator)
            {
                _context = context;
                _mapper = mapper;
                _validator = validator;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.Activity.Id == Guid.Empty)
                {
                    throw new BadRequestException("Activity Id is required for update");
                }

                var activity = await _context.Activities.FindAsync(request.Activity.Id, cancellationToken);

                if (activity == null)
                {
                    throw new NotFoundException("Activity not found");
                }

                await _validator.ValidateAndThrowAsync(request.Activity, Domain.Validations.RuleSet.Update, cancellationToken);

                _context.Activities.Update(activity);
                _mapper.Map(request.Activity, activity);
                var result = await _context.SaveChangesAsync(cancellationToken);

                if (!result)
                {
                    throw new BadRequestException("Failed to update activity");
                }
            }
        }

    }
}