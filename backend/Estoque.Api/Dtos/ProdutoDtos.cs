using System.ComponentModel.DataAnnotations;
using Estoque.Api.Models;

namespace Estoque.Api.Dtos;

// Payload de criação/edição de produto.
public class ProdutoInputDto
{
    [Required, StringLength(30, MinimumLength = 2)]
    public string Sku { get; set; } = string.Empty;

    [Required, StringLength(120, MinimumLength = 2)]
    public string Nome { get; set; } = string.Empty;

    [StringLength(60)]
    public string Categoria { get; set; } = "Geral";

    [Range(0, int.MaxValue)]
    public int Quantidade { get; set; }

    [Range(0, int.MaxValue)]
    public int EstoqueMinimo { get; set; }

    [Range(0, double.MaxValue)]
    public decimal Preco { get; set; }

    [StringLength(120)]
    public string Localizacao { get; set; } = "Não definida";
}

// Payload de movimentação de estoque (entrada/saída).
public class MovimentacaoDto
{
    [Required]
    public TipoMovimentacao Tipo { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "A quantidade deve ser maior que zero.")]
    public int Quantidade { get; set; }
}
