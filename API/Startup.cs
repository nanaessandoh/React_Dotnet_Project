using API.Core;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;

        public Startup(IConfiguration config)
        {
            _config = config;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddControllers();
            services.AddSwaggerUI();
            services.AddDatabaseContext(_config);
            services.AddCorsForFE();
            services.AddMediatRProfiles();
            services.AddMappingProfiles();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }
            // Global exception handling middleware (always use in pipeline)
            app.UseMiddleware<Middleware.ExceptionRequestMiddleware>();

            app.UseRouting();

            app.UseCors(x => x.AllowAnyHeader()
                              .AllowAnyMethod()
                              .WithOrigins("http://localhost:3000", "https://localhost:3000"));

            //app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
