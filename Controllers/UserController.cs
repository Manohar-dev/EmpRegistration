using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.User;
using backend.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly ApplicationDbContext _context;
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _context.Users.ToListAsync();
            var UserDto = users.Select(s => s.ToUserDto());
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user.ToUserDto());
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUserRequest UserDto)
        {
            var usermodel = UserDto.ToUserFromCreateDto();
            await _context.Users.AddAsync(usermodel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = usermodel.id }, usermodel.ToUserDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateUserRequest updateDto)
        {
            var usermodel = await _context.Users.FirstOrDefaultAsync(x => x.id == id);
            if (usermodel == null)
            {
                return NotFound();
            }
            usermodel.username = updateDto.username;
            usermodel.comments = updateDto.comments;
            await _context.SaveChangesAsync();
            return Ok(usermodel.ToUserDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            var usermodel = await _context.Users.FirstOrDefaultAsync(x => x.id == id);
                Console.WriteLine(usermodel);
            if (usermodel == null)
            {
                return NotFound();
            }
            _context.Users.Remove(usermodel);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}