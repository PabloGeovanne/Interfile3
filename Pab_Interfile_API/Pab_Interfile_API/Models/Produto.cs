using Pab_Interfile_API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.AspNetCore.Http.HttpResults;
namespace Pab_Interfile_API.Models
{
    public class Produto
    {
        public int Id { get; set; }
        public string ds_Nome { get; set; }
        public double vl_Preco { get; set; }
        public int qt_Estoque { get; set; }
    }
}
