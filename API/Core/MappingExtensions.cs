using System;
using System.Collections.Generic;
using System.Reflection;
using AutoMapper;
using Domain;

namespace API.Core
{
    public static class MappingExtensions
    {
        public static void AddIncludedPropertiesOnlySupport(this IMapperConfigurationExpression config)
        {
            config.ForAllPropertyMaps(PropertySuportUpdate, ShouldMapIncludedProperty);
            config.ForAllPropertyMaps(PropertySuportUpdate, ShouldMapPartialUpdateProperty);
        }

        private static bool PropertySuportUpdate(PropertyMap propertyMap)
        {
            return propertyMap.SourceMember is not null;
        }

        private static void ShouldMapIncludedProperty(PropertyMap propertyMap, IMemberConfigurationExpression memberConfiguration)
        {
            memberConfiguration.Condition((src, dst, srcVal, dstVal) =>
            {
                var includedProperties = (src as IBaseWrite)?.IncludedProperties;

                return includedProperties is not null
                 ? includedProperties.Contains(propertyMap.SourceMember.Name)
                 : false;
            });
        }

        private static void ShouldMapPartialUpdateProperty(PropertyMap propertyMap, IMemberConfigurationExpression memberConfiguration)
        {
            Type? type = (propertyMap.DestinationMember as PropertyInfo)?.PropertyType;
            object? destinationDefaultValue = type is not null && type.IsValueType ? Activator.CreateInstance(type) : null;
            memberConfiguration.Condition((src, dst, srcVal, dstVal) =>
            {
                if (destinationDefaultValue is not null && object.Equals(dstVal, destinationDefaultValue))
                {
                    return true;
                }

                ICollection<string>? collection = (src as IBaseWrite)?.IncludedProperties;
                return collection is null || (collection?.Contains(propertyMap.SourceMember.Name) ?? false);
            });
        }
    }
}
