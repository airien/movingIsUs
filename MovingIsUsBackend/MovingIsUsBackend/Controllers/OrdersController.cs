using Features.AddOrder;
using Features.DeleteOrder;
using Features.GetOrder;
using Features.GetOrders;
using Features.UpdateOrder;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace MovingIsUsBackend.Controllers
{
    [Authorize(Roles = "Writer")]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public OrdersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrder()
        {
            IEnumerable<Order>? orders = await _mediator.Send(new OrdersQuery());
            if(orders == null)
            {
                return NotFound();
            }
            return Ok(orders);
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(string id)
        {
            var order = await _mediator.Send(new OrderQuery(id));
            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(string id, Order order)
        {
            if (order == null || id != order.Id)
            {
                return BadRequest();
            }

            var newOrder = await _mediator.Send(new UpdateOrderCommand(order));
            return Ok(newOrder);
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            Order? newOrder = await _mediator.Send(new AddOrderCommand(order));
            if (newOrder == null)
            {
                return Problem("Entity set 'OrderContext.Order'  is null or Order aldready exists");
            }

            return CreatedAtAction("GetOrder", new { id = newOrder.Id }, newOrder);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(string id)
        {
            bool isDeleted = await _mediator.Send(new DeleteOrderCommand(id));
            if (!isDeleted)
            {
                return NotFound(id);
            }
            return NoContent();
        }
    }
}
