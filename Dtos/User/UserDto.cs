using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.User
{
    public class UserDto
    {
        public int id { get; set; }
        public string? username { get; set; }

        public virtual IList<string?>? comments { get; set; }
    }
}