using System;
using System.Linq.Expressions;
using Mapster;

namespace API.Core
{
    public static class MapsterExtensions
    {
        public static TypeAdapterSetter<TSource, TDestination> IgnoreIfNotIncluded<TSource, TDestination, TMember>(
            this TypeAdapterSetter<TSource, TDestination> setter,
            Expression<Func<TDestination, TMember>> destMember)
            where TSource : Domain.IBaseWrite
        {
            if (destMember == null) throw new ArgumentNullException(nameof(destMember));

            if (destMember.Body is MemberExpression memberExpr)
            {
                var memberName = memberExpr.Member.Name;
                var param = destMember.Parameters[0];
                var converted = Expression.Convert(memberExpr, typeof(object));
                var lambda = Expression.Lambda<Func<TDestination, object>>(converted, param);

                return setter.IgnoreIf((src, dest) => src.IncludedProperties == null || !src.IncludedProperties.Contains(memberName), lambda);
            }

            throw new ArgumentException("Destination member must be a member expression", nameof(destMember));
        }
    }
}
