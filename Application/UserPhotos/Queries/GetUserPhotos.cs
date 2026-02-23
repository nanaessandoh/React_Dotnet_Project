using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Read = Domain.Read;

namespace Application.UserPhotos.Queries
{
    public class GetUserPhotos
    {
        public class Query : IRequest<List<Read.UserPhoto>>
        {
            public required Guid UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<Read.UserPhoto>>
        {
            private readonly IAppDbContext _context;

            public Handler(IAppDbContext context)
            {
                _context = context;
            }

            public Task<List<Read.UserPhoto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var userPhotos = _context.Users
                    .Where(u => u.Id == request.UserId)
                    .SelectMany(u => u.Photos)
                    .Select(p => new Read.UserPhoto
                    {
                        Id = p.Id,
                        Url = p.Url,
                        PublicId = p.PublicId,
                        UserId = p.UserId
                    })
                    .ToListAsync(cancellationToken);

                return userPhotos;
            }
        }
    }
}