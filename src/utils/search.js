export function filtrarSessoes(e, sessoes, setSessoes, sessoesTotais) {
    const { value } = e.target;

    /*  e.target.addEventListener('keydown', (tecla) => {
         if (tecla.key === 'Backspace') {
             setSessoes(sessoesTodas);
         }
     }) */

    const dataFilter = sessoesTotais.filter((item) => {
        return item.paciente.toUpperCase().includes(value.toUpperCase().trim());
    })
    if (dataFilter.length) {
        setSessoes(dataFilter);
    } else {
    }

}