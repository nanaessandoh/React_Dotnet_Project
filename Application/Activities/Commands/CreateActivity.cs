using System.Threading.Tasks;
using MediatR;
using Write = Domain.Write;
using Entity = Domain.Entities;
using Read = Domain.Read;
using Persistence;
using MapsterMapper;
using System.Threading;
using FluentValidation;
using Application.Extensions;
using Application.Exceptions;

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
            private readonly IValidator<Write.Activity> _validator;

            public Handler(AppDbContext context, IMapper mapper, IValidator<Write.Activity> validator)
            {
                _context = context;
                _mapper = mapper;
                _validator = validator;
            }

            public async Task<Read.Activity> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = request.Activity;
                await _validator.ValidateAndThrowAsync(activity, Domain.Validations.RuleSet.Create, cancellationToken);
                var activityEntity = _mapper.Map<Entity.Activity>(activity);
                await _context.Activities.AddAsync(activityEntity, cancellationToken);
                var result = await _context.SaveChangesAsync(cancellationToken);

                if (!result)
                {
                    throw new BadRequestException("Failed to create activity");
                }

                return _mapper.Map<Read.Activity>(activityEntity);
            }
        }
    }
}