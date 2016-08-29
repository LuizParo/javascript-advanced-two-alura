class DateHelper {

    constructor() {
        throw new Error('Não é possível instanciar DateHelper');
    }

    static textoParaData(texto) {
        if(!/\d{4}-\d{2}-\d{2}/.test(texto)) {
            throw new Error('Formato de data deve ser yyyy-MM-dd');
        }

        return new Date(...texto
            .split('-')
            .map((item, indice) => item - indice % 2)
        );
    }

    static dataParaTexto(data) {
        return `${data.getDay()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }
}