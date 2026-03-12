using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Read = Domain.Read;
using Write = Domain.Write;
using Entities = Domain.Entities;
using AutoMapper;

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
                // Verify activity exists without loading it fully
                var activityExists = await _context.Activities
                    .AnyAsync(x => x.Id == request.Comment.ActivityId, cancellationToken);

                if (!activityExists)
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

                await _context.Comments.AddAsync(commentEntity, cancellationToken);
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