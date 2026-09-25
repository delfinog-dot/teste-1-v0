using System.ComponentModel.DataAnnotations;

namespace Estoque.Api.Models;

// Mensagem de chat associada ao contexto de um carregamento (pedido).
public class MensagemChat
{
    public Guid Id { get; set; } = Guid.NewGuid();

    // Pedido ao qual a conversa pertence.
    [Required]
    public Guid CarregamentoId { get; set; }

    // Papel de quem enviou: "supervisor" ou "encarregado".
    [Required, StringLength(30)]
    public string Autor { get; set; } = "supervisor";

    [Required, StringLength(80)]
    public string AutorNome { get; set; } = string.Empty;

    [Required, StringLength(1000, MinimumLength = 1)]
    public string Texto { get; set; } = string.Empty;

    public DateTime EnviadoEm { get; set; } = DateTime.UtcNow;
}
