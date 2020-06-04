using System;
using System.Linq;

namespace VyShare.Models.Dto
{
    public class BasicTicketDto
    {
        public Guid Id { get; set; }
        public Guid TicketHolderId { get; set; }
        public string Type { get; set; }
        public string StartPoint { get; set; }
        public string EndPoint { get; set; }
        public string ReferenceCode { get; set; }
        public string Seat { get; set; }
        public decimal Price { get; set; }
        public bool IsActive { get; set; }

        public BasicTicketDto()
        {
            // Empty ctor needed for deserialization
        }

        public BasicTicketDto(BasicTicket basicTicket)
        {
            Id = basicTicket.Id;
            TicketHolderId = basicTicket.TicketHolder?.Id ?? Guid.Empty;
            Type = basicTicket.Type;
            StartPoint = basicTicket.StartPoint;
            EndPoint = basicTicket.EndPoint;
            ReferenceCode = basicTicket.ReferenceCode;
            Seat = basicTicket.Seat;
            Price = basicTicket.Price;
            IsActive = basicTicket.IsActive;
        }

        public BasicTicket ToBasicTicket(VyShareContext db, BasicTicket basicTicket = null)
        {
            if (basicTicket == null)
            {
                basicTicket = new BasicTicket();
            }
            basicTicket.TicketHolder = db.People.FirstOrDefault(e => e.Id == TicketHolderId);
            basicTicket.Type = Type;
            basicTicket.StartPoint = StartPoint;
            basicTicket.EndPoint = EndPoint;
            basicTicket.ReferenceCode = ReferenceCode;
            basicTicket.Seat = Seat;
            basicTicket.Price = Price;
            basicTicket.IsActive = IsActive;
            return basicTicket;
        }

    }
}