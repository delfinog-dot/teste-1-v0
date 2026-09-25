using Estoque.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Estoque.Api.Data;

public class EstoqueDbContext : DbContext
{
    public EstoqueDbContext(DbContextOptions<EstoqueDbContext> options) : base(options) { }

    public DbSet<Produto> Produtos => Set<Produto>();
    public DbSet<Carregamento> Carregamentos => Set<Carregamento>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Produto>(e =>
        {
            e.HasIndex(p => p.Sku).IsUnique();
            e.Property(p => p.Preco).HasPrecision(18, 2);
            e.Ignore(p => p.EstoqueBaixo); // propriedade calculada
        });

        modelBuilder.Entity<Carregamento>(e =>
        {
            e.HasIndex(c => c.Codigo).IsUnique();
        });
    }
}
