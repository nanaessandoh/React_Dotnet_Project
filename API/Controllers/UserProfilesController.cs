using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Profiles.Query;
using Application.UserPhotos.Commands;
using Application.UserPhotos.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class UserProfilesController : BaseApiController<UserProfilesController>
    {
        public UserProfilesController(ILogger<UserProfilesController> logger, IMediator mediator) : base(logger, mediator)
        {
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserProfile(Guid userId, CancellationToken cancellationToken)
        {
            return await TryAsync(async () =>
            {
                var query = new GetProfile.Query { UserId = userId };
                var profile = await mediator.Send(query, cancellationToken);
                return Ok(profile);
            });
        }

        [HttpGet("{userId}/photos")]
        public async Task<IActionResult> GetUserPhotos(Guid userId, CancellationToken cancellationToken)
        {
            return await TryAsync(async () =>
            {
                var query = new GetUserPhotos.Query { UserId = userId };
                var photos = await mediator.Send(query, cancellationToken);
                return Ok(photos);
            });
        }

        [HttpPost("add-photo")]
        public async Task<IActionResult> AddPhoto([FromForm] IFormFile file, CancellationToken cancellationToken)
        {
            return await TryAsync(async () =>
            {
                var command = new AddPhoto.Command { File = file };
                var photo = await mediator.Send(command, cancellationToken);
                return Ok(photo);
            });
        }

        [HttpDelete("{photoId}/photos")]
        public async Task<IActionResult> DeletePhoto(Guid photoId, CancellationToken cancellationToken)
        {
            return await TryAsync(async () =>
            {
                var command = new DeletePhoto.Command { PhotoId = photoId };
                await mediator.Send(command, cancellationToken);
                return NoContent();
            });
        }

        [HttpPatch("photos/{photoId}/set-main")]
        public async Task<IActionResult> SetMainPhoto(Guid photoId, CancellationToken cancellationToken)
        {
            return await TryAsync(async () =>
            {
                var command = new SetMainPhoto.Command { PhotoId = photoId };
                await mediator.Send(command, cancellationToken);
                return NoContent();
            });
        }
    }
}