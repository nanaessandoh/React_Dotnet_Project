using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.UserPhotos.Commands
{
    public class SetMainPhoto
    {
        public class Command : IRequest
        {
            public required Guid PhotoId { get; set; }
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
                var userWithPhotos = await _userAccessor.GetUserWithPhotosAsync();
                var photo = userWithPhotos.Photos.FirstOrDefault(p => p.Id == request.PhotoId);

                if (photo == null)
                {
                    throw new NotFoundException("Photo not found");
                }

                if (string.Equals(photo.Url, userWithPhotos.ImageUrl, StringComparison.OrdinalIgnoreCase))
                {
                    throw new BadRequestException("Photo is already the main photo");
                }

                userWithPhotos.ImageUrl = photo.Url;
                var result = await _context.SaveChangesAsync(cancellationToken);

                if (!result)
                {
                    throw new BadRequestException("Failed to set main photo");
                }
            }
        }
    }
}