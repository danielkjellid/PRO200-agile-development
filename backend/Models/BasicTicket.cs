namespace VyShare.Models
{
    public class BasicTicket : Entity
    {
        public Person TicketHolder { get; set; }
        public string Type { get; set; }
        public string StartPoint { get; set; }
        public string EndPoint { get; set; }
        public string ReferenceCode { get; set; } // Frontend: https://getyourticket.no/ref/272732738
        public decimal Price { get; set; }
    }
}