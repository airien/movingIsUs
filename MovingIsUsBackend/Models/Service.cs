using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Service
    {
        public string ServiceId { get; set; } = Guid.NewGuid().ToString();
        public string? Name { get; set; }
        public DateTime ServiceDate { get; set; }

        public Service()
        {
            ServiceId = Guid.NewGuid().ToString();
        }

        public Service(string name, DateTime date) {
            ServiceId = Guid.NewGuid().ToString();
            Name = name;
            ServiceDate= date;
        }
    }
}
