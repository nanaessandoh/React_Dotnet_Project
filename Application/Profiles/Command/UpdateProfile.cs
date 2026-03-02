using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Extensions;
using Application.Interfaces;
using FluentValidation;
using MediatR;
using Persistence;
using Write = Domain.Write;

namespace Application.Profiles.Command
{
    public class UpdateProfile
    {
        public class Command : IRequest
        {
            public required Write.UserProfile UserProfile { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly IAppDbContext _context;
            private readonly IValidator<Write.UserProfile> _validator;

            public Handler(IUserAccessor userAccessor, IAppDbContext appDbContext, IValidator<Write.UserProfile> validator)
            {
                _userAccessor = userAccessor;
                _context = appDbContext;
                _validator = validator;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userAccessor.GetUserAsync();

                if (user is null)
                {
                    throw new BadRequestException("User is not  logged in");
                }

                await _validator.ValidateAndThrowAsync(request.UserProfile, Domain.Validations.RuleSet.Update, cancellationToken);

                _context.Users.Update(user);
                user.DisplayName = request.UserProfile.DisplayName;
                user.Bio = request.UserProfile.Bio;

                var result = await _context.SaveChangesAsync(cancellationToken);

                if (!result)
                {
                    throw new BadRequestException("Failed to update user profile");
                }
            }
        }
    }
}