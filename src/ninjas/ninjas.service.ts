import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {

    private ninjas = [
        { id: 0, name: 'ninjaA', weapon: 'stars'},
        { id: 1, name: 'ninjaB', weapon: 'nunchunks'},
    ]

    getWeapon(weapon?: 'stars' | 'nunchunks') {
        console.log(weapon);

        if (weapon) {
           return this.ninjas.filter(ninja => ninja.weapon === weapon);
        } 

        return this.ninjas;

    }

    getNinja(id: number) {
        const ninja = this.ninjas.find(ninja => ninja.id === id);

        if (!ninja) {
            throw new Error('Ninja not found');
        }

        return ninja;
    }


    addNinja(CreateNinjaDto: CreateNinjaDto) {
        const newNinja = {
            ...CreateNinjaDto,
            id: new Date().getTime(),
        }

        this.ninjas.push(newNinja);

        return newNinja;
    }

    updateNinja(id: number, updateNinja: UpdateNinjaDto) {

        this.ninjas = this.ninjas.map(ninja => {
            if (ninja.id === id) {
                return { ...ninja, ...updateNinja };
            }

            return ninja;
        })

        return this.getNinja(id);
    }

    removeNinja(id: number) {
        let ninjaToBeRemoved = this.getNinja(id);

        let removeNinja = this.ninjas.splice(this.ninjas.indexOf(ninjaToBeRemoved), 1);

        return this.ninjas;

    }


}
