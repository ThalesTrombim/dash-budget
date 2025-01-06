import { format, parse, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';


export function dateToPTBR(dateString: string) {
  const date = parse(dateString, 'dd-MM-yyyy', new Date());
  const formattedDate = format(date, "dd MMMM yyyy", { locale: ptBR });

  return formattedDate;
}
export function dateToPTBR2(dateString: string) {
  try {
    // Parse a data no formato dd/MM/yyyy
    const date = parse(dateString, "dd/MM/yyyy", new Date());
    console.log('data', date);
    // Verifica se a data é válida
    if (isNaN(date.getTime())) {
      throw new Error("Data inválida");
    }

    // Formata a data no estilo dd MMMM yyyy (exemplo: 03 fevereiro 2025)
    const formattedDate = format(date, "dd MMMM yyyy", { locale: ptBR });

    return formattedDate;
  } catch (error) {
    console.error("Erro ao converter a data:", error);
    return "Data inválida";
  }
}

export function formatDateToPTBR(date: string) {
  const formattedDate = format(parseISO(date), "dd/MM/yyyy");

  return formattedDate;
}