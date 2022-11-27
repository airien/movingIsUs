using MediatR;
using Models;
using Repository;

namespace Features.AddOrder
{
    public class AddOrderHandler : IRequestHandler<AddOrderCommand, Order?>
    {
        private IOrderRepository _repository;
        public AddOrderHandler(IOrderRepository repository)
        {
            _repository = repository;
        }
 

        public Task<Order?> Handle(AddOrderCommand request, CancellationToken cancellationToken)
        {
            return _repository.SaveOrderAsync(request.Order);
        }
    }
}
