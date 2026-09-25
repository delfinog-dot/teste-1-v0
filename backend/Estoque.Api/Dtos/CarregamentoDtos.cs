using System.ComponentModel.DataAnnotations;
using Estoque.Api.Models;

namespace Estoque.Api.Dtos;

// Payload de criação/edição de carregamento.
public class CarregamentoInputDto
{
    [Required, StringLength(30, MinimumLength = 2)]
    public string Codigo { get; set; } = string.Empty;

    [Required, StringLength(120)]
    public string Cliente { get; set; } = string.Empty;

    [StringLength(120)]
    public string Transportadora { get; set; } = string.Empty;

    [Range(1, int.MaxValue)]
    public int QuantidadeItens { get; set; }

    public DateTime DataHoraPrevista { get; set; } = DateTime.UtcNow;
}

// Payload de atualização de status.
public class StatusUpdateDto
{
    [Required]
    public StatusCarregamento Status { get; set; }
}
