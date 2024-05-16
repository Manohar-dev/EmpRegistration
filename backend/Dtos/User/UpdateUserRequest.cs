namespace backend.Dtos.User
{
    public class UpdateUserRequest()
    {
        public string? username { get; set; }
         public IList<string?>? comments { get; set; }
    }
}