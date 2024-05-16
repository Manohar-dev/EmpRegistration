using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.User
{
    public class CreateUserRequest
    {
        public string? username { get; set; }

        public IList<string?>?  comments { get; set; }
    }
}