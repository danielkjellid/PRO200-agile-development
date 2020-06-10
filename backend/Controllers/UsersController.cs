using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VyShare.Models.Dto;

namespace VyShare.Controllers
{

    [Route("users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly VyShareContext db;

        public UsersController(VyShareContext context)
        {
            db = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<UserDto>>> GetAll()
        {
            var users = await db.Users.ToListAsync();
            var userDtos = users.Select(e => new UserDto(e));
            return Ok(userDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetById(Guid id)
        {
            var user = await db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            var userDto = new UserDto(user);
            return Ok(userDto);
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> Add(UserDto userDto)
        {
            var user = userDto.ToUser();
            db.Users.Add(user);
            await db.SaveChangesAsync();
            userDto = new UserDto(user);
            return Ok(userDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, UserDto updatedUser)
        {
            var user = await db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            user = updatedUser.ToUser(user);
            await db.SaveChangesAsync();
            return NoContent();
        }

    }
}