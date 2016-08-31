class NegociacaoService {

    obterNegociacoesDaSemana(callback) {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/semana');

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    let negociacoes = JSON.parse(xhr.responseText)
                        .map((data) => new Negociacao(new Date(data.data), data.quantidade, data.valor));

                    callback(null, negociacoes);
                } else {
                    callback('Erro ao buscar negociações: ' + xhr.responseText, null);
                }
            }
        };

        xhr.send();
    }
}