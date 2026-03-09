using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Comments.Command;
using Application.Comments.Queries;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class CommentsHub : Hub
    {
        private readonly IMediator _mediator;
        private const string LoadComments = "LoadComments";
        private const string RecieveComments = "ReceiveComments";

        public CommentsHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var activityId = httpContext?.Request.Query["activityId"];

            if (string.IsNullOrEmpty(activityId))
            {
                throw new HubException("No activity found");
            }

            if (!Guid.TryParse(activityId, out Guid activityIdAsGuid))
            {
                throw new HubException("Activity not valid");
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, activityId!);
            var result = await _mediator.Send(new GetComments.Query { ActivityId = activityIdAsGuid });

            await Clients.Caller
                .SendAsync(LoadComments, result);
        }

        public async Task SendComment(AddComment.Command command)
        {
            var comment = await _mediator.Send(command);


            if (command.Comment.ActivityId == Guid.Empty)
            {
                throw new HubException("Activity not valid");
            }

            await Clients.Group(command.Comment.ActivityId.ToString())
                .SendAsync(RecieveComments, comment);
        }
    }
}