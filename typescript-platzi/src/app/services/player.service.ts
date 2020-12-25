import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playersDB: AngularFireList<Player>;

  constructor(private db: AngularFireDatabase) {
    this.playersDB = this.db.list('/players', (ref) =>
      ref.orderByChild('name')
    );
  }

  getPlayers(): Observable<Player[]> {
    return this.playersDB.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((change) => ({
          $key: change.key!,
          ...change.payload.val()!,
        }));
      })
    );
  }

  addPlayer(player: Player) {
    return this.playersDB.push(player);
  }

  deletePlayer(id: string) {
    this.db.list('/players').remove(id);
  }

  editPlayer(newPlayerData: Player) {
    const $key = newPlayerData.$key;
    if ($key) {
      delete newPlayerData.$key;
      this.db.list('/players').update($key, newPlayerData);
    }
  }
}
