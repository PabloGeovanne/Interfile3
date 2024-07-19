using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Pab_Interfile_API.Data;
using Pab_Interfile_API.Controllers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
IConfiguration configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json", true, true).Build();
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "InterFile API",
        Description = "API de Teste InterFile",
        TermsOfService = new Uri("http://api.interfile.com/pages/termos.html"),

        Contact = new OpenApiContact
        {
            Name = "Exemplo Contato",
            Url = new Uri("http://api.interfile.com/pages/contato.html")
        },
        License = new OpenApiLicense
        {
            Name = "Exemplo de Licenca",
            Url = new Uri("http://api.interfile.com/pages/licenca.html")
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger(options =>
    {
        options.SerializeAsV2 = true; //Vers�o Antiga do Swagger
    });

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("./swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });
//}

app.UseAuthorization();

app.MapControllers();

app.Run();
