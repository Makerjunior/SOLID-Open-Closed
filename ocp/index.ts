// Importante para o TypeScript reconhecer os tipos e funcionalidades de forma correta
enum Eproduto {
    Limpeza,
    Alimento,
    Eletronico
}

// Interface para o repositório de estoque, permite diferentes implementações de repositório de estoque
interface IRepositorioEstoque {
    getQuantidade(nomeProduto: string): number | undefined;
}

// Implementação concreta do repositório de estoque
class RepositorioEstoque implements IRepositorioEstoque {
    private estoque: [string, number][];

    constructor(estoque: [string, number][]) {
        this.estoque = estoque;
    }
    // encontra o elemento no estoque
    getQuantidade(nomeProduto: string): number | undefined {
        const produto = this.estoque.find(([elementoEstoque]) => elementoEstoque === nomeProduto);
        return produto ? produto[1] : undefined;
    }
}

// Classe abstrata Produto, define a estrutura básica para todos os produtos
abstract class Produto {
    protected nome: string;
    protected preco: number;
    protected quantidade: number;

    constructor(nome: string, preco: number, quantidade: number) {
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
    }

    // Método abstrato para o tipo de produto, subclasses devem implementar
    abstract tipo(): Eproduto;

    // Método abstrato para calcular o valor do produto, subclasses devem implementar
    abstract valor(): number;

    // Método comum para obter o nome do produto
    getNome(): string {
        return this.nome;
    }

    // Método comum para obter a quantidade do produto
    getQuantidade(): number {
        return this.quantidade;
    }
}

// Subclasse ProdutoAlimento, especializa Produto para produtos alimentícios
class ProdutoAlimento extends Produto {
    tipo(): Eproduto {
        return Eproduto.Alimento;
    }

    valor(): number {
        return this.preco * this.quantidade;
    }
}

// Subclasse ProdutoLimpeza, especializa Produto para produtos de limpeza
class ProdutoLimpeza extends Produto {
    tipo(): Eproduto {
        return Eproduto.Limpeza;
    }

    valor(): number {
        return this.preco * this.quantidade;
    }
}

// Subclasse ProdutoLimpeza, especializa Produto para produtos de limpeza
class ProdutoEletronico extends Produto {
    tipo(): Eproduto {
        return Eproduto.Eletronico;
    }

    valor(): number {
        return this.preco * this.quantidade;
    }
    desconto(des:number){
        console.log(`Desconto de ${des} % em  ${this.getNome()}`)
        this.preco = this.preco - (this.preco*des/100)
    }
}

// Classe Caixa2, não precisa ser modificada para adicionar novos tipos de produtos
class Caixa2 {
    private total: number;
    private repositorioEstoque: IRepositorioEstoque;

    constructor(repositorioEstoque: IRepositorioEstoque) {
        this.repositorioEstoque = repositorioEstoque;
        this.total = 0;
        console.log("Caixa aberto");
    }

    // Método finalizarVenda, responsável por processar as vendas
    finalizarVenda(produtos: Produto[]): void {
        for (let produto of produtos) {
            const quantidadeDisponivel = this.repositorioEstoque.getQuantidade(produto.getNome());
            // Verifica se há quantidade disponível no estoque para o produto
            if (quantidadeDisponivel !== undefined && produto.getQuantidade() <= quantidadeDisponivel) {
                console.log(`${produto.getNome()} R$ ${produto.valor().toFixed(2)}`);
                this.total += produto.valor();
            } else {
                console.log(`${produto.getNome()} indisponível no estoque`);
            }
        }
        console.log(`Total da Venda R$: ${this.total.toFixed(2)}`);
    }
}

// Dados de estoque inicial
const estoque: [string, number][] = [
    ["Alimento", 10],
    ["Limpeza", 33],
    ["Informatica",40]
];

// Criação do repositório de estoque
const repositorioEstoque = new RepositorioEstoque(estoque);

// Criação do caixa com o repositório de estoque
const Cx = new Caixa2(repositorioEstoque);

// Criação de produtos
const p1 = new ProdutoAlimento("Alimento", 59.90, 7);
const p2 = new ProdutoLimpeza("Limpeza", 49.90, 5);
const p3 = new ProdutoEletronico("Informatica", 349.90, 5);
p3.desconto(30);


// Processamento da venda
Cx.finalizarVenda([p1, p2, p3]);
