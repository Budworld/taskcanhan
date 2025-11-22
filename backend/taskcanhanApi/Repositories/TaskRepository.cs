using Microsoft.EntityFrameworkCore;
using taskcanhanApi.Data;
using taskcanhanApi.Models;
using System.Linq.Expressions;

namespace taskcanhanApi.Repositories;

    public class TaskRepository : ITaskRepository
    {
        private readonly AppDbContext _context;
        private readonly DbSet<TaskCaNhan> _dbSet;

        public TaskRepository(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<TaskCaNhan>();
        }

        public async Task<IEnumerable<TaskCaNhan>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<TaskCaNhan?> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<IEnumerable<TaskCaNhan>> FindAsync(Expression<Func<TaskCaNhan, bool>> predicate)
        {
            return await _dbSet.Where(predicate).ToListAsync();
        }

        public async Task AddAsync(TaskCaNhan entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public void Update(TaskCaNhan entity)
        {
            _dbSet.Update(entity);
        }

        public void Remove(TaskCaNhan entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
