import { Component } from "@angular/core";
// Importações padrões do Ionic
import { BuscaService } from "../../services/busca.service";
// Importação do BuscaService para listar todos os anuncios
@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  id?: number;
  descricao: string;
  especialidade: string;
  tel: number;
  imagem: string;
  titulo: string;
  anuncios: any;
  textoBuscar = "";

  constructor(private BusSer: BuscaService) {}

  ngOnInit() {
    this.BusSer.listar().subscribe(data => {
      this.anuncios = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          descricao: e.payload.doc.data()["descricao"],
          especialidade: e.payload.doc.data()["especialidade"],
          tel: e.payload.doc.data()["tel"],
          titulo: e.payload.doc.data()["titulo"],
          imagem: e.payload.doc.data()["imagem"]
        };
      });
      console.log(this.anuncios);
    });
  }
  // Metodo que vai mandar o texto escrito como varivel para o filtro.pipe
  buscarAnuncio(event) {
    const texto = event.target.value;
    this.textoBuscar = texto;
  }
}
