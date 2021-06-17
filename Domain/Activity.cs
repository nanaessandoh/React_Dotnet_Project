using System;

namespace Domain
{
    public class Activity : BaseEntity<Activity>
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }

        public override void UpdateBaseFields(Activity entity)
        {
            this.Title = entity.Title;
            this.Date = entity.Date;
            this.Description = entity.Description;
            this.Category = entity.Category;
            this.City = entity.City;
            this.Venue = entity.Venue;
        }
    }
}