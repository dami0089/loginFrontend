export const formatearFecha = (fecha) => {
  if (!fecha) {
    return ""; // o cualquier valor por defecto que quieras retornar
  }
  const [year, month, day] = fecha.split("T")[0].split("-");
  const nuevaFecha = new Date(year, month - 1, day); // El mes es base 0 en JavaScript
  return nuevaFecha.toISOString().split("T")[0];
};
