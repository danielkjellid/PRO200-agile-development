namespace VyShare.Models
{
    public class BasicTicket : Entity
    {
        public Person TicketHolder { get; set; }
        public string Type { get; set; }
        public string StartPoint { get; set; }
        public string EndPoint { get; set; }
        public string ReferenceCode { get; set; }
        public string Seat { get; set; }
        public decimal Price { get; set; }
    }
}