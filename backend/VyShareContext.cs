using Microsoft.EntityFrameworkCore;
using VyShare.Models;

namespace VyShare
{

    public class VyShareContext : DbContext
    {
        public VyShareContext(DbContextOptions<VyShareContext> options) : base(options)
        {
        }

        public DbSet<Person> People { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Order> Orders { get; set; }
        //public DbSet<BasicTicket> BasicTickets { get; set; }  // Retrieved via Order

    }
}