import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

const requestBodySchema = z.object({
    Age: z.number().int().positive(),
    Sex: z.enum(['M', 'F']),
    ChestPainType: z.enum(['ATA', 'NAP', 'ASY', 'TA']),
    RestingBP: z.number().int().positive(),
    RestingECG: z.enum(['Normal', 'ST', 'LVH']),
    MaxHR: z.number().int().positive(),
    ExerciseAngina: z.enum(['Y', 'N']),
    Oldpeak: z.number().nonnegative(),
    ST_Slope: z.enum(['Up', 'Flat', 'Down']),
});

export async function POST(req: NextRequest) {
    const body = await req.json();
    const validationResult = requestBodySchema.safeParse(body);
    
    if (!validationResult.success) {
        return NextResponse.json(
            { error: 'Validation failed', details: validationResult.error.errors },
            { status: 400 }
        );
    }
    
    try {
        const response = await fetch('https://aymenfk-heartdiseas.hf.space/predict/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + process.env.HEART_DISEASE_API_KEY
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}