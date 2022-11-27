using MediatR;
using Models;

namespace Features.GetOrder
{
    public record OrderQuery(string Id): IRequest<Order?>;
}
