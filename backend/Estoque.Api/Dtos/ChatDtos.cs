using System.ComponentModel.DataAnnotations;

namespace Estoque.Api.Dtos;

// Payload de envio de mensagem no chat de um pedido.
public class MensagemInputDto
{
    [Required, StringLength(30)]
    public string Autor { get; set; } = string.Empty; // supervisor | encarregado

    [Required, StringLength(80)]
    public string AutorNome { get; set; } = string.Empty;

    [Required, StringLength(1000, MinimumLength = 1)]
    public string Texto { get; set; } = string.Empty;
}
