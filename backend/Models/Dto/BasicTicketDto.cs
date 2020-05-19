using System;
using System.Linq;

namespace VyShare.Models.Dto
{
    public class BasicTicketDto
    {
        public Guid TicketHolderId { get; set; }
        public string Type { get; set; }
        public string StartPoint { get; set; }
        public string EndPoint { get; set; }
        public string ReferenceCode { get; set; } // Frontend: https://getyourticket.no/ref/272732738
        public decimal Price { get; set; }

        public BasicTicketDto()
        {
            // Empty ctor needed for deserialization
        }

        public BasicTicketDto(BasicTicket basicTicket)
        {
            TicketHolderId = basicTicket.TicketHolder.Id;
            Type = basicTicket.Type;
            StartPoint = basicTicket.StartPoint;
            EndPoint = basicTicket.EndPoint;
            ReferenceCode = basicTicket.ReferenceCode;
            Price = basicTicket.Price;
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
            basicTicket.Price = Price;
            return basicTicket;
        }

    }
}