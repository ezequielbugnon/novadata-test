# novadata-test

> [!IMPORTANT]
> Explicarei minha abordagem para resolver o problema mais tarde

:writing_hand:Para resolver o desafio decidi aplicar arquitetura limpa, arquitetura hexagonal, que na minha opinião é mais uma arquitetura de portas e adaptadores, e também apliquei fatiamento vertical.

Entender que no final das contas a arquitetura hexagonal tem muitas formas de ser aplicada e depende muito da visão do arquiteto. 

- [Como você executa o projeto](#como-você-executa-o-projeto)
- [Abordagem](#abordagem)
- [Considerações](#considerações)
- [Caracteristicas](#caracteristicas)

## Como você executa o projeto

1. Execute o contêiner postgres e redis primeiro, na raiz do projeto (docker-compose.yml)


```bash
docker-compose up -d
```

2. Quando o contêiner postgres estiver instalado e funcionando corretamente, execute as migrações do prisma, também na raiz do projeto.

```bash
npx prisma migrate dev 
```

3. Por fim, execute o aplicativo dockerfile em Node js, na mesma network que os aplicativos docker compose.

```bash
docker build -t node-app .
```
```bash
docker run -p 3000:3000 --name node-app-novadata --network novadata-test_default -d node-app
```