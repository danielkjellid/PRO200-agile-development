using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VyShare.Models.Dto;

namespace VyShare.Controllers
{
    [Route("users/{userId}/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly VyShareContext db;

        public OrdersController(VyShareContext context)
        {
            db = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetAll(Guid userId)
        {
            var user = await db.Users.Include(e => e.Orders).FirstOrDefaultAsync(e => e.Id == userId);
            if (user == null)
            {
                return NotFound();
            }

            var ordersDto = user.Orders.Select(e => new OrderDto(e));
            return Ok(ordersDto);
        }

        [HttpPost]
        public async Task<ActionResult> Add(Guid userId, OrderDto orderDto)
        {
            var user = await db.Users.Include(e => e.Orders).FirstOrDefaultAsync(e => e.Id == userId);
            if (user == null)
            {
                return NotFound();
            }
            var order = orderDto.ToOrder();
            user.Orders.Add(order);
            await db.SaveChangesAsync();
            orderDto = new OrderDto(order);

            return Ok(orderDto);
        }

    }
}