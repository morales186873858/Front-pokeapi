import { Component, OnInit } from '@angular/core';
import { PokemonService } from './service/app.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class PokemonListComponent implements OnInit {
  title = 'FrontApi';
  pokemons: any[] = [];

  totalPokemons: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  limit: number = 5; // Cambia este valor si deseas un límite diferente
  nameFilter: string = '';
  typeFilter: string = '';
  capturado: string = '';


  constructor(private pokemonService: PokemonService) { }


  ngOnInit(): void {
    this.loadPokemons();
    this.pokemonCapturado();
  }
  loadPokemons(): void {
    if (!this.nameFilter && !this.typeFilter) {
      // Cargar todos los Pokémon con paginación
      this.pokemonService.getLista(this.limit, this.currentPage).subscribe(data => {
        this.listaPokemons = data.slice((this.currentPage - 1) * this.limit, this.currentPage * this.limit);
        this.pokemons = this.listaPokemons; // Muestra todos los Pokémon
        this.totalPokemons = data.length; // Total Pokémon sin filtrar
        this.totalPages = Math.ceil(this.totalPokemons / this.limit); // Total de páginas
        console.log(this.listaPokemons);
      });
    } else {
      // Cargar Pokémon filtrados con paginación
      this.pokemonService.getPokemons(this.limit, this.currentPage, this.nameFilter, this.typeFilter, this.capturado).subscribe(data => {
        this.pokemonCapturado(); // Esta función debería actualizar el estado de los Pokémon capturados
        
        // Verifica si hay Pokémon capturados y reemplaza el primero si es necesario
        if (data.pokemons && data.pokemons.length > 0) {
          this.pokemons = data.pokemons; // Asigna los Pokémon filtrados
          const capturados = this.pokemons.filter(pokemon => pokemon.captured); // Filtra los Pokémon capturados
  
          if (capturados.length > 0) {
            this.pokemons[0] = capturados[0]; // Reemplaza el primer Pokémon con el primero capturado
          }
        } else {
          this.pokemons = []; // Si no hay resultados, asigna un array vacío
        }
  
        console.log(this.pokemons);
        this.totalPokemons = data.totalPokemons;
        this.totalPages = data.totalPages;
      });
    }
  }

  onLimitChange(): void {
    this.currentPage = 1; 
    this.loadPokemons();   
  }

  onFilterChange(): void {
    this.currentPage = 1; 
    this.loadPokemons();

  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadPokemons();
    }
  }

  capturedPokemons: any[] = [];

  pokemonCapturado() {
    this.pokemonService.getPokemonCapturados().subscribe(
      (response) => {
        this.capturedPokemons = response.PokemonCapturado; // Asigna los Pokémon capturados a la propiedad
        console.log(this.capturedPokemons); // Para verificar que los Pokémon se han capturado
      },
      (error) => {
        console.error('Error al obtener los Pokémon capturados:', error);
      }
    );
  }

  capturarPokemon(id: number) {
    this.pokemonService.getCapturados(id).subscribe(data => {
      this.capturedPokemons.push(data.pokemon); 
      console.log(this.capturedPokemons); 
      this.pokemonCapturado()
      this.loadPokemons();
    });


  }
  listaPokemons: any[] = [];

  deletePokemon(id: number) {
    this.pokemonService.deletePokemon(id).subscribe(response => {
      console.log(response.message); 
      this.pokemonCapturado()
      this.loadPokemons();
    }, error => {
      console.error('Error al liberar el Pokémon:', error);
    });
  }
}
