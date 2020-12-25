import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Country } from 'src/app/enums/country';
import { Team } from 'src/app/interfaces/team';
import { TeamService, TeamsTableHeaders } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss'],
})
export class TeamTableComponent implements OnInit {
  teams$: Observable<Team[]>;
  tableHeaders = TeamsTableHeaders;

  constructor(private teamService: TeamService) {
    this.teams$ = teamService.getTeams();
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        if (teams.length === 0) {
          const team: Team = {
            name: 'My Amazing team',
            country: Country.Spain,
            players: [],
          };
          this.teamService.addTeam(team);
        }
      });
  }

  ngOnInit(): void {}
}
