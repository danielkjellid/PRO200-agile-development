using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VyShare.Models.Dto;

namespace VyShare.Controllers
{
    [Route("orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly VyShareContext db;

        public OrdersController(VyShareContext context)
        {
            db = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetAll()
        {
            var orders = await db.Orders.ToListAsync();
            var ordersDto = orders.Select(e => new OrderDto(e));
            return Ok(ordersDto);
        }

        [HttpPost]
        public async Task<ActionResult> Add(OrderDto orderDto)
        {
            var order = orderDto.ToOrder();
            db.Orders.Add(order);
            await db.SaveChangesAsync();
            orderDto = new OrderDto(order);

            return Ok(orderDto);
        }

    }
}