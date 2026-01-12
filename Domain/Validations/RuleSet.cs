using System;
using System.Linq;

namespace Domain.Validations
{
    public class RuleSet
    {
        private readonly string _ruleSet;

        public static readonly RuleSet Create = new RuleSet("Create");
        public static readonly RuleSet Update = new RuleSet("Update");
        public static readonly RuleSet Delete = new RuleSet("Delete");
        public static readonly RuleSet Default = new RuleSet("Default");
        public static readonly RuleSet All = new RuleSet("*");

        public RuleSet(string ruleSet)
        {
            _ruleSet = ruleSet;
        }

        public override string ToString()
        {
            return _ruleSet;
        }

        public RuleSet Append(RuleSet newRuleSet)
        {
            if (this._ruleSet == "*")
            {
                return this;
            }

            if (newRuleSet._ruleSet == "*")
            {
                return newRuleSet;
            }

            var combinedRules = this._ruleSet.Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Concat(newRuleSet._ruleSet.Split(',', StringSplitOptions.RemoveEmptyEntries))
                .Distinct();

            return new RuleSet(string.Join(',', combinedRules));
        }

        public static RuleSet operator +(RuleSet x, RuleSet y)
        {
            return x.Append(y);
        }

        public static implicit operator string(RuleSet ruleSet) => ruleSet.ToString();
    }
}