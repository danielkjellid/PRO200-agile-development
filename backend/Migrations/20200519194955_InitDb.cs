using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VyShare.Migrations
{
    public partial class InitDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "People",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    Discriminator = table.Column<string>(nullable: false),
                    Username = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_People", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    UserId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_People_UserId",
                        column: x => x.UserId,
                        principalTable: "People",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BasicTicket",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    TicketHolderId = table.Column<Guid>(nullable: true),
                    Type = table.Column<string>(nullable: true),
                    StartPoint = table.Column<string>(nullable: true),
                    EndPoint = table.Column<string>(nullable: true),
                    ReferenceCode = table.Column<string>(nullable: true),
                    Price = table.Column<decimal>(nullable: false),
                    OrderId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BasicTicket", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BasicTicket_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BasicTicket_People_TicketHolderId",
                        column: x => x.TicketHolderId,
                        principalTable: "People",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BasicTicket_OrderId",
                table: "BasicTicket",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_BasicTicket_TicketHolderId",
                table: "BasicTicket",
                column: "TicketHolderId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BasicTicket");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "People");
        }
    }
}
