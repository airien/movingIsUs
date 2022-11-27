using MediatR;
using Models;
using Repository;

namespace Features.GetOrders
{
    public class GetOrderssHandler : IRequestHandler<OrdersQuery, List<Order>?>
    {
        private IOrderRepository _repository;
        public GetOrderssHandler(IOrderRepository repository)
        {
            _repository = repository;
        }


        public Task<List<Order>?> Handle(OrdersQuery query, CancellationToken cancellationToken)
        {
            return _repository.GetOrdersAsync();
        }
    }
}
