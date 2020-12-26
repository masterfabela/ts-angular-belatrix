import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Player } from 'src/app/interfaces/player';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss'],
})
export class PlayerTableComponent implements OnInit {
  players$: Observable<Player[]>;
  showModal = false;
  selectedPlayer = null;

  constructor(
    private playerService: PlayerService,
    private teamService: TeamService
  ) {
    this.players$ = this.playerService.getPlayers();
  }

  newPlayer() {
    this.showModal = true;
    this.selectedPlayer = null;
    setTimeout(() => {
      window.location.replace('#open');
    }, 0);
  }

  editPlayer(player: Player) {
    this.selectedPlayer = { ...player };
    this.showModal = true;
    setTimeout(() => {
      window.location.replace('#open');
    });
  }

  deletePlayer(player: Player) {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        console.log(teams[0]);
        const moddifiedPlayers = teams[0].players
          ? teams[0].players.filter((p: any) => p.key !== player.$key)
          : teams[0].players;
        if (moddifiedPlayers) {
          const formattedTeam = {
            ...teams[0],
            players: [...moddifiedPlayers],
          };
          this.playerService.deletePlayer(player.$key);
          this.teamService.editTeam(formattedTeam);
        }
      });
  }

  closeDialog() {
    this.showModal = false;
  }

  ngOnInit(): void {}
}
