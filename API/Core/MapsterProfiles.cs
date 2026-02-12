using Read = Domain.Read;
using Write = Domain.Write;
using Entities = Domain.Entities;
using Mapster;
using System.Linq;
using System;

namespace API.Core
{
    public static class MapsterProfiles
    {
        public static TypeAdapterConfig GetMapsterConfig()
        {
            var config = new TypeAdapterConfig();

            config.NewConfig<Write.Activity, Entities.Activity>()
                .IgnoreIfNotIncluded(dest => dest.Title)
                .IgnoreIfNotIncluded(dest => dest.Date)
                .IgnoreIfNotIncluded(dest => dest.Description)
                .IgnoreIfNotIncluded(dest => dest.Category)
                .IgnoreIfNotIncluded(dest => dest.IsCancelled)
                .IgnoreIfNotIncluded(dest => dest.City)
                .IgnoreIfNotIncluded(dest => dest.Venue)
                .IgnoreIfNotIncluded(dest => dest.Latitude)
                .IgnoreIfNotIncluded(dest => dest.Longitude);

            config.NewConfig<Entities.Activity, Read.Activity>()
                .Map(dest => dest.HostDisplayName, src => src.Attendees.FirstOrDefault(a => a.IsHost)!.User!.DisplayName)
                .Map(dest => dest.HostUserId, src => src.Attendees.FirstOrDefault(a => a.IsHost)!.UserId);

            config.NewConfig<Entities.ActivityAttendee, Read.ActivityAttendee>()
                .Map(dest => dest.UserId, src => src.UserId)
                .Map(dest => dest.DisplayName, src => src.User!.DisplayName)
                .Map(dest => dest.Bio, src => src.User!.Bio)
                .Map(dest => dest.ImageUrl, src => src.User!.ImageUrl);

            return config;
        }
    }
}