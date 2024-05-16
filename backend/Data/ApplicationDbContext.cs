using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
   public class ApplicationDbContext : DbContext
 {
    public ApplicationDbContext(DbContextOptions dbContextOptions): base(dbContextOptions)
    {
        
    }
    public DbSet<Employee> Employees {get; set; } 
    public DbSet<User> Users {get; set;}
 }
}