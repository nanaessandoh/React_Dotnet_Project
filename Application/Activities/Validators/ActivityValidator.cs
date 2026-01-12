using FluentValidation;
using Write = Domain.Write;

namespace Application.Activities.Validators
{
    public class ActivityValidator : AbstractValidator<Write.Activity>
    {
        public ActivityValidator()
        {
            RuleSet(Domain.Validations.RuleSet.Create + Domain.Validations.RuleSet.Update, () =>
            {
                RuleFor(a => a.Title).NotEmpty().WithMessage("Title is required");
                RuleFor(a => a.Description).NotEmpty().WithMessage("Description is required");
            });
        }
        
    }
}