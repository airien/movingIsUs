using Features.DeleteOrder;
using MediatR;
using Models;
using Repository;

namespace Features.GetOrder
{
    public class GetOrdersHandler : IRequestHandler<OrderQuery, Order?>
    {
        private IOrderRepository _repository;
        public GetOrdersHandler(IOrderRepository repository)
        {
            _repository = repository;
        }


        public Task<Order?> Handle(OrderQuery query, CancellationToken cancellationToken)
        {
            return _repository.GetOrderByIdAsync(query.Id);
        }
    }
}
