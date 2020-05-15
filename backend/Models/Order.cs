using System.Collections.Generic;

namespace VyShare.Models
{
    public class Order : Entity
    {
        public IEnumerable<Ticket> Tickets { get; set; }
    }
}