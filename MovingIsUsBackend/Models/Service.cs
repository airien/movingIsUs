using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Service
    {
        public string Id { get; set; }
        public string? Name { get; set; }
        public DateTime ServiceDate { get; set; }

        public Service()
        {
            Id = Guid.NewGuid().ToString();
        }

        public Service(string name, DateTime date) {
            Id = Guid.NewGuid().ToString();
            Name = name;
            ServiceDate= date;
        }
    }
}
