using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionRequestMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionRequestMiddleware> _logger;

        public ExceptionRequestMiddleware(RequestDelegate next, ILogger<ExceptionRequestMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (ValidationException vex)
            {
                _logger.LogWarning(vex, "Validation exception caught by middleware");
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;

                var validationErrors = new Dictionary<string, string[]>();

                if (vex.Errors != null)
                {
                    foreach (var error in vex.Errors)
                    {
                        if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
                        {
                            var errors = existingErrors.Append(error.ErrorMessage);
                            validationErrors[error.PropertyName] = errors.ToArray();
                        }
                        else
                        {
                            validationErrors[error.PropertyName] = [error.ErrorMessage];
                        }
                    }
                }

                var validationProblemDetails = new ValidationProblemDetails(validationErrors)
                {
                    Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
                    Title = "One or more validation errors occurred.",
                    Status = (int)HttpStatusCode.BadRequest,
                };

                await context.Response.WriteAsJsonAsync(validationProblemDetails);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception caught by middleware");
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var response = context.Response;
            response.ContentType = "application/json";
            response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var result = JsonSerializer.Serialize(new
            {
                error = "An unexpected error occurred.",
                detail = exception.Message
            });

            return response.WriteAsync(result);
        }
    }
}
