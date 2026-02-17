using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly IAppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsHostRequirementHandler(IAppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
            var httpContext = _httpContextAccessor.HttpContext;

            if (userId == null || httpContext == null)
            {
                context.Fail();
                return;
            }

            if (httpContext?.GetRouteValue("id") is not string activityId || !Guid.TryParse(activityId, out var parsedActivityId))
            {
                context.Fail();
                return;
            }

            var attendee = await _context.ActivityAttendees
                .AsNoTracking()
                .FirstOrDefaultAsync(aa => aa.UserId == Guid.Parse(userId) && aa.ActivityId == parsedActivityId);

            if (attendee == null)
            {
                context.Fail();
                return;
            }

            if (attendee.IsHost)
                context.Succeed(requirement);
            else
                context.Fail();
        }
    }
}