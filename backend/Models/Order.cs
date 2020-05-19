using System.Collections.Generic;

namespace VyShare.Models
{
    public class Order : Entity
    {
        public string Name { get; set; }
        public IEnumerable<Ticket> Tickets { get; set; }
    }
}