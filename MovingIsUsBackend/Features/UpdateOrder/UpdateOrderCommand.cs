using MediatR;
using Models;

namespace Features.UpdateOrder
{
    public record UpdateOrderCommand(Order Order) : IRequest<Order?>;
}
