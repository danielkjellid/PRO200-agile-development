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
                    IsActive = table.Column<bool>(nullable: false),
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
                values: new object[] { new Guid("c259810e-6c0b-44ee-a580-f9c703eaf8dd"), "Familietur til Grønnåsen 15.06.20", null });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "Name", "UserId" },
                values: new object[] { new Guid("3d812e1e-cce7-4c18-aba4-9ed44a4602b0"), "Fotballkamp", null });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("f0da2c94-0e61-40d4-8ddd-06e84bbc984b"), "Contact", "katofje@online.no", "Kato", "Fjellberg", "90125872" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("20eedd7a-1cfe-4e49-9734-a99840fcd02d"), "Contact", "kathi95@gmail.com", "Kathrine", "Wesenlund", "40912854" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("5c784931-b68f-45bb-9a64-04eaeedcf9ab"), "Contact", "kk@realitytv.com", "Kim", "Kardashian", "92304215" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("0923dfad-0dec-4c77-98e3-8c5fa45f3c1a"), "Contact", "karefje@online.no", "Kåre", "Fjellberg", "90002390" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("bdc35d66-4bff-486c-b704-42813e5ce705"), "Contact", "kennekennern51@outlook.com", "Kenneth", "Kennesen", "40534009" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber", "Password", "Username" },
                values: new object[] { new Guid("335f3979-2207-4eff-ae99-7bc366d24665"), "User", "popokatepetl@online.no", "Pål", "Fjellberg", "90035412", null, "popokatepetl" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber", "Password", "Username" },
                values: new object[] { new Guid("e8e52516-0d97-4f43-ba26-c7e33b6745d3"), "User", "marmelade86@gmail.com", "Mia", "Mikkelsen", "45612039", null, "marmelade86" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "IsActive", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("107df416-0344-403a-a765-b00cef44c919"), "Grønnåsen Skole", true, new Guid("c259810e-6c0b-44ee-a580-f9c703eaf8dd"), 412m, "YXHA5", "13A", "Volda", new Guid("f0da2c94-0e61-40d4-8ddd-06e84bbc984b"), "Honnør" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "IsActive", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("dc619660-4158-4a94-81ae-bc956d7f65b7"), "Grønnåsen Skole", false, new Guid("c259810e-6c0b-44ee-a580-f9c703eaf8dd"), 375m, "YXHBA6", "13B", "Volda", new Guid("20eedd7a-1cfe-4e49-9734-a99840fcd02d"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "IsActive", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("8d984c1f-82cf-4523-9cc8-22f953cab172"), "Ullevål stadion", true, new Guid("3d812e1e-cce7-4c18-aba4-9ed44a4602b0"), 199m, "OPS34", "03A", "Sandefjord", new Guid("5c784931-b68f-45bb-9a64-04eaeedcf9ab"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "IsActive", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("f6dd9907-59a4-4abc-9baf-eaad7655b823"), "Ullevål stadion", false, new Guid("3d812e1e-cce7-4c18-aba4-9ed44a4602b0"), 199m, "PSD33", "03B", "Sandefjord", new Guid("0923dfad-0dec-4c77-98e3-8c5fa45f3c1a"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "IsActive", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("f8b50f5c-702d-4262-a831-ff749fde14f0"), "Ullevål stadion", true, new Guid("3d812e1e-cce7-4c18-aba4-9ed44a4602b0"), 219m, "QSO20", "03C", "Larvik", new Guid("bdc35d66-4bff-486c-b704-42813e5ce705"), "Student" });

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
