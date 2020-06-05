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
                values: new object[] { new Guid("3599732a-dadd-4dcc-84ea-d11b93083f8a"), true, "Familietur til Grønnåsen 15.06.20", null });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "IsActive", "Name", "UserId" },
                values: new object[] { new Guid("ccee8500-bace-41d7-b3ba-6b677797dd67"), true, "Fotballkamp", null });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "IsActive", "Name", "UserId" },
                values: new object[] { new Guid("e1a95406-0647-49f5-b8d5-bcc2a71293e2"), false, "Skitur", null });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "IsActive", "Name", "UserId" },
                values: new object[] { new Guid("c1640b6f-c777-4ad9-9c54-f3df73b11e47"), false, "Oslo 11.02.20", null });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("d2e7b6b6-63bc-43f3-bf14-98f4d67cec4a"), "Contact", "katofje@online.no", "Kato", "Fjellberg", "90125872" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("3fc861a2-8392-4537-a78a-6cc6dc34c853"), "Contact", "kathi95@gmail.com", "Kathrine", "Wesenlund", "40912854" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("80ba65f7-452b-4197-8056-660cc6dc9338"), "Contact", "kk@realitytv.com", "Kim", "Kardashian", "92304215" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("4200c025-8be3-4f65-8a77-938344469122"), "Contact", "karefje@online.no", "Kåre", "Fjellberg", "90002390" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("054c5c4d-0e33-4c72-8b7a-def3b080a0de"), "Contact", "kennekennern51@outlook.com", "Kenneth", "Kennesen", "40534009" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber", "Password", "Username" },
                values: new object[] { new Guid("b6af73c7-f126-406f-a1d3-78b30120e485"), "User", "popokatepetl@online.no", "Erlend", "Fjellberg", "90035412", null, "popokatepetl" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber", "Password", "Username" },
                values: new object[] { new Guid("f8da3626-b3f7-4fd9-8269-cff4c8820628"), "User", "marmelade86@gmail.com", "Mia", "Mikkelsen", "45612039", null, "marmelade86" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("aad443a1-a807-4224-83d4-5c7aa0966418"), "Grønnåsen Skole", new Guid("3599732a-dadd-4dcc-84ea-d11b93083f8a"), 412m, "YXHA5", "13A", "Volda", new Guid("d2e7b6b6-63bc-43f3-bf14-98f4d67cec4a"), "Honnør" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("57ae7b07-192d-4cf6-b0ab-90ed48e23258"), "Grønnåsen Skole", new Guid("3599732a-dadd-4dcc-84ea-d11b93083f8a"), 375m, "YXHBA6", "13B", "Volda", new Guid("3fc861a2-8392-4537-a78a-6cc6dc34c853"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("ed5f141b-f427-4fab-8e0b-6ecb29beede4"), "Ullevål stadion", new Guid("ccee8500-bace-41d7-b3ba-6b677797dd67"), 199m, "OPS34", "03A", "Sandefjord", new Guid("80ba65f7-452b-4197-8056-660cc6dc9338"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("45cb5db7-af69-4ad4-ab35-c66fc1be192f"), "Ullevål stadion", new Guid("ccee8500-bace-41d7-b3ba-6b677797dd67"), 199m, "PSD33", "03B", "Sandefjord", new Guid("4200c025-8be3-4f65-8a77-938344469122"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("61bc2b42-9259-41a6-bb23-186093ef9542"), "Ullevål stadion", new Guid("ccee8500-bace-41d7-b3ba-6b677797dd67"), 219m, "QSO20", "03C", "Larvik", new Guid("054c5c4d-0e33-4c72-8b7a-def3b080a0de"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("ace6a478-9e93-4aac-8c2c-a884cd6515fd"), "Gol", new Guid("e1a95406-0647-49f5-b8d5-bcc2a71293e2"), 320m, "VBW93", "09D", "Oslo S", new Guid("d2e7b6b6-63bc-43f3-bf14-98f4d67cec4a"), "Honnør" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("2e5ab995-cb77-4d06-bb6f-486ee1f18b37"), "Gol", new Guid("e1a95406-0647-49f5-b8d5-bcc2a71293e2"), 320m, "VNQ92", "09E", "Skøyen", new Guid("4200c025-8be3-4f65-8a77-938344469122"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("983f9840-dd0f-4eab-90f6-94310dba114a"), "Gol", new Guid("e1a95406-0647-49f5-b8d5-bcc2a71293e2"), 320m, "VCS20", "09C", "Oslo S", new Guid("3fc861a2-8392-4537-a78a-6cc6dc34c853"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("49d0a7df-a6f5-406f-9e6f-e7a4df6fa773"), "Oslo S", new Guid("c1640b6f-c777-4ad9-9c54-f3df73b11e47"), 72m, "ARQ42", "13D", "Kolbotn", new Guid("80ba65f7-452b-4197-8056-660cc6dc9338"), "Student" });

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
