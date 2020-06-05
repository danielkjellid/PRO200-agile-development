using System;
using System.Collections.Generic;
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
        public DbSet<BasicTicket> BasicTickets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var users = SeedUsers();
            modelBuilder.Entity<User>().HasData(users);

            var contacts = SeedContacts();
            modelBuilder.Entity<Contact>().HasData(contacts);

            var orders = SeedOrders();
            modelBuilder.Entity<Order>().HasData(orders);

            var basicTickets = SeedBasicTickets(orders, users, contacts);
            modelBuilder.Entity<BasicTicket>().HasData(basicTickets);

        }

        private List<User> SeedUsers()
        {
            return new List<User>(){
                new User() {
                    Id = Guid.NewGuid(),
                    Username = "popokatepetl",
                    FirstName = "Erlend",
                    LastName = "Fjellberg",
                    Email = "popokatepetl@online.no",
                    PhoneNumber = "90035412"
                },
                new User() {
                    Id = Guid.NewGuid(),
                    Username = "marmelade86",
                    FirstName = "Mia",
                    LastName = "Mikkelsen",
                    Email = "marmelade86@gmail.com",
                    PhoneNumber = "45612039"
                }
            };
        }

        private List<Contact> SeedContacts()
        {
            return new List<Contact>(){
                new Contact() {
                    Id = Guid.NewGuid(),
                    FirstName = "Kato",
                    LastName = "Fjellberg",
                    Email = "katofje@online.no",
                    PhoneNumber = "90125872"
                },
                new Contact(){
                    Id = Guid.NewGuid(),
                    FirstName = "Kathrine",
                    LastName = "Wesenlund",
                    Email = "kathi95@gmail.com",
                    PhoneNumber = "40912854"
                },
                new Contact() {
                    Id = Guid.NewGuid(),
                    FirstName = "Kim",
                    LastName = "Kardashian",
                    Email = "kk@realitytv.com",
                    PhoneNumber = "92304215"
                },
                new Contact() {
                    Id = Guid.NewGuid(),
                    FirstName = "Kåre",
                    LastName = "Fjellberg",
                    Email = "karefje@online.no",
                    PhoneNumber = "90002390"
                },
                new Contact() {
                    Id = Guid.NewGuid(),
                    FirstName = "Kenneth",
                    LastName = "Kennesen",
                    Email = "kennekennern51@outlook.com",
                    PhoneNumber = "40534009"
                }
            };
        }

        private List<Order> SeedOrders()
        {
            return new List<Order>() {
                new Order(){
                    Id = Guid.NewGuid(),
                    Name = "Familietur til Grønnåsen 15.06.20",
                    IsActive = true
                },
                new Order(){
                    Id = Guid.NewGuid(),
                    Name = "Fotballkamp",
                    IsActive = true
                },
                new Order(){
                    Id = Guid.NewGuid(),
                    Name = "Skitur",
                    IsActive = false
                },
                    new Order(){
                    Id = Guid.NewGuid(),
                    Name = "Oslo 11.02.20",
                    IsActive = false
                }
            };
        }

        private dynamic SeedBasicTickets(List<Order> orders, List<User> users, List<Contact> contacts)
        {
            return new[]{
                new {
                    OrderId = orders[0].Id,
                    Id = Guid.NewGuid(),
                    TicketHolderId = contacts[0].Id,
                    Type = "Honnør",
                    StartPoint = "Volda",
                    EndPoint = "Grønnåsen Skole",
                    ReferenceCode = "YXHA5",
                    Seat = "13A",
                    Price = 412m
                },
                new {
                    OrderId = orders[0].Id,
                    Id = Guid.NewGuid(),
                    TicketHolderId = contacts[1].Id,
                    Type = "Student",
                    StartPoint = "Volda",
                    EndPoint = "Grønnåsen Skole",
                    ReferenceCode = "YXHBA6",
                    Seat = "13B",
                    Price = 375m
                },
                new {
                    OrderId = orders[1].Id,
                    Id = Guid.NewGuid(),
                    TicketHolderId = contacts[2].Id,
                    Type = "Student",
                    StartPoint = "Sandefjord",
                    EndPoint = "Ullevål stadion",
                    ReferenceCode = "OPS34",
                    Seat = "03A",
                    Price = 199m
                },
                new {
                    OrderId = orders[1].Id,
                    Id = Guid.NewGuid(),
                    TicketHolderId = contacts[3].Id,
                    Type = "Student",
                    StartPoint = "Sandefjord",
                    EndPoint = "Ullevål stadion",
                    ReferenceCode = "PSD33",
                    Seat = "03B",
                    Price = 199m
                },
                new {
                    OrderId = orders[1].Id,
                    Id = Guid.NewGuid(),
                    TicketHolderId = contacts[4].Id,
                    Type = "Student",
                    StartPoint = "Larvik",
                    EndPoint = "Ullevål stadion",
                    ReferenceCode = "QSO20",
                    Seat = "03C",
                    Price = 219m
                },
                new {
                    OrderId = orders[2].Id,
                    Id = Guid.NewGuid(),
                    TicketHolderId = contacts[0].Id,
                    Type = "Honnør",
                    StartPoint = "Oslo S",
                    EndPoint = "Gol",
                    ReferenceCode = "VBW93",
                    Seat = "09D",
                    Price = 320m
                },
                new {
                    OrderId = orders[2].Id,
                    Id = Guid.NewGuid(),
                    TicketHolderId = contacts[3].Id,
                    Type = "Student",
                    StartPoint = "Skøyen",
                    EndPoint = "Gol",
                    ReferenceCode = "VNQ92",
                    Seat = "09E",
                    Price = 320m
                },
                new {
                    OrderId = orders[2].Id,
                    Id = Guid.NewGuid(),
                    TicketHolderId = contacts[1].Id,
                    Type = "Student",
                    StartPoint = "Oslo S",
                    EndPoint = "Gol",
                    ReferenceCode = "VCS20",
                    Seat = "09C",
                    Price = 320m
                },
                new {
                    OrderId = orders[3].Id,
                    Id = Guid.NewGuid(),
                    TicketHolderId = contacts[2].Id,
                    Type = "Student",
                    StartPoint = "Kolbotn",
                    EndPoint = "Oslo S",
                    ReferenceCode = "ARQ42",
                    Seat = "13D",
                    Price = 72m
                }
            };
        }

    }
}