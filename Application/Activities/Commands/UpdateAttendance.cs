using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands
{
    public class UpdateAttendance
    {
        public class Command : IRequest
        {
            public required Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IAppDbContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(IAppDbContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .Include(a => a.Attendees)
                    .ThenInclude(aa => aa.User)
                    .FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken);

                if (activity == null)
                {
                    throw new NotFoundException("Activity not found");
                }

                var user = await _userAccessor.GetUserAsync();
                
                if (user == null)
                {
                    throw new BadRequestException("User not found");
                }
                var attendance = activity.Attendees.FirstOrDefault(a => a.UserId == user.Id);
                var isHost = activity.Attendees.Any(a => a.UserId == user.Id && a.IsHost);

                // User is already attending, so remove them or toggle cancellation if host
                if (attendance is not null)
                {
                    if (isHost)
                        activity.IsCancelled = !activity.IsCancelled;
                    else
                        activity.Attendees.Remove(attendance);
                }
                else
                {
                    // Add new attendee
                    activity.Attendees.Add(new Domain.Entities.ActivityAttendee
                    {
                        UserId = user.Id,
                        ActivityId = activity.Id,
                        IsHost = false
                    });
                }

                var result = await _context.SaveChangesAsync(cancellationToken);

                if (!result)
                {
                    throw new BadRequestException("Problem updating attendance");
                }
            }
        }
    }
}