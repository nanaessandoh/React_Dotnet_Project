using Read = Domain.Read;
using Write = Domain.Write;
using Entities = Domain.Entities;
using Mapster;

namespace API.Core
{
    public static class MapsterProfiles
    {
        public static TypeAdapterConfig GetMapsterConfig()
        {
            var config = new TypeAdapterConfig();

            config.NewConfig<Write.Activity, Entities.Activity>()
                .IgnoreIfNotIncluded(dest => dest.Id)
                .IgnoreIfNotIncluded(dest => dest.Title)
                .IgnoreIfNotIncluded(dest => dest.Date)
                .IgnoreIfNotIncluded(dest => dest.Description)
                .IgnoreIfNotIncluded(dest => dest.Category)
                .IgnoreIfNotIncluded(dest => dest.City)
                .IgnoreIfNotIncluded(dest => dest.Venue);

            config.NewConfig<Entities.Activity, Read.Activity>();

            return config;
        }
    }
}