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
                values: new object[] { new Guid("486c460b-dbae-4a5a-a3ef-fb9e94e1ff4d"), "Familietur til Grønnåsen 15.06.20", null });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "Name", "UserId" },
                values: new object[] { new Guid("0f76be9e-6181-4b0f-bd24-0749204e7d39"), "Fotballkamp", null });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("64eca478-593b-40d6-8785-dcf4322cbabf"), "Contact", "katofje@online.no", "Kato", "Fjellberg", "90125872" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("f4f86a47-e9a5-49b4-b187-745e6c0bbadb"), "Contact", "kathi95@gmail.com", "Kathrine", "Wesenlund", "40912854" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("865f6842-4fba-4cc7-b556-53bc6323b7b5"), "Contact", "kk@realitytv.com", "Kim", "Kardashian", "92304215" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("42dce654-7c54-44fd-b26d-ef4a3e469acf"), "Contact", "karefje@online.no", "Kåre", "Fjellberg", "90002390" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("e3476b88-c484-426b-aeeb-aab2de097dc3"), "Contact", "kennekennern51@outlook.com", "Kenneth", "Kennesen", "40534009" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber", "Password", "Username" },
                values: new object[] { new Guid("a384222a-89fa-4ac9-a60c-731814bc2732"), "User", "popokatepetl@online.no", "Pål", "Fjellberg", "90035412", null, "popokatepetl" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber", "Password", "Username" },
                values: new object[] { new Guid("6a50184a-c3db-46bc-9990-ae8e3b35c899"), "User", "marmelade86@gmail.com", "Mia", "Mikkelsen", "45612039", null, "marmelade86" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("b888c59c-5556-43f3-a57b-5dcfb2458990"), "Grønnåsen Skole", new Guid("486c460b-dbae-4a5a-a3ef-fb9e94e1ff4d"), 412m, "YXHA5", "13A", "Volda", new Guid("64eca478-593b-40d6-8785-dcf4322cbabf"), "Honnør" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("70189d4e-0a16-4370-b0e5-789b02d25fcf"), "Grønnåsen Skole", new Guid("486c460b-dbae-4a5a-a3ef-fb9e94e1ff4d"), 375m, "YXHBA6", "13B", "Volda", new Guid("f4f86a47-e9a5-49b4-b187-745e6c0bbadb"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("80c634d7-cde3-49ab-878d-db06b6a9ea27"), "Ullevål stadion", new Guid("0f76be9e-6181-4b0f-bd24-0749204e7d39"), 199m, "OPS34", "03A", "Sandefjord", new Guid("865f6842-4fba-4cc7-b556-53bc6323b7b5"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("210f3066-29da-4506-81aa-71e1bdc3351c"), "Ullevål stadion", new Guid("0f76be9e-6181-4b0f-bd24-0749204e7d39"), 199m, "PSD33", "03B", "Sandefjord", new Guid("42dce654-7c54-44fd-b26d-ef4a3e469acf"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("bedf6391-e36a-4a41-b2a2-fdf61028524c"), "Ullevål stadion", new Guid("0f76be9e-6181-4b0f-bd24-0749204e7d39"), 219m, "QSO20", "03C", "Larvik", new Guid("e3476b88-c484-426b-aeeb-aab2de097dc3"), "Student" });

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
