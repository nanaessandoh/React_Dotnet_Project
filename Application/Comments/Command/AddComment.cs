using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interfaces;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Read = Domain.Read;
using Write = Domain.Write;
using Entities = Domain.Entities;

namespace Application.Comments.Command
{
    public class AddComment
    {
        public class Command : IRequest<Read.Comment>
        {
            public required Write.Comment Comment { get; set; }
        }

        public class Handler : IRequestHandler<Command, Read.Comment>
        {
            private readonly IAppDbContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(IAppDbContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _context = context;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }

            public async Task<Read.Comment> Handle(Command request, CancellationToken cancellationToken)
            {

                var activity = await _context.Activities
                    .Include(x => x.Comments)
                    .FirstOrDefaultAsync(x => x.Id == request.Comment.ActivityId, cancellationToken);

                if (activity is null)
                {
                    throw new NotFoundException("Activity not found");
                }

                var user = await _userAccessor.GetUserAsync();

                var commentEntity = new Entities.Comment
                {
                    Id = Guid.NewGuid(),
                    Body = request.Comment.Body,
                    ActivityId = request.Comment.ActivityId,
                    UserId = user.Id
                };
                activity.Comments.Add(commentEntity);

                await _context.Activities.AddAsync(activity, cancellationToken);
                var result = await _context.SaveChangesAsync(cancellationToken);

                if (!result)
                {
                    throw new BadRequestException("Failed to add comment");
                }

                return _mapper.Map<Read.Comment>(commentEntity);
            }
        }
    }
}