class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._mensagemView = new MensagemView($('#mensagemView'));

        this._mensagem = new Mensagem();

        let self = this;
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
            get(target, prop, receiver) {
                if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {
                    return function() {
                        console.log(`Método ${prop} interceptado!`);
                        Reflect.apply(target[prop], target, arguments);
                        self._negociacoesView.update(target);
                    }
                }

                return Reflect.get(target, prop, receiver);
            }
        });
    }

    adiciona(event) {
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação salva com sucesso!';

        this._mensagemView.update(this._mensagem);
    }

    apaga() {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociações excluídas com sucesso!';
        this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }
}