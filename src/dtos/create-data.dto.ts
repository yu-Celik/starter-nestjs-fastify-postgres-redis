import { IsString } from "class-validator";

export class CreateDataDto {
    @IsString()
    name: string;
}
