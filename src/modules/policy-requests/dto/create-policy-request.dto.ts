import { IsString, IsEmail, IsNumber, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePolicyRequestDto {
    @ApiProperty({ example: 'POL-2003-022' })
    @IsString()
     @IsNotEmpty()
    folio!: string;

    @ApiProperty({ example: 'Derek Cabrera' })
    @IsString()
    @IsNotEmpty()
    customerName!: string;

    @ApiProperty({ example: 'derek@example.com' })
    @IsEmail()
    customerEmail!: string;

    @ApiProperty({ example: 'Seguro de Vida Premium' })
    @IsString()
    @IsNotEmpty()
    product!: string;

    @ApiProperty({ example: 150000 })
    @IsNumber()
    @Min(0.01, { message: 'El insuredAmount debe ser mayor a 0' })
    insuredAmount!: number;
}