import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjasService: NinjasService) {}

    // GET /ninjas => return []
     @Get()
     getNinjas(@Query('weapon') weapon: 'stars'| 'nunchunks') {
        return this.ninjasService.getWeapon(weapon);
    }

    // GET /ninjas/:id => return {}
    @Get(':id')
    getSingleNinja(@Param('id', ParseIntPipe) id: number) {
       try {
        return this.ninjasService.getNinja(id)
       } catch (error) {
        throw new NotFoundException()
       }
    }

    // POST /ninjas/ => return {}
    @Post()
    addNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
        return this.ninjasService.addNinja(createNinjaDto);
    }

    // PUT /ninjas/:id => return {}
    @Put(':id')
    updateNinja(@Param('id') id: number, @Body() updateNinjaDto: UpdateNinjaDto) {
        return this.ninjasService.updateNinja(+id, updateNinjaDto)
    }

    // DELETE /ninjas/:id => return {}
    @Delete(':id')
    removeNinja(@Param('id') id: number) {
        return this.ninjasService.removeNinja(+id)
    }
}
