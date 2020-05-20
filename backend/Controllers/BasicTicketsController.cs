using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VyShare.Models.Dto;

namespace VyShare.Controllers
{
    [Route("orders/{orderId}/basictickets")]
    [ApiController]
    public class BasicTicketsController : ControllerBase
    {
        private readonly VyShareContext db;

        public BasicTicketsController(VyShareContext context)
        {
            db = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<BasicTicketDto>>> GetAll(Guid orderId)
        {
            var order = await db.Orders
                .Include(e => e.BasicTickets)
                    .ThenInclude(t => t.TicketHolder)
                .FirstOrDefaultAsync(e => e.Id == orderId);
            if (order == null)
            {
                return NotFound();
            }

            var basicTicketsDto = order.BasicTickets.Select(e => new BasicTicketDto(e));
            return Ok(basicTicketsDto);
        }

        [HttpPost]
        public async Task<ActionResult> Add(Guid orderId, BasicTicketDto basicTicketDto)
        {
            var order = await db.Orders.Include(e => e.BasicTickets).FirstOrDefaultAsync(e => e.Id == orderId);
            if (order == null)
            {
                return NotFound();
            }

            var basicTicket = basicTicketDto.ToBasicTicket(db);
            order.BasicTickets.Add(basicTicket);
            await db.SaveChangesAsync();
            basicTicketDto = new BasicTicketDto(basicTicket);

            return Ok(basicTicketDto);
        }


        [Route("/contacts/{id}/tickets")]
        [Route("/users/{id}/tickets")]
        [HttpGet]
        public async Task<ActionResult<List<BasicTicketDto>>> GetPersonTickets(Guid id){
            var tickets = await db.BasicTickets
                .Include(e => e.TicketHolder)
                .Where(e => e.TicketHolder.Id == id).ToListAsync();
            var ticketDtos = tickets.Select(e => new BasicTicketDto(e)).ToList();
            return ticketDtos;
        }


    }
}