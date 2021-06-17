using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Domain
{
    public abstract class BaseEntity<TEntity>
    where TEntity : BaseEntity<TEntity>
    {
        public virtual bool HasRequiredFields()
        {
            return !this.GetType().GetProperties()
                .Where(_ => Attribute.IsDefined(_, typeof(RequiredAttribute)))
                .Where(_ => _.PropertyType == typeof(string))
                .Select(_ => _.GetValue(this)?.ToString())
                .Any(_ => string.IsNullOrWhiteSpace(_));
        }

        public abstract void UpdateBaseFields(TEntity entity);
    }
}