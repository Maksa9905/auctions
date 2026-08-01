declare module 'json-server' {
  type LowdbChain = {
    value: () => unknown;
  };

  type Lowdb = {
    get: (key: string) => LowdbChain;
    set: (key: string, value: unknown) => Lowdb;
    write: () => void;
  };

  type JsonServerRouter = {
    db: Lowdb;
  };

  type JsonServerApp = {
    use: (...handlers: unknown[]) => JsonServerApp;
    get: (path: string, handler: (...args: never[]) => void) => JsonServerApp;
    post: (path: string, handler: (...args: never[]) => void) => JsonServerApp;
    listen: (port: number, cb?: () => void) => unknown;
  };

  type JsonServer = {
    create: () => JsonServerApp;
    router: (source: string | Record<string, unknown>) => JsonServerRouter;
    defaults: (options?: Record<string, unknown>) => unknown[];
    bodyParser: unknown;
  };

  const jsonServer: JsonServer;
  export default jsonServer;
}
