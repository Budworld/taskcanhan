namespace taskcanhanApi.Dtos;

public record TaskDto(int Id, string Title, string? Description, bool IsCompleted, DateTime CreatedAt, DateTime? DueDate);


    public class CreateTaskDto
    {
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
    }

    public class UpdateTaskDto
    {
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime? DueDate { get; set; }
    }
