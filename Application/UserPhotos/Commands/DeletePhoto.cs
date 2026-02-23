using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Persistence;

namespace Application.UserPhotos.Commands
{
    public class DeletePhoto
    {
        public class Command : IRequest
        {
            public required Guid PhotoId { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IAppDbContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoService _photoService;

            public Handler(IAppDbContext context, IUserAccessor userAccessor, IPhotoService photoService)
            {
                _context = context;
                _userAccessor = userAccessor;
                _photoService = photoService;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var userWithPhotos = await _userAccessor.GetUserWithPhotosAsync();
                var photo = userWithPhotos.Photos.FirstOrDefault(p => p.Id == request.PhotoId);

                if (photo == null)
                {
                    throw new PhotoDeleteException("Photo not found");
                }

                if (string.Equals(photo.Url, userWithPhotos.ImageUrl, StringComparison.OrdinalIgnoreCase))
                {
                    throw new PhotoDeleteException("Cannot delete main photo");
                }

                // Delete photo from cloud storage and database
                var deleteResult = await _photoService.DeletePhotoAsync(photo.PublicId);
                _context.UserPhotos.Remove(photo);
                var result = await _context.SaveChangesAsync(cancellationToken);

                if (!result)
                {
                    throw new PhotoDeleteException("Failed to delete photo from database");
                }
            }
        }
    }
}