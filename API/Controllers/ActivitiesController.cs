using System;
using System.Threading.Tasks;
using Application.Activities;
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
    }
}