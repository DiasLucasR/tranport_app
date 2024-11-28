export const format = {
    formatDateBR: function (
    date: string | Date,
    format: string = "dd/mm/yyyy"
  ): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear());

    return format.replace("dd", day).replace("mm", month).replace("yyyy", year);
  },

  formatDateTimeBR: function (
    date: string | Date,
    format: string = "dd/mm/yyyy HH:MM:ss"
  ): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear());
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");

    return format
      .replace("dd", day)
      .replace("mm", month)
      .replace("yyyy", year)
      .replace("HH", hours)
      .replace("MM", minutes)
      .replace("ss", seconds);
  },

  formatCurrency: function (value: string | number): string {
    const number = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(number)) return "Valor inválido";
    return `R$ ${number.toFixed(2).replace(".", ",")}`;
  },

  parseFloatValue: function (value: string): number {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  },

  parseIntValue: function (value: string): number {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 0 : parsed;
  },
};
