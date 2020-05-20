using Microsoft.EntityFrameworkCore.Migrations;

namespace VyShare.Migrations
{
    public partial class TicketSeat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Seat",
                table: "BasicTicket",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Seat",
                table: "BasicTicket");
        }
    }
}
