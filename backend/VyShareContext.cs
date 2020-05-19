using Microsoft.EntityFrameworkCore;
using VyShare.Models;

namespace VyShare
{

    public class VyShareContext : DbContext
    {
        public VyShareContext(DbContextOptions<VyShareContext> options):base(options)
        {
        }

        public DbSet<User> Users { get; set; }

    }
}