import { useEffect, useRef, useState } from 'react';

interface IHeartRate {
    value: number;
    startDate: number;
    endDate: number;
}

const randomHeartRate = (min: number = 75, max: number = 170) =>
    Math.floor(Math.random() * (max - min) + min);

export const useFitMetrics = () => {
    const [heartRate, setHeartRate] = useState<IHeartRate[]>([]);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number>(0);

    // const interval = useRef<ReturnType<typeof setInterval>>();

    useEffect(() => {
        let interval;
        if (heartRate.length > 0) {
            interval = setInterval(() => {
                const actualHeartRate: IHeartRate = {
                    value: randomHeartRate(),
                    startDate: Date.now() - startTime,
                    endDate: Date.now() - startTime + 5000,
                };
                setHeartRate((old) => [...old, actualHeartRate]);
            }, 5000);
        }
        // else {
        //     if (interval.current) {
        //         clearInterval(interval.current);
        //         interval.current = undefined;
        //     }
        // }
        return () => {
            clearInterval(interval);
        };
    }, [heartRate]);

    const start = () => {
        const st = Date.now();
        setIsRunning(true);
        setStartTime(st);
        const actualHeartRate: IHeartRate = {
            value: randomHeartRate(),
            startDate: st - startTime,
            endDate: st - startTime + 5000,
        };
        setHeartRate((old) => [...old, actualHeartRate]);
    };

    const stop = () => {
        setIsRunning(false);
        setStartTime(0);
    };

    const reset = () => {
        setIsRunning(false);
        setStartTime(0);
        setHeartRate([]);
    };

    return { start, stop, reset, heartRate, isRunning };
};
