using FluentValidation;
using Write = Domain.Write;

namespace Application.Activities.Validators
{
    public class UserProfileValidator : AbstractValidator<Write.UserProfile>
    {
        public UserProfileValidator()
        {
            RuleSet(Domain.Validations.RuleSet.Update, () =>
            {
                RuleFor(a => a.DisplayName)
                    .NotEmpty()
                    .WithMessage("Display name is required")
                    .When(a => a.IncludedProperties.Contains(nameof(a.DisplayName)));
            });
        }
    }
}