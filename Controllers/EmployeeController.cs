using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Employee;
using backend.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Controllers
{
    [Route("api/employee")]
    [ApiController]
    public class EmployeeController: ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var employees = await _context.Employees.ToListAsync();
            var employeeDto = employees.Select(s => s.ToEmployeeDto());
            return Ok(employees);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if(employee == null)
            {
                return NotFound();
            }
            return Ok(employee.ToEmployeeDto());
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateEmployeeRequest employeeDto)
        {
            var employeemodel = employeeDto.ToEmployeeFromCreateDto();
            await _context.Employees.AddAsync(employeemodel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = employeemodel.Id}, employeemodel.ToEmployeeDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id , [FromBody] UpdateEmployeeRequest updateDto)
        {
              var employeemodel = await  _context.Employees.FirstOrDefaultAsync(x => x.Id == id);
              if(employeemodel == null)
              {
                return NotFound();
              }
              employeemodel.Name = updateDto.Name; 
              employeemodel.Education = updateDto.Education; 
              employeemodel.PhoneNumber = updateDto.PhoneNumber;
              await _context.SaveChangesAsync();
               return Ok(employeemodel.ToEmployeeDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var employeemodel = await _context.Employees.FirstOrDefaultAsync(x => x.Id == id);
            if(employeemodel == null)
            {
                return NotFound();
            }
            _context.Employees.Remove(employeemodel);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}