using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using FluentValidation.Results;

namespace Application.Extensions
{
    public static class ValidationExtensions
    {
        public static async Task<ValidationResult> ValidateAndThrowAsync<T>(this IValidator<T> validator, T instance, string ruleSet, CancellationToken cancellationToken = default)
        {
            var validationResult = await validator.ValidateAsync(instance, options => options.IncludeRuleSets(ruleSet), cancellationToken);
            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            return validationResult;
        }
    }
}