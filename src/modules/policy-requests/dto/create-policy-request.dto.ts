import { IsString, IsEmail, IsNumber, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePolicyRequestDto {
    @ApiProperty({ example: 'POL-2026-001' })
    @IsString()
     @IsNotEmpty()
    folio!: string;

    @ApiProperty({ example: 'Derek Cabrera' })
    @IsString()
    @IsNotEmpty()
    customerName!: string;

    @IsEmail()
    customerEmail!: string;

    @IsString()
    @IsNotEmpty()
    product!: string;

    @IsNumber()
    @Min(0.01, { message: 'El insuredAmount debe ser mayor a 0' })
    insuredAmount!: number;
}