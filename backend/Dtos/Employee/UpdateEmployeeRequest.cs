using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Employee
{
    public class UpdateEmployeeRequest
    {
        public string? Name { get; set; }
        public string? Education { get; set; }

        public long PhoneNumber { get; set; }
    }
}