using System;

namespace VyShare.Models.Dto
{
    public class OrderDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public OrderDto()
        {
            // Empty ctor needed for deserialization
        }
        
        public OrderDto(Order order)
        {
            Id = order.Id;
            Name = order.Name;
        }

        public Order ToOrder(Order order = null)
        {
            if (order == null)
            {
                order = new Order();
            }

            order.Name = Name;

            return order;
        }

    }
}