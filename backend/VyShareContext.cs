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
            
            var order = SeedOrder();
            modelBuilder.Entity<Order>().HasData(order);

            var basicTickets = SeedBasicTickets(order, users, contacts);
            modelBuilder.Entity<BasicTicket>().HasData(basicTickets);

        }

        private List<User> SeedUsers()
        {
            return new List<User>(){
                new User() {
                    Id = Guid.NewGuid(),
                    Username = "popokatepetl",
                    FirstName = "Pål",
                    LastName = "Fjellberg",
                    Email = "popokatepetl@online.no",
                    PhoneNumber = "90035412"
                }
            };
        }

        private List<Contact> SeedContacts(){
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
                }
            };
        }

        private Order SeedOrder(){
            return new Order() {
                    Id = Guid.NewGuid(),
                    Name = "Familietur til Grønnåsen 15.06.20"
            };
        }

        private dynamic SeedBasicTickets(Order order, List<User> users, List<Contact> contacts){
            return new []{
                new {
                    OrderId = order.Id,
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
                    OrderId = order.Id,
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
                    OrderId = order.Id,
                    Id = Guid.NewGuid(),
                    TicketHolderId = users[0].Id,
                    Type = "Honnør",
                    StartPoint = "Solheimen",
                    EndPoint = "Grønnåsen Skole",
                    ReferenceCode = "YXWO2",
                    Seat = "01D",
                    Price = 468m
                }
            };
        }

    }
}