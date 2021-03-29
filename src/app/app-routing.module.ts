import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'listdemande', loadChildren: './pages/listdemande/listdemande.module#ListdemandePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'app', loadChildren: '../app/app.module#AppModule' },
  { path: 'detail/:id', loadChildren: './pages/detail/detail.module#DetailPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'detail-demande-sortie/:id', loadChildren: './pages/detail-demande-sortie/detail-demande-sortie.module#DetailDemandeSortiePageModule' },
  { path: 'detailconge-confirmation/:id', loadChildren: './pages/detailconge-confirmation/detailconge-confirmation.module#DetailcongeConfirmationPageModule' },
  { path: 'detailsortie-confirmation/:id', loadChildren: './pages/detailsortie-confirmation/detailsortie-confirmation.module#DetailsortieConfirmationPageModule' },
  { path: 'congeavalider', loadChildren: './demande/congeavalider/congeavalider.module#CongeavaliderPageModule' },
  { path: 'historiqueconge', loadChildren: './demande/historiqueconge/historiqueconge.module#HistoriquecongePageModule' },
  { path: 'index', loadChildren: './pages/index/index.module#IndexPageModule' },
  { path: 'event', loadChildren: './demande/event/event.module#EventPageModule' },
  { path: 'task/:state', loadChildren: './pages/task/task.module#TaskPageModule' },
  { path: 'detail-task/:id', loadChildren: './pages/detail-task/detail-task.module#DetailTaskPageModule' },
  { path: 'tracabilite/:id', loadChildren: './pages/tracabilite/tracabilite.module#TracabilitePageModule' },
  //{ path: 'users/:id', loadChildren: './pages/users/users.module#UsersPageModule' },
  { path: 'add-task', loadChildren: './pages/add-task/add-task.module#AddTaskPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'add-news', loadChildren: './pages/add-news/add-news.module#AddNewsPageModule' },
  { path: 'list-projet', loadChildren: './pages/list-projet/list-projet.module#ListProjetPageModule' },
  { path: 'discussion-projet/:id/:type', loadChildren: './pages/discussion-projet/discussion-projet.module#DiscussionProjetPageModule' },
  { path: 'modifier-event/:idevent', loadChildren: './pages/modifier-event/modifier-event.module#ModifierEventPageModule' },
  { path: 'mes-equipement/:type', loadChildren: './pages/mes-equipement/mes-equipement.module#MesEquipementPageModule' },
  { path: 'add-equipement', loadChildren: './pages/add-equipement/add-equipement.module#AddEquipementPageModule' },
  { path: 'detail-equipement/:id/:quantite', loadChildren: './pages/detail-equipement/detail-equipement.module#DetailEquipementPageModule' },
  { path: 'editer-equipement/:id', loadChildren: './pages/editer-equipement/editer-equipement.module#EditerEquipementPageModule' },
  { path: 'add-docs', loadChildren: './pages/add-docs/add-docs.module#AddDocsPageModule' },
  { path: 'liste-documents', loadChildren: './pages/liste-documents/liste-documents.module#ListeDocumentsPageModule' },
  { path: 'detail-docs/:id', loadChildren: './pages/detail-docs/detail-docs.module#DetailDocsPageModule' },
  { path: 'list-reunion', loadChildren: './pages/list-reunion/list-reunion.module#ListReunionPageModule' },
  { path: 'presence-stagiaire', loadChildren: './pages/presence-stagiaire/presence-stagiaire.module#PresenceStagiairePageModule' },
  { path: 'staff-presence', loadChildren: './pages/staff-presence/staff-presence.module#StaffPresencePageModule' },
  { path: 'actions-grou-pe', loadChildren: './pages/actions-grou-pe/actions-grou-pe.module#ActionsGrouPePageModule' },
  { path: 'histroique-action', loadChildren: './pages/histroique-action/histroique-action.module#HistroiqueActionPageModule' },
  { path: 'sfm-cameroun-presence', loadChildren: './pages/sfm-cameroun-presence/sfm-cameroun-presence.module#SfmCamerounPresencePageModule' },
  { path: 'detail-teletravail/:id', loadChildren: './pages/detail-teletravail/detail-teletravail.module#DetailTeletravailPageModule' },
  { path: 'equipement-by-group', loadChildren: './equipement-by-group/equipement-by-group.module#EquipementByGroupPageModule' },
  { path: 'programme-journee', loadChildren: './pages/programme-journee/programme-journee.module#ProgrammeJourneePageModule' },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
