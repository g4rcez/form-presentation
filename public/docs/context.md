# Contexto

- Validações de formulário
- Não controlado x Controle de estado
- FormData ou JSON?

## Prova de conceito

- Forms com validação automática
- onSubmit com JSON ao invés de um FormData

`{ user: { name: string; lastName: string; } }`

Com o código abaixo, será possível realizar isso

```html
<form>
    <input required minlength="2" pattern="^[A-Z].*" placeholder="Seu nome" name="user.name" />
    <input required minlength="2" pattern="^[A-Z].*" placeholder="Seu sobrenome" name="user.lastName" />
</form>
```