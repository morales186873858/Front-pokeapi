import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PokemonListComponent } from './app.component';

describe('PokemonListComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [PokemonListComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PokemonListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'FrontApi'`, () => {
    const fixture = TestBed.createComponent(PokemonListComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('FrontApi');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(PokemonListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('FrontApi app is running!');
  });
});
