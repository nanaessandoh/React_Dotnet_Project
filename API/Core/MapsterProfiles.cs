using Domain;
using Mapster;

namespace API.Core
{
    public static class MapsterProfiles
    {
        public static TypeAdapterConfig GetMapsterConfig()
        {
            var config = new TypeAdapterConfig();

            config.NewConfig<Activity, Activity>();

            return config;
        }
    }
}