using System.Reflection.Metadata.Ecma335;
using backend.Dtos.Employee;
using backend.Models;

namespace backend.Mappers 
{
    public static class EmployeeMapper
    {
        public static EmployeeDto ToEmployeeDto(this Employee employeeModel )
        {
            return new EmployeeDto
            {
                Id = employeeModel.Id,
                Name = employeeModel.Name,
                Education = employeeModel.Education,
                PhoneNumber = employeeModel.PhoneNumber
            };
        }

        public static Employee ToEmployeeFromCreateDto(this CreateEmployeeRequest employeeDto)
        {
            return new Employee
            {
                Name = employeeDto.Name,
                Education = employeeDto.Education,
                PhoneNumber = employeeDto.PhoneNumber
            };
        }

      
    }
}