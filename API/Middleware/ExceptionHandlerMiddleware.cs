using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Exceptions;
using FluentValidation;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlerMiddleware> _logger;
        private readonly IWebHostEnvironment _env;

        public ExceptionHandlerMiddleware(RequestDelegate next, ILogger<ExceptionHandlerMiddleware> logger, IWebHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
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

                await context.Response.WriteAsync(JsonSerializer.Serialize(validationProblemDetails, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }));
            }
            catch (NotFoundException nfex)
            {
                _logger.LogWarning(nfex, "Not found exception caught by middleware");
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.NotFound;

                var result = JsonSerializer.Serialize(new
                {
                    title = "Not Found",
                    status = (int)HttpStatusCode.NotFound,
                    type = "https://tools.ietf.org/html/rfc7231#section-6.5.4",
                    error = "The requested resource was not found.",
                    detail = nfex.Message
                }, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });

                await context.Response.WriteAsync(result);
            }
            catch (BadRequestException brex)
            {
                _logger.LogWarning(brex, "Bad request exception caught by middleware");
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;

                var result = JsonSerializer.Serialize(new
                {
                    title = "Bad Request",
                    status = (int)HttpStatusCode.BadRequest,
                    type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
                    error = "The request was invalid.",
                    detail = brex.Message
                }, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });

                await context.Response.WriteAsync(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception caught by middleware");
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var response = context.Response;
            response.ContentType = "application/json";
            response.StatusCode = (int)HttpStatusCode.InternalServerError;

            object? result = null;

            if (_env.IsDevelopment())
            {
                result = new
                {
                    title = "Internal Server Error",
                    status = (int)HttpStatusCode.InternalServerError,
                    error = "An unexpected error occurred.",
                    type = "https://tools.ietf.org/html/rfc7231#section-6.6.1",
                    detail = ex.Message,
                    stackTrace = ex.StackTrace
                };
            }
            else
            {
                result = new
                {
                    title = "Internal Server Error",
                    status = (int)HttpStatusCode.InternalServerError,
                    error = "An unexpected error occurred.",
                    type = "https://tools.ietf.org/html/rfc7231#section-6.6.1",
                    detail = "Contact support if this persists."
                };
            }

            return response.WriteAsJsonAsync(JsonSerializer.Serialize(result, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }));
        }
    }
}
