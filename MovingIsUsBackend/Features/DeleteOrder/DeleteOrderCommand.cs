using MediatR;

namespace Features.DeleteOrder
{
    public record DeleteOrderCommand(string Id): IRequest<bool>;
}
