import { IsEnum, MinLength } from "class-validator";
export class CreateNinjaDto {
    @MinLength(3)
    name: string;

    @IsEnum(['stars', 'nunchunks'], {message: "Enter correct weapon name"})
    weapon: 'stars' | 'nunchunks'
}
