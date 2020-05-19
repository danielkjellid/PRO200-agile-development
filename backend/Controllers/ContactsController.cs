
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VyShare.Models.Dto;

namespace VyShare.Controllers
{

    [Route("contacts")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly VyShareContext db;

        public ContactsController(VyShareContext context)
        {
            db = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ContactDto>>> GetAll()
        {
            var contacts = await db.Contacts.ToListAsync();
            var contactDtos = contacts.Select(e => new ContactDto(e));
            return Ok(contactDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContactDto>> GetById(Guid id)
        {
            var contact = await db.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }
            var contactDto = new ContactDto(contact);
            return Ok(contactDto);
        }

        [HttpPost]
        public async Task<ActionResult<ContactDto>> Add(ContactDto contactDto)
        {
            var contact = contactDto.ToContact();
            db.Contacts.Add(contact);
            await db.SaveChangesAsync();
            contactDto = new ContactDto(contact);
            return Ok(contactDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, ContactDto updatedContact)
        {
            var contact = await db.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }
            contact = updatedContact.ToContact(contact);
            await db.SaveChangesAsync();
            return NoContent();
        }

    }
}