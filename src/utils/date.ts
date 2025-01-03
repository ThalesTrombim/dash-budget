import { format, parse, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';


export function dateToPTBR(dateString: string) {
  const date = parse(dateString, 'dd-MM-yyyy', new Date());
  const formattedDate = format(date, "dd MMMM yyyy", { locale: ptBR });

  return formattedDate;
}

export function formatDateToPTBR(date: string) {
  const formattedDate = format(parseISO(date), "dd/MM/yyyy");

  return formattedDate;
}