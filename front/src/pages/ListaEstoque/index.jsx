import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import useAuth from '../../utils/useAuth';
import Header from '../../components/Header';
import Button from '../../components/Button';
import './styles.css';

export default function ListaProdutos({ history }) {
    const [products, setProducts] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    // TODO: CRIAR UM COMPONENTE DE VERDADE E COMPONENTIZAR A TABELA

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        await api
            .get('/brandproducts', useAuth)
            .then(response => setProducts(response.data));
        await api
            .get('/stocks', useAuth)
            .then(response => setStocks(response.data));
        setIsLoaded(true);
    }

    function getProperty(objects, id, property) {
        const matches = objects.filter(obj => obj.id === id)[0];
        if (matches.length === 0) return undefined;
        return matches[property];
    }

    return (
        <div className="tela lista-produtos">
            <Header>Estoque</Header>
            <div className="table-wrapper">
                <div className="buttons">
                    <Button color="#DC2438" onClick={() => {}}>
                        Gerar Relatório
                    </Button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Produto</th>
                            <th>Qtd. Atual</th>
                            <th>Qtd. Inicial</th>
                            <th>Preço</th>
                        </tr>
                    </thead>

                    {isLoaded && (
                        <tbody>
                            {stocks.map((row, index) => (
                                <tr key={index}>
                                    <td>
                                        {
                                            <Link
                                                to={`/produtos/${row.brandproduct.code}`}
                                            >
                                                {row.brandproduct.code}
                                            </Link>
                                        }
                                    </td>
                                    <td>
                                        {/* {getProperty(
                                            products,
                                            row.id_product,
                                            'name'
                                        )} */}
                                        [WIP] {row.brandproduct_id}
                                    </td>
                                    <td>{row.current_qty}</td>
                                    <td>{row.initial_qty}</td>
                                    <td>R$ {row.brandproduct.price / 100}</td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
