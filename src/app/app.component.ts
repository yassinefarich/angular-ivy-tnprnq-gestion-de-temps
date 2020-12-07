import { Component, VERSION } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  // Paramétres
  nombreDeCrowders: number = 120;
  nombreDePivots: number = 30;
  nombreDePropositionsParPivots: number = 20;
  nombreDeNotationParProposition: number = 30;
  resultat: string = "";

  // Gestion du temps
  tempsDePropositonDeQuest: number = 0.06;
  tempsDePropositonDeRep: number = 0.06;
  tempsDeNotationDeQue: number = 0.02;
  tempsDeNotationDeRep: number = 0.02;

  nbrDeSessionsParSemaine: number = 10;
  dureeDeSession: number = 2.5;

  trace(data: string): void {
    this.resultat += data;
  }

  calculerTemps(): void {
    this.resultat = "";
    this.trace("\n## Gestion de temps ##\n");
    this.trace(`Nombre de crowders : ${this.nombreDeCrowders}\n`);
    this.trace(`Nombre de pivots : ${this.nombreDePivots}\n`);
    this.trace(
      `Nombre de propositions par pivot : ${
        this.nombreDePropositionsParPivots
      }\n`
    );
    this.trace(
      `Nombre de notations par proposition : ${
        this.nombreDeNotationParProposition
      }\n`
    );
    this.trace(` --------------------------------------------------------- \n`);

    let nombreDePropositionsDeQuestionTotal = this.nombreDePivots * this.nombreDePropositionsParPivots;
    this.trace(`Nombre de propositions totale ${nombreDePropositionsDeQuestionTotal}\n`);

    let nombreDePropositionsDeReponsesTotal = this.nombreDePivots * this.nombreDePropositionsParPivots;

    let tempsTotalPourPropositionsDeQuest = nombreDePropositionsDeQuestionTotal * this.tempsDePropositonDeQuest;
    this.trace(`Temps nécessaire pour faire des propositions des questions: ${tempsTotalPourPropositionsDeQuest}heurs\n`);

    let tempsTotalPourPropositionsDeRep = nombreDePropositionsDeReponsesTotal * this.tempsDePropositonDeRep;
    this.trace(
      `Temps nécessaire pour faire des propositions des réponses : ${tempsTotalPourPropositionsDeRep} heurs\n`
    );

    let nombreDeNotationDeQuestionsTotal = (nombreDePropositionsDeQuestionTotal + this.nombreDePivots) * this.nombreDeNotationParProposition;

    this.trace(`(${nombreDePropositionsDeQuestionTotal} + ${this.nombreDePivots}) * ${this.nombreDeNotationParProposition} nombreDeNotationDeQuestionsTotal ${nombreDeNotationDeQuestionsTotal}\n`);

    let nombreDeNotationDeReponsesTotal =
      (nombreDePropositionsDeReponsesTotal + this.nombreDePivots) *
      this.nombreDeNotationParProposition;

    let tempsTotalPourNotationDeQuest = nombreDeNotationDeQuestionsTotal * this.tempsDeNotationDeQue;
    this.trace(
      `Temps nécessaire pour faire des notations des questions: ${tempsTotalPourNotationDeQuest} heurs\n`
    );

    let tempsTotalPourNotationDeRep =
      nombreDeNotationDeReponsesTotal * this.tempsDeNotationDeRep;
    this.trace(
      `Temps nécessaire pour faire des notations des réponses : ${tempsTotalPourNotationDeRep} heurs\n`
    );

    let tempsTotal: number =
      tempsTotalPourPropositionsDeQuest +
      tempsTotalPourPropositionsDeRep +
      tempsTotalPourNotationDeQuest +
      tempsTotalPourNotationDeRep;
    this.trace(`Temps total d'heurs de crowding : ${tempsTotal} h\n`);

    let nombreDheursDeCrowdingParSession =
      this.dureeDeSession * this.nombreDeCrowders;
    let nombreDeSessionsNecessaire = Math.ceil(tempsTotal / nombreDheursDeCrowdingParSession);
    this.trace(`Nombre de sessions nécessaires : ${nombreDeSessionsNecessaire} sessions de ${this.dureeDeSession} heurs\n`);

    let nombreDeSemainesNecessaires = nombreDeSessionsNecessaire / this.nbrDeSessionsParSemaine;
    this.trace(
      `Nombre de semaines nécessaires : ${nombreDeSemainesNecessaires}\n`
    );
  }
}
