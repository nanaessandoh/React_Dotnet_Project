using System;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController<ActivitiesController>
    {

        public ActivitiesController(ILogger<ActivitiesController> logger, IMediator mediator)
        : base(logger, mediator)
        {

        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return await TryAsync(async () =>
            {
                return Ok(await Mediator.Send(new List.Query()));
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return await TryAsync(async () =>
            {
                return Ok(await Mediator.Send(new Details.Query{Id = id}));
            });
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody] Activity activity)
        {
            return await TryAsync(async () =>
            {
                return Ok(await Mediator.Send(new Create.Command {Activity = activity}));
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, [FromBody] Activity activity)
        {
            return await TryAsync(async () =>
            {
                activity.Id = id;
                return Ok(await Mediator.Send(new Edit.Command {Activity = activity}));
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EditActivity(Guid id)
        {
            return await TryAsync(async () =>
            {
                return Ok(await Mediator.Send(new Delete.Command {Id = id}));
            });
        }
    }
}