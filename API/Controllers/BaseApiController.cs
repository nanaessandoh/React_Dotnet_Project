using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseApiController<TController> : ControllerBase
    where TController : BaseApiController<TController>
    {
        private readonly ILogger<TController> _logger;

        private readonly IMediator _mediator;
        protected IMediator mediator => _mediator;

        public BaseApiController(ILogger<TController> logger, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        [NonAction]
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult Try(Func<IActionResult> function)
        {
            try
            {
                return function();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occured in the API");
                throw;
            }
        }

        [NonAction]
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<IActionResult> TryAsync(Func<Task<IActionResult>> asyncFunction)
        {
            try
            {
                return await asyncFunction();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occured in the API");
                throw;
            }
        }
    }
}