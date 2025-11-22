using taskcanhanApi.Dtos;

namespace taskcanhanApi.Services;

    public interface ITaskService
    {
        Task<IEnumerable<TaskDto>> GetTasksAsync(string? status = null);
        Task<TaskDto?> GetTaskByIdAsync(int id);
        Task<TaskDto> CreateTaskAsync(CreateTaskDto createTaskDto);
        Task<bool> UpdateTaskAsync(int id, UpdateTaskDto updateTaskDto);
        Task<bool> UpdateStatusAsync(int id, bool isCompleted);
        Task<bool> DeleteTaskAsync(int id);
    }

