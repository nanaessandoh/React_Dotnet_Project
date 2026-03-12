using System;
using Read = Domain.Read;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Persistence;
using Application.Exceptions;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.Interfaces;

namespace Application.Activities.Queries
{
    public class GetActivityDetails
    {
        public class Query : IRequest<Read.Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Read.Activity>
        {
            private readonly IAppDbContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(AppDbContext contex, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = contex;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Read.Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .ProjectTo<Read.Activity>(_mapper.ConfigurationProvider, new { currentUserId = _userAccessor.GetUserId() })
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                if (activity == null)
                {
                    throw new NotFoundException("Activity not found");
                }

                return activity;
            }
        }
    }
}