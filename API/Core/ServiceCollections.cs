using Application.Activities;
using MapsterMapper;
using MediatR;
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
            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddMediatR(typeof(Create.Handler).Assembly);
            services.AddMediatR(typeof(Delete.Handler).Assembly);
            services.AddMediatR(typeof(Details.Handler).Assembly);
            services.AddMediatR(typeof(Edit.Handler).Assembly);
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
            services.AddDbContext<AppDbContext>( options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }

        public static IServiceCollection AddCorsForFE(this IServiceCollection services)
        {
            services.AddCors(options => {
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
    }
}