using Database;
using Microsoft.EntityFrameworkCore;
using Models;

namespace MovingIsUsBackend.Workers
{
    public class UserWorker : IHostedService
    {
        private readonly IServiceProvider _serviceProvider;

        public UserWorker(IServiceProvider serviceProvider)
            => _serviceProvider = serviceProvider;

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _serviceProvider.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<AuthenticationContext>();
            await context.Database.EnsureCreatedAsync();
            User? user = await context.Users.Where(u => u.Name == "hanne").FirstOrDefaultAsync();
            if (user == null)
            {
                await context.Users.AddAsync(
                    new User(
                        Guid.NewGuid().ToString(),
                        "hanne",
                        "hannejohnsen@gmail.com",
                        "",
                        "098F6BCD4621D373CADE4E832627B4F6"
                    )
                );
                await context.SaveChangesAsync();
            }
            User? user2 = await context.Users.Where(u => u.Name == "test").FirstOrDefaultAsync();
            if (user2 == null)
            {
                await context.Users.AddAsync(
                    new User(
                        Guid.NewGuid().ToString(),
                        "test",
                        "test@test.com",
                        "",
                        "098F6BCD4621D373CADE4E832627B4F6"
                    )
                );
                await context.SaveChangesAsync();
            }

        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;

    }
}
