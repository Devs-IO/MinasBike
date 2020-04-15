import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Menu from './components/Menu';
import LandingPage from 'pages/LandingPage';
import ListaProdutos from './pages/Lista/Produtos';
import ListaEstoque from './pages/Lista/Estoque';
import ListaFornecedores from 'pages/Lista/Fornecedores';
import ListaClientes from 'pages/Lista/Clientes';
import CadastroProduto from './pages/Cadastro/Produto';
import CadastroFornecedor from 'pages/Cadastro/Fornecedor';
import CadastroCliente from 'pages/Cadastro/Cliente';
import DetalhesProduto from './pages/DetalhesProduto';
import AuthCheck from './AuthCheck';

export default function Routes() {
  return (
    <BrowserRouter>
      <Menu />
      <AuthCheck />
      <Switch>
        <Route path="/" exact component={LandingPage} />

        <Route path="/produtos" exact component={ListaProdutos} />
        <Route path="/produtos/novo" component={CadastroProduto} />
        <Route path="/produtos/:code" component={DetalhesProduto} />

        <Route path="/fornecedores" exact component={ListaFornecedores} />
        <Route path="/fornecedores/novo" component={CadastroFornecedor} />

        <Route path="/clientes" exact component={ListaClientes} />
        <Route path="/clientes/novo" component={CadastroCliente} />

        <Route path="/estoque" exact component={ListaEstoque} />
        <Route path="/cadastrar" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
}
