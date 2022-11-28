using MovingIsUsBackend.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public interface IOrderRepository
    {
        public List<Order>? GetOrders();
        public Order? GetOrderById(string id);
        public Order? GetOrderByName(string name);
        public bool DeleteOrder(string id);
        public Order? UpdateOrder(string id, Order order);
        public Order? SaveOrder(Order order);
        public Task<List<Order>?> GetOrdersAsync();
        public Task<Order?> GetOrderByIdAsync(string id);
        public Task<Order?> GetOrderByNameAsync(string name);
        public Task<bool> DeleteOrderAsync(string id);
        public Task<Order?> UpdateOrderAsync(string id, Order order);
        public Task<Order?> SaveOrderAsync(Order order);
    }
    public class OrderRepository : IOrderRepository
    {
        private OrderContext dbContext;
        public OrderRepository(OrderContext orderContext)
        {
            dbContext = orderContext;
            dbContext.Database.EnsureCreated();
        }

        public bool DeleteOrder(string id)
        {
            if (dbContext.Order == null)
            {
                return false;
            }
            var order = dbContext.Order.Include(e => e.Services).FirstOrDefault(i => i.OrderId == id);
            if (order == null)
            {
                return false;
            }
            dbContext.Order.Remove(order);
            dbContext.SaveChanges();
            return true;
        }

        public async Task<bool> DeleteOrderAsync(string id)
        {
            if (dbContext.Order == null)
            {
                return false;
            }
            var order = await dbContext.Order.Include(e => e.Services).FirstOrDefaultAsync(i => i.OrderId == id);
            if (order == null)
            {
                return false;
            }

            dbContext.Order.Remove(order);
            await dbContext.SaveChangesAsync();
            return true;
        }

        public Order? GetOrderById(string id)
        {
            return dbContext.Order.Include(e => e.Services).Where(o => o.OrderId == id).FirstOrDefault();
        }

        public async Task<Order?> GetOrderByIdAsync(string id)
        {
            if (dbContext.Order == null)
            {
                return null;
            }
            var order = await dbContext.Order.Include(e => e.Services).FirstOrDefaultAsync(i => i.OrderId == id);

            if (order == null)
            {
                return null;
            }

            return order;
        }
   

        public Order? GetOrderByName(string name)
        {
            if (dbContext.Order == null)
            {
                return null;
            }
            return dbContext.Order.Include(e => e.Services).Where(o => o.Name == name).FirstOrDefault();
        }

        public async Task<Order?> GetOrderByNameAsync(string name)
        {
            if (dbContext.Order == null)
            {
                return null;
            }
            var order = await dbContext.Order.Include(e => e.Services).Where(o => o.Name == name).FirstOrDefaultAsync();

            if (order == null)
            {
                return null;
            }

            return order;
        }

        public List<Order> GetOrders()
        {
            return dbContext.Order.Include(e => e.Services).ToList();
        }

        public async Task<List<Order>?> GetOrdersAsync()
        {
            if (dbContext.Order == null)
            {
                return null;
            }
            return await dbContext.Order.Include(e => e.Services).ToListAsync();
        }

        public Order? SaveOrder(Order order)
        {
            if (dbContext.Order == null)
            {
                return null;
            }
            dbContext.Order.Add(order); 
            dbContext.SaveChanges();
            return order;
        }

        public async Task<Order?> SaveOrderAsync(Order order)
        {
            if (dbContext.Order == null)
            {
                return null;
            }
            await dbContext.Order.AddAsync(order);
            try
            {
                await dbContext.SaveChangesAsync();
                return order;
            }
            catch (DbUpdateException)
            {
                if (OrderExists(order.OrderId))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }
        }

        public Order UpdateOrder(string id, Order order)
        {
            Order? existing = dbContext.Order.Include(e => e.Services).FirstOrDefault(i => i.OrderId == id);
            if (existing == null)
            {
                dbContext.Order.Add(order);
            }
            else
            {
                dbContext.Order.Remove(existing);
                dbContext.SaveChanges();
                dbContext.Order.Add(order);

            }
            dbContext.SaveChanges();
            return order;
        }

        public async Task<Order?> UpdateOrderAsync(string id, Order order)
        {
            Order? existing = await dbContext.Order.Include(e => e.Services).FirstOrDefaultAsync(i => i.OrderId == id);
            try
            {
                if (existing == null)
                {
                    dbContext.Order.Add(order);
                }
                else
                {
                    dbContext.Order.Remove(existing);
                    await dbContext.SaveChangesAsync();
                    dbContext.Order.Add(order);
                }
                await dbContext.SaveChangesAsync();
                return order;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }
        }
        private bool OrderExists(string id)
        {
            return (dbContext.Order?.Any(e => e.OrderId == id)).GetValueOrDefault();
        }
    }
}
