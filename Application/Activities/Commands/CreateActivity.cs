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
using Application.Interfaces;

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
            private readonly IUserAccessor _userAccessor;

            public Handler(AppDbContext context, IMapper mapper, IValidator<Write.Activity> validator, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _validator = validator;
                _userAccessor = userAccessor;
            }

            public async Task<Read.Activity> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = request.Activity;
                var user = await _userAccessor.GetUserAsync();
                await _validator.ValidateAndThrowAsync(activity, Domain.Validations.RuleSet.Create, cancellationToken);
                var activityEntity = _mapper.Map<Entity.Activity>(activity);
                var attendee = new Entity.ActivityAttendee
                {
                    ActivityId = activityEntity.Id,
                    UserId = user.Id,
                    IsHost = true
                };
                activityEntity.Attendees.Add(attendee);

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