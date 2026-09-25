using System.Text.Json.Serialization;

namespace Estoque.Api.Models;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum StatusCarregamento
{
    Pendente = 0,
    EmAndamento = 1,
    Expedido = 2
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum TipoMovimentacao
{
    Entrada = 0,
    Saida = 1
}
