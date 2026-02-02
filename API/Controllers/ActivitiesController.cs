using Write = Domain.Write;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System;
using Application.Activities.Queries;
using Application.Activities.Commands;
using System.Threading;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController<ActivitiesController>
    {
        public ActivitiesController(ILogger<ActivitiesController> logger, IMediator mediator)
        : base(logger, mediator)
        {
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            return await TryAsync(async () =>
            {
                return Ok(await mediator.Send(new GetAllActivities.Query(), cancellationToken));
            });
        }

        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> Get(Guid id, CancellationToken cancellationToken)
        {
            return await TryAsync(async () =>
            {
                return Ok(await mediator.Send(new GetActivityDetails.Query { Id = id }, cancellationToken));
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Write.Activity activity, CancellationToken cancellationToken)
        {
            return await TryAsync(async () =>
            {
                var activityResponse = await mediator.Send(new CreateActivity.Command { Activity = activity }, cancellationToken);
                return CreatedAtRoute(nameof(Get), new { activityResponse.Id }, activityResponse);
            });
        }

        [HttpPatch]
        public async Task<IActionResult> Edit(Guid id, [FromBody] Write.Activity activity, CancellationToken cancellationToken)
        {
            return await TryAsync(async () =>
            {
                await mediator.Send(new EditActivity.Command { Activity = activity }, cancellationToken);
                return NoContent();
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        {
            return await TryAsync(async () =>
            {
                await mediator.Send(new DeleteActivity.Command { Id = id }, cancellationToken);
                return NoContent();
            });
        }
    }
}