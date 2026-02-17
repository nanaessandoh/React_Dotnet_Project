using System;
using Application.Activities.Queries;
using Application.Activities.Validators;
using Domain.Entities;
using FluentValidation;
using Infrastructure.Security;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Core
{
    public static class ServiceCollections
    {
        public static IServiceCollection AddMediatRProfiles(this IServiceCollection services)
        {
            services.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssembly(typeof(GetAllActivities).Assembly);
            });

            return services;
        }

        public static IServiceCollection AddSwaggerUI(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });

            return services;
        }

        public static IServiceCollection AddDatabaseContext(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<IAppDbContext, AppDbContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }

        public static IServiceCollection AddCorsForFE(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });

            return services;
        }

        public static IServiceCollection AddMappingProfiles(this IServiceCollection services)
        {
            services.AddSingleton(MapsterProfiles.GetMapsterConfig());
            services.AddScoped<IMapper, ServiceMapper>();

            return services;
        }

        public static IServiceCollection AddValidators(this IServiceCollection services)
        {
            services.AddValidatorsFromAssemblyContaining<ActivityValidator>();

            return services;
        }

        public static IServiceCollection AddIdentityServices(this IServiceCollection services)
        {
            services
            .AddIdentityApiEndpoints<User>(opt =>
            {
                opt.User.RequireUniqueEmail = true;
            })
            .AddRoles<IdentityRole<Guid>>()
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();

            services.AddAuthorization(options =>
            {
                options.AddPolicy(PolicyConstants.IsActivityHost, policy =>
                {
                    policy.Requirements.Add(new IsHostRequirement());
                });
            });

            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();

            return services;
        }
    }
}