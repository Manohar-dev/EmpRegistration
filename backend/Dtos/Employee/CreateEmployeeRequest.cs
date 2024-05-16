namespace backend.Dtos.Employee
{
    public class CreateEmployeeRequest
    {
        public string? Name { get; set; }
        public string? Education { get; set; }

        public long PhoneNumber { get; set; }
    }
}