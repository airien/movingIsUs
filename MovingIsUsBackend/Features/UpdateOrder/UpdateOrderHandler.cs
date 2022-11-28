using MediatR;
using Models;
using Repository;

namespace Features.UpdateOrder
{
    public class UpdateOrderHandler : IRequestHandler<UpdateOrderCommand, Order?>
    {
        private IOrderRepository _repository;
        public UpdateOrderHandler(IOrderRepository repository)
        {
            _repository = repository;
        }
        public Task<Order?> Handle(UpdateOrderCommand request, CancellationToken cancellationToken)
        {
            return _repository.UpdateOrderAsync(request.Order.OrderId, request.Order);
        }
    }
}
