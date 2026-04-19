import { IsString, IsEmail, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class CreatePolicyRequestDto {
    @IsString()
    @IsNotEmpty()
    folio!: string;

    @IsString()
    @IsNotEmpty()
    customerName!: string;

    @IsEmail()
    customerEmail!: string;

    @IsString()
    @IsNotEmpty()
    product!: string;

    @IsNumber()
    @Min(0.01, { message: 'El insuredAmount debe ser mayor a 0' }) // Regla de negocio del PDF
    insuredAmount!: number;
}