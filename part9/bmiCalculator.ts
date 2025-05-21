type bmiCategory = 'Underweight' | 'Normal range' | 'Overweight' | 'Obese'

const calculateBmi = (heightInCm: number, weightInKg: number): bmiCategory => {
    const heightInM: number = heightInCm / 100;
    const bmi: number = weightInKg / (heightInM * heightInM)
    console.log(`Bmi: ${bmi}`)

    if (bmi < 18.5) return 'Underweight'
    else if (bmi < 25) return 'Normal range'
    else if (bmi < 30) return 'Overweight'
    else return 'Obese'
}

const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])

console.log(calculateBmi(a, b))