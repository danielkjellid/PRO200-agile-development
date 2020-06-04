using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VyShare.Migrations
{
    public partial class InitDB : Migration
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
                values: new object[] { new Guid("281f253d-589e-45de-a54f-76fbc5c26706"), true, "Familietur til Grønnåsen 15.06.20", null });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "IsActive", "Name", "UserId" },
                values: new object[] { new Guid("2d2d8c65-7390-452a-b76e-aaf663ff3076"), true, "Fotballkamp", null });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "IsActive", "Name", "UserId" },
                values: new object[] { new Guid("41e00ed5-bdd0-49b1-bb4c-640a9c0c59ae"), false, "Skitur", null });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "IsActive", "Name", "UserId" },
                values: new object[] { new Guid("8d580160-fe0c-469c-94c4-35f13c86a4e5"), false, "Oslo 11.02.20", null });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("dcc5e755-35f9-4b7c-b17a-53823509293c"), "Contact", "katofje@online.no", "Kato", "Fjellberg", "90125872" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("e0eb2039-85b7-49a1-b20d-1ab15312ba11"), "Contact", "kathi95@gmail.com", "Kathrine", "Wesenlund", "40912854" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("eba9dcf6-a561-4817-a314-6bfce0c56888"), "Contact", "kk@realitytv.com", "Kim", "Kardashian", "92304215" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("ff8754e4-3cff-43a0-8301-245028613ad4"), "Contact", "karefje@online.no", "Kåre", "Fjellberg", "90002390" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber" },
                values: new object[] { new Guid("c593f031-a50e-4347-9776-32a99880ba3b"), "Contact", "kennekennern51@outlook.com", "Kenneth", "Kennesen", "40534009" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber", "Password", "Username" },
                values: new object[] { new Guid("2efde4fb-f278-461a-a938-dab1c86d22a6"), "User", "popokatepetl@online.no", "Pål", "Fjellberg", "90035412", null, "popokatepetl" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Discriminator", "Email", "FirstName", "LastName", "PhoneNumber", "Password", "Username" },
                values: new object[] { new Guid("4289cfb5-ef1f-41f4-944e-476bab860d2c"), "User", "marmelade86@gmail.com", "Mia", "Mikkelsen", "45612039", null, "marmelade86" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("d8c6424d-b1e6-4d8e-8197-6830bbe4caa6"), "Grønnåsen Skole", new Guid("281f253d-589e-45de-a54f-76fbc5c26706"), 412m, "YXHA5", "13A", "Volda", new Guid("dcc5e755-35f9-4b7c-b17a-53823509293c"), "Honnør" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("ef87e729-d5b9-4a6d-a916-741499101af0"), "Grønnåsen Skole", new Guid("281f253d-589e-45de-a54f-76fbc5c26706"), 375m, "YXHBA6", "13B", "Volda", new Guid("e0eb2039-85b7-49a1-b20d-1ab15312ba11"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("8060566d-22ba-47f1-a67f-aee1653e0488"), "Ullevål stadion", new Guid("2d2d8c65-7390-452a-b76e-aaf663ff3076"), 199m, "OPS34", "03A", "Sandefjord", new Guid("eba9dcf6-a561-4817-a314-6bfce0c56888"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("4abb8b6c-f3a2-4440-a27b-71e5e801cb22"), "Ullevål stadion", new Guid("2d2d8c65-7390-452a-b76e-aaf663ff3076"), 199m, "PSD33", "03B", "Sandefjord", new Guid("ff8754e4-3cff-43a0-8301-245028613ad4"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("6963b6b7-e334-44be-ae25-3c9f1038ecb6"), "Ullevål stadion", new Guid("2d2d8c65-7390-452a-b76e-aaf663ff3076"), 219m, "QSO20", "03C", "Larvik", new Guid("c593f031-a50e-4347-9776-32a99880ba3b"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("42acda43-9601-4b98-839c-5ecc9838ceb7"), "Gol", new Guid("41e00ed5-bdd0-49b1-bb4c-640a9c0c59ae"), 320m, "VBW93", "09D", "Oslo S", new Guid("dcc5e755-35f9-4b7c-b17a-53823509293c"), "Honnør" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("b8437d05-414e-44b8-a470-7aefc4de10ba"), "Gol", new Guid("41e00ed5-bdd0-49b1-bb4c-640a9c0c59ae"), 320m, "VNQ92", "09E", "Skøyen", new Guid("ff8754e4-3cff-43a0-8301-245028613ad4"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("a487e1cc-77bd-4bea-9a00-a17391821779"), "Gol", new Guid("41e00ed5-bdd0-49b1-bb4c-640a9c0c59ae"), 320m, "VCS20", "09C", "Oslo S", new Guid("e0eb2039-85b7-49a1-b20d-1ab15312ba11"), "Student" });

            migrationBuilder.InsertData(
                table: "BasicTickets",
                columns: new[] { "Id", "EndPoint", "OrderId", "Price", "ReferenceCode", "Seat", "StartPoint", "TicketHolderId", "Type" },
                values: new object[] { new Guid("a5de7f9d-b8f3-42de-828f-bee91b5b362f"), "Oslo S", new Guid("8d580160-fe0c-469c-94c4-35f13c86a4e5"), 72m, "ARQ42", "13D", "Kolbotn", new Guid("eba9dcf6-a561-4817-a314-6bfce0c56888"), "Student" });

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
