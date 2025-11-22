using Microsoft.EntityFrameworkCore;
using taskcanhanApi.Models;

namespace taskcanhanApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<TaskCaNhan> Tasks { get; set; }
    }
}