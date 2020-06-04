using System.Collections.Generic;

namespace VyShare.Models
{
    public class Order : Entity
    {
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public virtual ICollection<BasicTicket> BasicTickets { get; set; }
    }
}