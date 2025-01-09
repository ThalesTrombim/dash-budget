export const groupAndSumByMonthAndYear = (arr: any) => {
  // TODO: Revisar esse código depois.

  const grouped = arr.reduce((acc: any, current: any) => {
    // Extrair ano, mês e dia da string de data "YYYY-MM-DD"
    const [year, month, day] = current.date.split('-');

    // Criar a chave no formato MM-YYYY
    const key = `${month}-${year}`;

    // Se a chave não existir, inicializa o total para 0
    if (!acc[key]) {
      acc[key] = { month: `${month}-${year}`, totalAmount: 0 };
    }

    // Somar o amount ao total do mês correspondente
    acc[key].totalAmount += current.amount;

    return acc;
  }, {});

  return Object.values(grouped).sort((a: any, b: any) => {
    const [monthA, yearA] = a.month.split('-').map(Number); // Separar e converter para número
    const [monthB, yearB] = b.month.split('-').map(Number);

    // Comparar os anos, depois comparar os meses se os anos forem iguais
    return yearA - yearB || monthA - monthB;
  });
};