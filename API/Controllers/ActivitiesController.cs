using Application.Activities;
using Write = Domain.Write;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController<ActivitiesController>
    {
        private readonly IAppDbContext _context;

        public ActivitiesController(ILogger<ActivitiesController> logger, IMediator mediator, IAppDbContext context)
        : base(logger, mediator)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return await TryAsync(async () =>
            {
                return Ok(await _context.Activities.AsNoTracking().ToListAsync());
                //return Ok(await Mediator.Send(new List.Query()));
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return await TryAsync(async () =>
            {
                return Ok(await Mediator.Send(new Details.Query { Id = id }));
            });
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody] Write.Activity activity)
        {
            return await TryAsync(async () =>
            {
                await Mediator.Send(new Create.Command { Activity = activity });
                return Ok();
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, [FromBody] Write.Activity activity)
        {
            return await TryAsync(async () =>
            {
                activity.Id = id;
                await Mediator.Send(new Edit.Command { Activity = activity });
                return Ok();
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EditActivity(Guid id)
        {
            return await TryAsync(async () =>
            {
                await Mediator.Send(new Delete.Command { Id = id });
                return Ok();
            });
        }
    }
}