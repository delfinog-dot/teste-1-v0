using System.ComponentModel.DataAnnotations;

namespace Estoque.Api.Models;

public class Produto
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required(ErrorMessage = "O SKU é obrigatório.")]
    [StringLength(30, MinimumLength = 2, ErrorMessage = "O SKU deve ter entre 2 e 30 caracteres.")]
    public string Sku { get; set; } = string.Empty;

    [Required(ErrorMessage = "O nome é obrigatório.")]
    [StringLength(120, MinimumLength = 2)]
    public string Nome { get; set; } = string.Empty;

    [StringLength(60)]
    public string Categoria { get; set; } = "Geral";

    [Range(0, int.MaxValue, ErrorMessage = "A quantidade não pode ser negativa.")]
    public int Quantidade { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "O estoque mínimo não pode ser negativo.")]
    public int EstoqueMinimo { get; set; }

    [Range(0, double.MaxValue, ErrorMessage = "O preço não pode ser negativo.")]
    public decimal Preco { get; set; }

    [StringLength(120)]
    public string Localizacao { get; set; } = "Não definida";

    public DateTime AtualizadoEm { get; set; } = DateTime.UtcNow;

    // Regra de negócio: alerta de estoque baixo.
    public bool EstoqueBaixo => Quantidade <= EstoqueMinimo;
}
