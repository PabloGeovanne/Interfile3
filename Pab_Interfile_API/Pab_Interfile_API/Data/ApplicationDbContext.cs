using Microsoft.EntityFrameworkCore;
using Pab_Interfile_API.Models;

namespace Pab_Interfile_API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Produto> Produtos { get; set; }

        public DbSet<Pessoa> Pessoas { get; set; }
    }
}
