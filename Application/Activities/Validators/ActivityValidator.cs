using System;
using FluentValidation;
using Write = Domain.Write;

namespace Application.Activities.Validators
{
    public class ActivityValidator : AbstractValidator<Write.Activity>
    {
        public ActivityValidator()
        {
            RuleSet(Domain.Validations.RuleSet.Create, () =>
            {
                RuleFor(a => a.Title)
                    .NotEmpty()
                    .WithMessage("Title is required");
                RuleFor(a => a.Description)
                    .NotEmpty()
                    .WithMessage("Description is required");
                RuleFor(a => a.Category)
                    .NotEmpty()
                    .WithMessage("Category is required");
                RuleFor(a => a.Date)
                    .GreaterThan(DateTime.UtcNow)
                    .WithMessage("Date must be in the future");
                RuleFor(a => a.City)
                    .NotEmpty()
                    .WithMessage("City is required");
                RuleFor(a => a.Venue)
                    .NotEmpty()
                    .WithMessage("Venue is required");
                RuleFor(a => a.Latitude)
                    .NotEmpty()
                    .WithMessage("Latitude is required")
                    .InclusiveBetween(-90, 90)
                    .WithMessage("Latitude must be between -90 and 90");
                RuleFor(a => a.Longitude)
                    .NotEmpty()
                    .WithMessage("Longitude is required")
                    .InclusiveBetween(-180, 180)
                    .WithMessage("Longitude must be between -180 and 180");
            });

            RuleSet(Domain.Validations.RuleSet.Update, () =>
            {
                RuleFor(a => a.Title)
                    .NotEmpty()
                    .WithMessage("Title is required")
                    .When(a => a.IncludedProperties.Contains(nameof(a.Title)));
                RuleFor(a => a.Description)
                    .NotEmpty()
                    .WithMessage("Description is required")
                    .When(a => a.IncludedProperties.Contains(nameof(a.Description)));
                RuleFor(a => a.Category)
                    .NotEmpty()
                    .WithMessage("Category is required")
                    .When(a => a.IncludedProperties.Contains(nameof(a.Category)));
                RuleFor(a => a.Date)
                    .GreaterThan(DateTime.UtcNow)
                    .WithMessage("Date must be in the future")
                    .When(a => a.IncludedProperties.Contains(nameof(a.Date)));
                RuleFor(a => a.City)
                    .NotEmpty()
                    .WithMessage("City is required")
                    .When(a => a.IncludedProperties.Contains(nameof(a.City)));
                RuleFor(a => a.Venue)
                    .NotEmpty()
                    .WithMessage("Venue is required")
                    .When(a => a.IncludedProperties.Contains(nameof(a.Venue)));
                RuleFor(a => a.Latitude)
                    .NotEmpty()
                    .WithMessage("Latitude is required")
                    .InclusiveBetween(-90, 90)
                    .WithMessage("Latitude must be between -90 and 90")
                    .When(a => a.IncludedProperties.Contains(nameof(a.Latitude)));
                RuleFor(a => a.Longitude)
                    .NotEmpty()
                    .WithMessage("Longitude is required")
                    .InclusiveBetween(-180, 180)
                    .WithMessage("Longitude must be between -180 and 180")
                    .When(a => a.IncludedProperties.Contains(nameof(a.Longitude)));
            });
        }
    }
}