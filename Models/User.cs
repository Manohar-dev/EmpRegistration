using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class User
    {
        
        public int id {get; set;}
        
        public string?  username { get; set; }

        public virtual IList<string?>? comments {get; set;}
    }
}