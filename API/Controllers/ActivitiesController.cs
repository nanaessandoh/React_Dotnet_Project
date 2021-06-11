using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController<ActivitiesController>
    {
        private readonly AppDbContext _context;

        public ActivitiesController(ILogger<ActivitiesController> logger, AppDbContext context)
        : base(logger)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return await TryAsync(async () =>
            {
                return Ok(await _context.Activities.ToListAsync());
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return await TryAsync(async () =>
            {
                return Ok(await _context.Activities.FindAsync(id));
            });
        }
    }
}