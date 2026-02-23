using System;
using System.Threading.Tasks;
using MediatR;
using Entity = Domain.Entities;
using Read = Domain.Read;
using Microsoft.AspNetCore.Http;
using System.Threading;
using Application.Interfaces;
using Persistence;
using Application.Exceptions;


namespace Application.UserPhotos.Commands
{
    public class AddPhoto
    {
        public class Command : IRequest<Read.UserPhoto>
        {
            public required IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Read.UserPhoto>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly IAppDbContext _context;
            private readonly IPhotoService _photoService;

            public Handler(IUserAccessor userAccessor, IAppDbContext context, IPhotoService photoService)
            {
                _userAccessor = userAccessor;
                _context = context;
                _photoService = photoService;
            }

            public async Task<Read.UserPhoto> Handle(Command request, CancellationToken cancellationToken)
            {
                var uploadResult = await _photoService.UploadPhotoAsync(request.File);

                var user = await _userAccessor.GetUserAsync();

                var photoEntity = new Entity.UserPhoto
                {
                    Id = Guid.NewGuid(),
                    Url = uploadResult.Url,
                    PublicId = uploadResult.PublicId,
                    UserId = user.Id
                };

                user.ImageUrl ??= photoEntity.Url;
                _context.UserPhotos.Add(photoEntity);
                var result = await _context.SaveChangesAsync(cancellationToken);

                if (!result)
                {
                    throw new PhotoUploadException("Failed to save photo");
                }

                return new Read.UserPhoto
                {
                    Id = photoEntity.Id,
                    Url = photoEntity.Url,
                    PublicId = photoEntity.PublicId,
                    UserId = photoEntity.UserId
                };
            }
        }
    }
}