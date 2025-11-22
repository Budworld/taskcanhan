using System.Linq;
using taskcanhanApi.Dtos;
using taskcanhanApi.Models;
using taskcanhanApi.Repositories;

namespace taskcanhanApi.Services;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _taskRepository;

    public TaskService(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<IEnumerable<TaskDto>> GetTasksAsync(string? status = null)
    {
        IEnumerable<TaskCaNhan> tasks;

        if (string.IsNullOrWhiteSpace(status) || status.Trim().ToLower() == "all")
        {
            tasks = await _taskRepository.GetAllAsync();
        }
        else
        {
            var s = status.Trim().ToLower();
            if (s == "doing" || s == "inprogress" || s == "danglam")
            {
                tasks = await _taskRepository.FindAsync(t => !t.IsCompleted);
            }
            else
            {
                tasks = await _taskRepository.FindAsync(t => t.IsCompleted);
            }
        }

        return tasks.Select(t => new TaskDto(t.Id, t.Title, t.Description, t.IsCompleted, t.CreatedAt, t.DueDate));
    }

    public async Task<TaskDto?> GetTaskByIdAsync(int id)
    {
        var task = await _taskRepository.GetByIdAsync(id);
        if (task == null) return null;

        return new TaskDto(task.Id, task.Title, task.Description, task.IsCompleted, task.CreatedAt, task.DueDate);
    }

    public async Task<TaskDto> CreateTaskAsync(CreateTaskDto createTaskDto)
    {
        var entity = new TaskCaNhan
        {
            Title = createTaskDto.Title,
            Description = createTaskDto.Description ?? string.Empty,
            DueDate = createTaskDto.DueDate,
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow
        };

        await _taskRepository.AddAsync(entity);
        await _taskRepository.SaveChangesAsync();

        return new TaskDto(entity.Id, entity.Title, entity.Description, entity.IsCompleted, entity.CreatedAt, entity.DueDate);
    }

    public async Task<bool> UpdateTaskAsync(int id, UpdateTaskDto updateTaskDto)
    {
        var task = await _taskRepository.GetByIdAsync(id);
        if (task == null) return false;

        task.Title = updateTaskDto.Title;
        task.Description = updateTaskDto.Description ?? task.Description ?? string.Empty;
        task.IsCompleted = updateTaskDto.IsCompleted;
        task.DueDate = updateTaskDto.DueDate;

        _taskRepository.Update(task);
        await _taskRepository.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UpdateStatusAsync(int id, bool isCompleted)
    {
        var task = await _taskRepository.GetByIdAsync(id);
        if (task == null) return false;

        task.IsCompleted = isCompleted;
        _taskRepository.Update(task);
        await _taskRepository.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteTaskAsync(int id)
    {
        var task = await _taskRepository.GetByIdAsync(id);
        if (task == null) return false;

        _taskRepository.Remove(task);
        await _taskRepository.SaveChangesAsync();
        return true;
    }
}