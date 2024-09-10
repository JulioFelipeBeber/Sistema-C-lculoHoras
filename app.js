document.addEventListener("DOMContentLoaded", () => {
    const dailyHoursInput = document.getElementById('dailyHours');
    const addTimeButton = document.getElementById('addTimeButton');
    const calculateButton = document.getElementById('calculateButton');
    const timeContainer = document.getElementById('timeContainer');

    const workedHoursCell = document.getElementById('workedHours');
    const debitCell = document.getElementById('debit');
    const creditCell = document.getElementById('credit');
    const normalHoursCell = document.getElementById('normalHours');
    const nightShiftCell = document.getElementById('nightShift');
    const breaksCell = document.getElementById('breaks');

    let timeRecords = [];
    const tolerance = 10; // Tolerância em minutos

    // Função para adicionar novo campo de marcação de tempo
    addTimeButton.addEventListener('click', () => {
        const newTimeInputDiv = document.createElement('div');
        newTimeInputDiv.classList.add('time-input');
        
        const newTimeInput = document.createElement('input');
        newTimeInput.type = 'time';
        newTimeInput.classList.add('timeInput');

        const removeButton = document.createElement('button');
        removeButton.textContent = "-";
        removeButton.classList.add('remove-button');

        newTimeInputDiv.appendChild(newTimeInput);
        newTimeInputDiv.appendChild(removeButton);
        timeContainer.appendChild(newTimeInputDiv);

        // Remover campo de marcação
        removeButton.addEventListener('click', () => {
            const index = timeRecords.indexOf(newTimeInput.value);
            if (index > -1) {
                timeRecords.splice(index, 1); // Remove valor do array
            }
            newTimeInputDiv.remove();
        });

        // Adicionar novo horário ao array quando valor for alterado
        newTimeInput.addEventListener('change', () => {
            const timeValue = newTimeInput.value;

            // Verificar se o horário já foi inserido
            if (timeValue && !timeRecords.includes(timeValue)) {
                timeRecords.push(timeValue);
            } else {
                alert("Esse horário já foi inserido ou é inválido!");
            }
        });
    });

    // Função para calcular os resultados
    calculateButton.addEventListener('click', () => {
        if (timeRecords.length < 2) {
            alert("Insira pelo menos duas marcações.");
            return;
        }

        let totalWorkedMinutes = calculateWorkedHours(timeRecords);
        let intervalMinutes = calculateBreak(timeRecords);
        let dailyHours = parseTime(dailyHoursInput.value);
        let credit = totalWorkedMinutes > dailyHours ? totalWorkedMinutes - dailyHours : 0;
        let debit = totalWorkedMinutes < dailyHours ? dailyHours - totalWorkedMinutes : 0;

        // Aplicar a tolerância
        debit = applyTolerance(debit);
        credit = applyTolerance(credit);

        let nightShiftMinutes = calculateNightShift(timeRecords);
        let normalMinutes = totalWorkedMinutes - nightShiftMinutes;

        // Ajuste para não exibir valor residual
        if (normalMinutes < 0 || nightShiftMinutes === totalWorkedMinutes) normalMinutes = 0;

        // Atualizar resultados na tabela
        workedHoursCell.innerText = formatTime(totalWorkedMinutes - intervalMinutes); // Subtrai o intervalo do total
        debitCell.innerText = formatTime(debit);
        creditCell.innerText = formatTime(credit);
        normalHoursCell.innerText = formatTime(normalMinutes);
        nightShiftCell.innerText = formatTime(nightShiftMinutes);
        breaksCell.innerText = formatTime(intervalMinutes);  // Exibe o intervalo
    });

    // Função para arredondar minutos com base na tolerância
    function applyTolerance(minutes) {
        if (minutes <= tolerance) {
            return tolerance; // Arredondar para o próximo múltiplo da tolerância
        }
        return Math.ceil(minutes / tolerance) * tolerance;
    }

    // Função para calcular as horas trabalhadas
    function calculateWorkedHours(records) {
        let total = 0;
        for (let i = 0; i < records.length - 1; i += 2) {
            let start = parseTime(records[i]);
            let end = parseTime(records[i + 1]);

            // Ajuste para marcações que atravessam a meia-noite
            if (end < start) {
                end += 24 * 60; // Adicionar 24 horas em minutos para o cálculo correto
            }
            total += end - start;
        }
        return total;
    }

    // Função para calcular o intervalo (considera apenas um intervalo)
    function calculateBreak(records) {
        if (records.length >= 4) {  // Se houver pelo menos 2 pares de marcações (entrada/saída)
            let firstEnd = parseTime(records[1]);  // Primeira saída
            let secondStart = parseTime(records[2]);  // Segunda entrada

            if (secondStart > firstEnd) {
                return secondStart - firstEnd;  // Calcula o intervalo entre as duas marcações
            }
        }
        return 0;
    }

    // Função para calcular o adicional noturno (22h às 5h)
    function calculateNightShift(records) {
        let nightShiftMinutes = 0;
        for (let i = 0; i < records.length - 1; i += 2) {
            let start = parseTime(records[i]);
            let end = parseTime(records[i + 1]);

            // Ajuste para marcações que atravessam a meia-noite
            if (end < start) {
                end += 24 * 60; // Adicionar 24 horas em minutos para o cálculo correto
            }

            nightShiftMinutes += calculateNightPeriod(start, end);
        }
        return nightShiftMinutes;
    }

    // Função para calcular o período noturno (22h às 5h)
    function calculateNightPeriod(start, end) {
        const nightStart = parseTime("22:00");
        const nightEnd = parseTime("05:00") + 24 * 60; // Adicionar 24h para ajustar o período noturno

        let totalNightMinutes = 0;

        // Ajuste para travessia da meia-noite
        if (end < start) {
            end += 24 * 60;
        }

        // Verificar se o período de trabalho está dentro do horário noturno
        if (start < nightEnd && end > nightStart) {
            if (start < nightStart) {
                start = nightStart; // Ajustar início para 22:00
            }
            if (end > nightEnd) {
                end = nightEnd; // Ajustar fim para 05:00
            }
            totalNightMinutes = end - start;
        }

        return totalNightMinutes;
    }

    // Função para converter tempo HH:MM para minutos
    function parseTime(timeString) {
        let [hours, minutes] = timeString.split(":").map(Number);
        return hours * 60 + minutes;
    }

    // Função para formatar minutos em HH:MM
    function formatTime(minutes) {
        let hours = Math.floor(minutes / 60);
        let mins = minutes % 60;
        return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    }
});
