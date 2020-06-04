using System;

namespace VyShare.Models.Dto
{
    public class OrderDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }

        public OrderDto()
        {
            // Empty ctor needed for deserialization
        }
        
        public OrderDto(Order order)
        {
            Id = order.Id;
            Name = order.Name;
            IsActive = order.IsActive;
        }

        public Order ToOrder(Order order = null)
        {
            if (order == null)
            {
                order = new Order();
            }

            order.Name = Name;
            order.IsActive = IsActive;

            return order;
        }

    }
}