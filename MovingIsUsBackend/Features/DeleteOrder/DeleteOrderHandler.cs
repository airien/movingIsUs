using MediatR;
using Repository;

namespace Features.DeleteOrder
{
    public class DeleteOrderHandler : IRequestHandler<DeleteOrderCommand, bool>
    {
        private IOrderRepository _repository;
        public DeleteOrderHandler(IOrderRepository repository)
        {
            _repository = repository;
        }


        public Task<bool> Handle(DeleteOrderCommand request, CancellationToken cancellationToken)
        {
            return _repository.DeleteOrderAsync(request.Id);
        }
    }
}
