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
                name: "BasicTickets",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    TicketHolderId = table.Column<Guid>(nullable: true),
                    Type = table.Column<string>(nullable: true),
                    StartPoint = table.Column<string>(nullable: true),
                    EndPoint = table.Column<string>(nullable: true),
                    ReferenceCode = table.Column<string>(nullable: true),
                    Seat = table.Column<string>(nullable: true),
                    Price = table.Column<decimal>(nullable: false),
                    OrderId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BasicTickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BasicTickets_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BasicTickets_People_TicketHolderId",
                        column: x => x.TicketHolderId,
                        principalTable: "People",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "Name", "UserId" },
                values: new object[] { new Guid("db212431-e6e3-4ac8-acd0-c54c72f1700c"), "Familietur til Grønnåsen 15.06.20", null });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("8489d192-933a-40c0-b01c-d4253bcdb211"), "Contact", "katofje@online.no", "Kato", "Fjellberg", "90125872" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("647e718c-ad13-4229-964b-16cf84ac5f6b"), "Contact", "kathi95@gmail.com", "Kathrine", "Wesenlund", "40912854" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber", "Password", "Username" },
                values: new object[] { new Guid("5eca00d9-0810-4698-b61b-0bd4fc09fca3"), "User", "popokatepetl@online.no", "Pål", "Fjellberg", "90035412", null, "popokatepetl" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("f76eef48-7a89-400e-9258-b82cfc83e8c6"), "Grønnåsen Skole", new Guid("db212431-e6e3-4ac8-acd0-c54c72f1700c"), 412m, "YXHA5", "13A", "Volda", new Guid("8489d192-933a-40c0-b01c-d4253bcdb211"), "Honnør" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("e9444419-1a72-4f4e-a3c8-bc87b87c1a43"), "Grønnåsen Skole", new Guid("db212431-e6e3-4ac8-acd0-c54c72f1700c"), 375m, "YXHBA6", "13B", "Volda", new Guid("647e718c-ad13-4229-964b-16cf84ac5f6b"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("66d89f1b-fe89-4ed8-88cb-fb33d9b43524"), "Grønnåsen Skole", new Guid("db212431-e6e3-4ac8-acd0-c54c72f1700c"), 468m, "YXWO2", "01D", "Solheimen", new Guid("5eca00d9-0810-4698-b61b-0bd4fc09fca3"), "Honnør" });

            migrationBuilder.CreateIndex(
                name: "IX_BasicTickets_OrderId",
                table: "BasicTickets",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_BasicTickets_TicketHolderId",
                table: "BasicTickets",
                column: "TicketHolderId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BasicTickets");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "People");
        }
    }
}
