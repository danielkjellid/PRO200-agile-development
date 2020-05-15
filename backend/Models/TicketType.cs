namespace VyShare.Models
{
    public class TicketType : Entity
    {
        public string Name { get; set; }
        public decimal CostFactor { get; set; } // Determines ticket price based on zone(s) base cost. I.e. 0.75 for 'student'.
    }
}