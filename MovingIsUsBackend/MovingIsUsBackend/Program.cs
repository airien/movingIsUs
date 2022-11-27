using Microsoft.EntityFrameworkCore;
using MovingIsUsBackend.Data;
using Repository;
using Features.GetOrder;
using MediatR;
using Database;
using Microsoft.OpenApi.Models;
using Models;
using MovingIsUsBackend.Workers;
using OpenIddict.Validation.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<OrderContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("OrderContext") ?? throw new InvalidOperationException("Connection string 'OrderContext' not found.")));
builder.Services.AddDbContext<AuthenticationContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("AuthenticationContext") ?? throw new InvalidOperationException("Connection string 'OrderContext' not found."));
    options.UseOpenIddict();
});

builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddMediatR(typeof(GetOrdersHandler).Assembly);
// Add services to the container.
builder.Services.AddOpenIddict()

    // Register the OpenIddict core components.
    .AddCore(options =>
    {
        // Configure OpenIddict to use the Entity Framework Core stores and models.
        // Note: call ReplaceDefaultEntities() to replace the default entities.
        options.UseEntityFrameworkCore()
               .UseDbContext<AuthenticationContext>();
    })

    // Register the OpenIddict server components.
    .AddServer(options =>
    {

        // Enable the token endpoint.
        options.SetTokenEndpointUris("/connect/token");

        // Enable the password flow.
        options.AllowPasswordFlow();

        // Accept anonymous clients (i.e clients that don't send a client_id).
        options.AcceptAnonymousClients();

        // Register the signing and encryption credentials.
        options.AddDevelopmentEncryptionCertificate()
               .AddDevelopmentSigningCertificate();

        // Register the ASP.NET Core host and configure the authorization endpoint
        // to allow the /authorize minimal API handler to handle authorization requests
        // after being validated by the built-in OpenIddict server event handlers.
        //
        // Token requests will be handled by OpenIddict itself by reusing the identity
        // created by the /authorize handler and stored in the authorization codes.
        options.UseAspNetCore()
               .EnableAuthorizationEndpointPassthrough().EnableTokenEndpointPassthrough();
    })

    // Register the OpenIddict validation components.
    .AddValidation(options =>
    {
        // Import the configuration from the local OpenIddict server instance.
        options.UseLocalServer();

        // Register the ASP.NET Core host.
        options.UseAspNetCore();
    });
// Register the worker responsible of seeding the database with the sample clients.
// Note: in a real world application, this step should be part of a setup script.
builder.Services.AddHostedService<UserWorker>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt =>
{
    opt.SwaggerDoc("v1", new OpenApiInfo { Title = "MovingIsUs API", Version = "v1" });
    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });
    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

builder.Services.AddAuthentication(OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme);
builder.Services.AddAuthorization();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.UseEndpoints(options =>
{
    options.MapControllers();
    options.MapDefaultControllerRoute();
});

app.Run();