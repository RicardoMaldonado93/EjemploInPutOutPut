import { CursoModuleModule } from './curso-module.module';

describe('CursoModuleModule', () => {
  let cursoModuleModule: CursoModuleModule;

  beforeEach(() => {
    cursoModuleModule = new CursoModuleModule();
  });

  it('should create an instance', () => {
    expect(cursoModuleModule).toBeTruthy();
  });
});
