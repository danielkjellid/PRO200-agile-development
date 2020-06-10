using System;

namespace VyShare.Models
{
    [Obsolete("Use BasicTicket", true)]
    public class Ticket : Entity
    {
        public Person TicketHolder { get; set; }
        public TicketType Type { get; set; }
        public Station StartPoint { get; set; }
        public Station EndPoint { get; set; }
        public string ReferenceCode { get; set; }
        public string Seat { get; set; }
        public decimal Price => CalculateTicketCost();


        private decimal CalculateTicketCost()
        {
            // Simple cost calculation. Use only cost for one or two zones.
            decimal cost = StartPoint.Zone.BaseCost * Type.CostFactor;
            if (StartPoint.Zone.Id != EndPoint.Zone.Id)
            {
                cost += EndPoint.Zone.BaseCost * Type.CostFactor;
            }
            return cost;
        }

    }
}