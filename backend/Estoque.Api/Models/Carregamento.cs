using System.ComponentModel.DataAnnotations;

namespace Estoque.Api.Models;

public class Carregamento
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required(ErrorMessage = "O código é obrigatório.")]
    [StringLength(30, MinimumLength = 2)]
    public string Codigo { get; set; } = string.Empty;

    [Required(ErrorMessage = "O cliente é obrigatório.")]
    [StringLength(120)]
    public string Cliente { get; set; } = string.Empty;

    [StringLength(120)]
    public string Transportadora { get; set; } = string.Empty;

    [Range(1, int.MaxValue, ErrorMessage = "O carregamento deve ter ao menos 1 item.")]
    public int QuantidadeItens { get; set; }

    public StatusCarregamento Status { get; set; } = StatusCarregamento.Pendente;

    public DateTime DataHoraPrevista { get; set; } = DateTime.UtcNow;

    public DateTime CriadoEm { get; set; } = DateTime.UtcNow;
}
