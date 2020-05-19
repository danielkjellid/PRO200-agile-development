﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using VyShare;

namespace VyShare.Migrations
{
    [DbContext(typeof(VyShareContext))]
    partial class VyShareContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.4");

            modelBuilder.Entity("VyShare.Models.Order", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Order");
                });

            modelBuilder.Entity("VyShare.Models.Person", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Person");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Person");
                });

            modelBuilder.Entity("VyShare.Models.Station", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("ZoneId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ZoneId");

                    b.ToTable("Station");
                });

            modelBuilder.Entity("VyShare.Models.Ticket", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("EndPointId")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("OrderId")
                        .HasColumnType("TEXT");

                    b.Property<string>("ReferenceCode")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("StartPointId")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("TicketHolderId")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("TypeId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("EndPointId");

                    b.HasIndex("OrderId");

                    b.HasIndex("StartPointId");

                    b.HasIndex("TicketHolderId");

                    b.HasIndex("TypeId");

                    b.ToTable("Ticket");
                });

            modelBuilder.Entity("VyShare.Models.TicketType", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<decimal>("CostFactor")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("TicketType");
                });

            modelBuilder.Entity("VyShare.Models.Zone", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<decimal>("BaseCost")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Zone");
                });

            modelBuilder.Entity("VyShare.Models.User", b =>
                {
                    b.HasBaseType("VyShare.Models.Person");

                    b.Property<string>("Password")
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .HasColumnType("TEXT");

                    b.HasDiscriminator().HasValue("User");
                });

            modelBuilder.Entity("VyShare.Models.Order", b =>
                {
                    b.HasOne("VyShare.Models.User", null)
                        .WithMany("Orders")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("VyShare.Models.Station", b =>
                {
                    b.HasOne("VyShare.Models.Zone", "Zone")
                        .WithMany()
                        .HasForeignKey("ZoneId");
                });

            modelBuilder.Entity("VyShare.Models.Ticket", b =>
                {
                    b.HasOne("VyShare.Models.Station", "EndPoint")
                        .WithMany()
                        .HasForeignKey("EndPointId");

                    b.HasOne("VyShare.Models.Order", null)
                        .WithMany("Tickets")
                        .HasForeignKey("OrderId");

                    b.HasOne("VyShare.Models.Station", "StartPoint")
                        .WithMany()
                        .HasForeignKey("StartPointId");

                    b.HasOne("VyShare.Models.Person", "TicketHolder")
                        .WithMany()
                        .HasForeignKey("TicketHolderId");

                    b.HasOne("VyShare.Models.TicketType", "Type")
                        .WithMany()
                        .HasForeignKey("TypeId");
                });
#pragma warning restore 612, 618
        }
    }
}
