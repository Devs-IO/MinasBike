import React from 'react';
import { Formik, Form } from 'formik';
import Header from 'components/Header';
import Button from 'components/Button';
import FormikInput from 'components/FormikInput';

export default function CadastroCliente({ history }) {
  return (
    <div className="tela tela-cadastro">
      <Header>Cadastrar Cliente</Header>

      <Formik
        initialValues={{ name: '', phone: '', email: '', address: '', birthday: '' }}
        onSubmit={console.log}
      >
        <Form>
          <FormikInput required type="text" name="name" label="Nome" />
          <FormikInput required type="tel" name="phone" label="Telefone" />
          <FormikInput required type="email" name="email" label="E-mail" />
          <FormikInput required name="address" label="Endereço" />
          <FormikInput required type="date" name="birthday" label="Data de Nascimento" />

          <div className="buttons">
            <Button type="reset" color="#DC2438" onClick={() => history.replace('/clientes')}>
              Cancelar
            </Button>
            <Button type="submit" color="#30CC57">
              Cadastrar
            </Button>
          </div>
        </Form>
      </Formik>

      {/* {displayModal && (
        <Modal
          type="confirmation"
          onClose={() => setDisplayModal(false)}
          onConfirm={handleSubmit}
        />
      )} */}
    </div>
  );
}
