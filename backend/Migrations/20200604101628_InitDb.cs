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
                    IsActive = table.Column<bool>(nullable: false),
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
                columns: new[] { "Id", "IsActive", "Name", "UserId" },
                values: new object[] { new Guid("8e2572c2-13d9-4023-b8af-6385285f3d7d"), true, "Familietur til Grønnåsen 15.06.20", null });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "IsActive", "Name", "UserId" },
                values: new object[] { new Guid("8426b257-a5ca-48d6-8f6a-52ec47785a58"), true, "Fotballkamp", null });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("69808911-4dfa-4ff2-811f-17c1436c557a"), "Contact", "katofje@online.no", "Kato", "Fjellberg", "90125872" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("33b72a84-1f0e-49a5-959a-a1224ba88cad"), "Contact", "kathi95@gmail.com", "Kathrine", "Wesenlund", "40912854" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("ee2852ac-0367-4a59-97a8-804156f19b44"), "Contact", "kk@realitytv.com", "Kim", "Kardashian", "92304215" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("2de01bd3-d536-4560-91d8-9555f7344faa"), "Contact", "karefje@online.no", "Kåre", "Fjellberg", "90002390" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("4ad9ff01-69cf-41d1-bf98-d2a952ebdc21"), "Contact", "kennekennern51@outlook.com", "Kenneth", "Kennesen", "40534009" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber", "Password", "Username" },
                values: new object[] { new Guid("13fa2a73-773c-4ce8-b9fb-2975ecd272ef"), "User", "popokatepetl@online.no", "Pål", "Fjellberg", "90035412", null, "popokatepetl" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber", "Password", "Username" },
                values: new object[] { new Guid("1d1f107d-4061-4393-9b7b-70e9fd1699c5"), "User", "marmelade86@gmail.com", "Mia", "Mikkelsen", "45612039", null, "marmelade86" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("1b745548-a080-4cbe-8ae0-b259fb33821e"), "Grønnåsen Skole", new Guid("8e2572c2-13d9-4023-b8af-6385285f3d7d"), 412m, "YXHA5", "13A", "Volda", new Guid("69808911-4dfa-4ff2-811f-17c1436c557a"), "Honnør" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("ae7e5857-8c38-4a94-b51e-9bb4a769067d"), "Grønnåsen Skole", new Guid("8e2572c2-13d9-4023-b8af-6385285f3d7d"), 375m, "YXHBA6", "13B", "Volda", new Guid("33b72a84-1f0e-49a5-959a-a1224ba88cad"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("9a0bcee7-182c-4829-86e3-1ad6edbd56c5"), "Ullevål stadion", new Guid("8426b257-a5ca-48d6-8f6a-52ec47785a58"), 199m, "OPS34", "03A", "Sandefjord", new Guid("ee2852ac-0367-4a59-97a8-804156f19b44"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("01a204c1-ae0f-4224-8a12-9df247774720"), "Ullevål stadion", new Guid("8426b257-a5ca-48d6-8f6a-52ec47785a58"), 199m, "PSD33", "03B", "Sandefjord", new Guid("2de01bd3-d536-4560-91d8-9555f7344faa"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("dbdbdd37-b766-4b3a-b030-d0bdbb66c04d"), "Ullevål stadion", new Guid("8426b257-a5ca-48d6-8f6a-52ec47785a58"), 219m, "QSO20", "03C", "Larvik", new Guid("4ad9ff01-69cf-41d1-bf98-d2a952ebdc21"), "Student" });

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
