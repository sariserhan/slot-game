'use client';
import { useEffect, useState } from "react";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"


const PlayGame = () => {
    const [resultArray, setResultArray] = useState<number[]>([]);
    const [result, setResult] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        generateRandomNumbers(true, true);
    }, []);

    const generateRandomNumbers = async (delay: Boolean, demo?: Boolean) => {
        const numbers = [];

        for (let i = 0; i < 10; i++) {
            const number = Math.floor(Math.random() * 10);
            numbers.push(number);

            // Update the resultArray after each number is generated
            setResultArray([...numbers]);

            if (demo && i === 0 && number === 7) {
                numbers[0] += 1;
            }
        }

        const isWinner = numbers.every((element) => element === 7);
        setResult(isWinner);


        console.log('isWinner', isWinner);

        if (delay === true) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        return isWinner;
    };

    const handleButtonClick = async (numOfTime: number = 1, delay: Boolean) => {
        let i = 0;

        // Disable the button
        setIsButtonDisabled(true);

        while (i < numOfTime) {
            i += 1;
            setResultArray([]);
            setResult(false);
            const isWinner = await generateRandomNumbers(delay = delay);
            console.log(i, resultArray)

            if (isWinner) {
                break;
            }
        }

        // Enable the button after the loop completes
        setIsButtonDisabled(false);
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-center p-5 mb-4" >
            <div className="flex justify-center mb-4">
                {resultArray.map((num, index) => (
                    <div key={index} className="w-1/2 md:w-1/4 lg:w-1/6 p-2" >
                        {num === 0 && <Image src="/apple.png" alt="apple" width={50} height={50} />}
                        {num === 1 && <Image src="/grapes.png" alt="grapes" width={50} height={50} />}
                        {num === 2 && <Image src="/cherries.png" alt="cherries" width={50} height={50} />}
                        {num === 3 && <Image src="/bananas.png" alt="bananas" width={50} height={50} />}
                        {num === 4 && <Image src="/strawberry.png" alt="strawberry" width={50} height={50} />}
                        {num === 5 && <Image src="/lemon.png" alt="lemon" width={50} height={50} />}
                        {num === 6 && <Image src="/orange.png" alt="orange" width={50} height={50} />}
                        {num === 7 && <Image src="/seven.png" alt="seven" width={50} height={50} />}
                        {num === 8 && <Image src="/pineapple.png" alt="pineapple" width={50} height={50} />}
                        {num === 9 && <Image src="/watermelon.png" alt="watermelon" width={50} height={50} />}
                    </div>
                ))}
            </div>

            <Separator />

            <div className="flex mb-10 justify-between pt-5 px-5 space-x-20">
                <Button onClick={() => handleButtonClick(1, true)} variant='real_ghost' disabled={isButtonDisabled}>
                    <Image
                        src={isButtonDisabled ? "/disabled-spin-button.png" : "/spin-button.png"}
                        alt="Spin"
                        width={100}
                        height={100}
                    />
                </Button>
                <Button onClick={() => handleButtonClick(10, true)} variant='real_ghost' disabled={isButtonDisabled}>
                    <Image
                        src={isButtonDisabled ? "/disabled-auto-spin.png" : "/auto-spin.png"}
                        alt="Auto Spin"
                        width={100}
                        height={100}
                    />
                </Button>
                <Button onClick={() => handleButtonClick(10, false)} variant='real_ghost' disabled={isButtonDisabled}>
                    <Image
                        src={isButtonDisabled ? "/disabled-fast-play.png" : "/fast-play.png"}
                        alt="Fast Play"
                        width={100}
                        height={100}
                    />
                </Button>
            </div>

            <div className="flex mb-4">
                <p>{
                    result ?
                        <Image
                            src="/jackpot.png"
                            alt="Jackpot"
                            width={500}
                            height={500}
                        /> : ""
                }
                </p>
            </div>
        </div >
    );
}

export default PlayGame;

