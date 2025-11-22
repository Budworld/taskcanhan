using Microsoft.EntityFrameworkCore;
using taskcanhanApi.Data;
using taskcanhanApi.Repositories;
using taskcanhanApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add MySQL EF DB and app services
var connectionString = builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<ITaskService, TaskService>();

var app = builder.Build();

// Ensure database exists and seed sample data if empty
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    if (!db.Tasks.Any())
    {
        db.Tasks.AddRange(new[]
        {
            new taskcanhanApi.Models.TaskCaNhan
            {
                Title = "Task mẫu 1",
                Description = "Mô tả task 1",
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow,
                DueDate = DateTime.UtcNow.AddDays(3)
            },
            new taskcanhanApi.Models.TaskCaNhan
            {
                Title = "Task mẫu 2",
                Description = "Mô tả task 2",
                IsCompleted = true,
                CreatedAt = DateTime.UtcNow.AddDays(-2),
                DueDate = DateTime.UtcNow.AddDays(1)
            }
        });

        db.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();
