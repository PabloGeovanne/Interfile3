using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pab_Interfile_API.Migrations
{
    /// <inheritdoc />
    public partial class Pessoa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pessoas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ds_Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dt_Nascimento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    vl_Renda = table.Column<double>(type: "float", nullable: false),
                    ds_Cpf = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ds_pw = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pessoas", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pessoas");
        }
    }
}
