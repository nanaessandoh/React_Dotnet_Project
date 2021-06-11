using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseApiController<TController> : ControllerBase
    where TController : BaseApiController<TController>
    {
        private readonly ILogger<TController> logger;
        public BaseApiController(ILogger<TController> logger)
        {
            this.logger = logger;
        }

        public IActionResult Try(Func<IActionResult> function)
        {
            if (function is null)
            {
                throw new ArgumentNullException(nameof(function));
            }

            try
            {
                return function();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occured in the API");
                throw;
            }
        }

        public async Task<IActionResult> TryAsync(Func<Task<IActionResult>> asyncFunction)
        {
            if (asyncFunction is null)
            {
                throw new ArgumentNullException(nameof(asyncFunction));
            }

            try
            {
                return await asyncFunction();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occured in the API");
                throw;
            }
        }
    }
}