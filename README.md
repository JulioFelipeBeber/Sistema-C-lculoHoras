Introdução
Este sistema foi criado para facilitar o controle das horas trabalhadas e o cálculo do adicional noturno. Ele permite que você insira as marcações de entrada e saída ao longo do expediente, e o sistema automaticamente calcula o total de horas trabalhadas, horas normais, adicional noturno, intervalos, além de indicar se há débito ou crédito de horas em relação à carga horária diária. Tudo isso foi pensado para simplificar o controle do tempo de trabalho, especialmente em empresas que fazem uso de jornadas noturnas.

Decisões Tomadas no Desenvolvimento
Carga Horária Diária Padrão: O campo de carga horária diária foi predefinido para 08:45, já que isso é bastante comum em várias empresas. No entanto, é possível alterar esse valor conforme necessário.

Tolerância: Incluímos uma tolerância de 10 minutos para contabilizar pequenas variações nos horários de entrada e saída. Caso a diferença de horas seja pequena (inferior ou igual a 10 minutos), ela é ajustada de acordo com a tolerância, para evitar pequenos desvios.

Adicional Noturno: O sistema considera como adicional noturno o período entre 22h00 e 5h00. Como a legislação trabalhista brasileira define que cada hora trabalhada nesse intervalo equivale a 52 minutos e 30 segundos, implementei uma lógica para lidar com essa particularidade.

Intervalos: Por enquanto, o sistema reconhece um único intervalo entre as marcações. Não há a necessidade de inserir manualmente os intervalos, pois o sistema irá calcular automaticamente a diferença entre as entradas e saídas, permitindo uma jornada contínua.

Interface Simples: A interface foi desenhada de maneira simples, onde o usuário apenas insere os horários de entrada e saída. Com poucos cliques, ele pode adicionar quantas marcações forem necessárias, e o botão "CALCULAR" já faz todo o processamento dos dados.

Como Usar o Sistema
Inserir a Carga Horária:

Por padrão, o sistema já vem com a carga horária de 08:45. Caso sua carga horária seja diferente, basta alterar o campo "Carga Horária".
Adicionar Marcações:

No campo de marcação, insira os horários de entrada e saída conforme o expediente. Cada vez que você clicar no botão de "+" (ao lado do campo de marcação), o sistema vai adicionar mais campos de horário.
Você precisa inserir no mínimo dois horários (uma entrada e uma saída) para que o cálculo funcione.
Calcular Horas:

Depois de inserir as marcações, basta clicar no botão "CALCULAR". O sistema automaticamente vai calcular:
As horas trabalhadas totais;
Se houve débito ou crédito de horas, comparado à carga horária diária;
As horas normais e o adicional noturno (quando aplicável);
O tempo de intervalo entre as marcações.
Resultados:

Abaixo dos campos de marcação, o sistema exibe uma tabela com todos os cálculos feitos:
Horas Trabalhadas: Total de horas trabalhadas no dia.
Débito: Caso tenha trabalhado menos do que a carga horária diária.
Crédito: Caso tenha trabalhado mais do que a carga horária.
Horas Trabalhadas Normais: Total de horas fora do período de adicional noturno.
Adicional Noturno: Horas trabalhadas no período de 22h00 às 5h00.
Intervalo: Tempo entre as marcações de entrada e saída que não foram contabilizadas como trabalho.
Considerações Finais
Esse sistema foi pensado para ser simples e direto, cobrindo as principais necessidades de controle de jornada e adicional noturno. Há espaço para melhorias, como permitir múltiplos intervalos e adicionar opções para mais tipos de cálculos personalizados. Mas, no momento, ele cumpre bem seu papel para quem precisa de um controle básico e funcional de horas trabalhadas.

Se houverem dúvidas ou sugestões, estarei à disposição para aprimorar o sistema!
