using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public record User
    (
        string Id,
        string Name,
        string Email,
        string Token,
        string Password
    );
}
