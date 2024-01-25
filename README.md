# novadata-test

> [!IMPORTANT]
> Explicarei minha abordagem para resolver o problema mais tarde
> Os arquivos .env não deveriam estar no repositório, mas para simplificar, deixei-os aqui

:writing_hand:Para resolver o desafio decidi aplicar arquitetura limpa, arquitetura hexagonal, que na minha opinião é mais uma arquitetura de portas e adaptadores, e também apliquei fatiamento vertical.

Entender que no final das contas a arquitetura hexagonal tem muitas formas de ser aplicada e depende muito da visão do arquiteto. 

- [Como você executa o projeto](#como-você-executa-o-projeto)
- [Abordagem](#abordagem)
- [Considerações](#considerações)
- [Swagger](#swagger)

## Como você executa o projeto

1. Execute o contêiner postgres e redis primeiro, na raiz do projeto (docker-compose.yml)


```bash
docker-compose up -d
```
> [!WARNING]
> Execute apenas uma vez se as migrações do banco de dados não forem concluídas, 

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

## Abordagem

Criei uma arquitetura hexagonal, onde as coisas mais importantes para o foco do negócio estão na pasta “core”. Minha abordagem também foi usar Screaming Architecture para subdividir em casos de uso, aqui temos três (Usuários, Categorias, Postagem)

Tente deixar o código o mais agnóstico possível, já que você nunca chegará a 100%, na minha perspectiva. A ideia é que o código não dependa de frameworks, bancos de dados, etc.

Por exemplo, o código está usando express, mas poderia usar koa ou outro sem fazer modificações na lógica de negócios. 

Respeitando contratos de interface, injeção de dependência e inversão de dependência. Entre muitas outras coisas

```javascript
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-body';
import cors from '@koa/cors';
import multer from '@koa/multer';
import { IFrameWork } from '../interface.framework';

interface Options {
  port?: number;
  routes: Router;
}

export class KoaImplementation implements IFrameWork {
  public readonly app = new Koa();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3100, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Koa doesn't have built-in middleware for file uploads, so we use `@koa/multer`
    const upload = multer({ dest: './uploads' });

    // Koa doesn't have built-in JSON and urlencoded parsing middleware, so we use `koa-body`
    this.app.use(bodyParser({ multipart: true }));
    
    // Enable CORS
    this.app.use(cors());

    // Error Handling Middleware
    this.app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
      }
    });

    this.app.use(upload.single('file')); // Assuming 'file' is the field name for file uploads

    // Add your routes
    this.app.use(this.routes.routes());
    this.app.use(this.routes.allowedMethods());

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
```

## Considerações

- Criei diferentes módulos, como database, framework, etc. Minha justificativa é porque acho que módulos são algo que pode mudar e não é algo específico do negócio.

- É claro que outro mecanismo de pasta pode ser aplicado.e o nível de abstração poderia ser ainda maior com o uso de mais genéricos "<T>" , por exemplo

- Tenho utilizado inversão de dependência e injeção de dependência para manter uma abstração, um desacoplamento, ou seja, a parte mais acoplada seria a pasta "infraestrutura" e a menos, a pasta "domínio".

Eu adicionei uma implementação de IA, é uma simulação porque realmente não possui a chave OpenIA. No entanto, você pode ver o código em src/libs/openIA


## swagger

http://localhost:3000/api/v1/api-docs
