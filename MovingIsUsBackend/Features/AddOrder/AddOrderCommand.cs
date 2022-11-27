using MediatR;
using Models;

namespace Features.AddOrder
{
    public record AddOrderCommand(Order Order) : IRequest<Order?>;
    
}
